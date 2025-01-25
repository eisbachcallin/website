'use client'

import SplitContainer from '@/components/layout/SplitContainer'
import { useSearchParams } from 'next/navigation'
import { useState, ChangeEvent, FormEvent } from 'react'
import validator from 'validator'

export default function CampPage2025() {
  const searchParams = useSearchParams()
  const uuid = searchParams.get('id') // Extract UUID from URL params

  // Define state types
  interface FormData {
    firstName: string
    lastName: string
    email: string
    crew: string
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    crew: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [submissionStatus, setSubmissionStatus] = useState<
    'success' | 'error' | null
  >(null)

  // Test UUID for development
  const testUUID = '123e4567-e89b-12d3-a456-426614174000'

  // Validate client-side: Allow only the test UUID during development
  const isValidUUID = uuid === testUUID

  // Handle input changes with proper typing
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Sanitize the input values before submission
  const sanitizeFormData = (data: FormData) => {
    return {
      firstName: validator.escape(data.firstName.trim()), // Escape special chars
      lastName: validator.escape(data.lastName.trim()), // Escape special chars
      email: validator.normalizeEmail(data.email.trim()), // Normalize the email
      crew: validator.escape(data.crew.trim()), // Escape special chars
    }
  }

  // Handle form submission with proper typing
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validate fields (check if formData is complete)
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.crew
    ) {
      setError('Please fill in all fields.')
      return
    }

    // Validate email format
    if (!validator.isEmail(formData.email)) {
      setError(
        'Please enter a valid email address with a top-level domain (e.g., .com, .org).'
      )
      return
    }

    // Sanitize form data
    const sanitizedData = sanitizeFormData(formData)

    try {
      // Send the sanitized form data to your Next.js API route
      const response = await fetch('/api/ticketSubmit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...sanitizedData, uuid }), // Send sanitized data and UUID
      })

      const result = await response.json()

      if (result.success) {
        setSubmissionStatus('success')
      } else {
        setSubmissionStatus('error')
        setError(result.error || 'Submission failed.')
      }
    } catch (err) {
      console.error(err)
      setSubmissionStatus('error')
      setError('An unexpected error occurred.')
    }
  }

  return (
    <SplitContainer
      stickyLeft
      narrow
      leftSide={
        <h1 className='font-sans text-2xl sm:text-3xl'>Eisbach Callin Camp</h1>
      }
      rightSide={
        <div className='grid xl:grid-cols-4'>
          <div className='p-2 xl:col-span-2'>
            some event description that is always visible
          </div>
          {isValidUUID ? (
            <div className='min-h-max border-l border-default p-2 xl:col-span-1'>
              <h2 className='mb-2'>Register Your Ticket</h2>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-6'>
                  <label className='block'>
                    <span className='bg-invert px-0.5 text-sm font-light uppercase leading-none text-invert'>
                      First name
                    </span>
                    <input
                      type='text'
                      name='firstName'
                      className='mt-1 block w-full'
                      placeholder=''
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label className='block'>
                    <span className='bg-invert px-0.5 text-sm font-light uppercase leading-none text-invert'>
                      Last name
                    </span>
                    <input
                      type='text'
                      name='lastName'
                      className='mt-1 block w-full'
                      placeholder=''
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label className='block'>
                    <span className='bg-invert px-0.5 text-sm font-light uppercase leading-none text-invert'>
                      Email address
                    </span>
                    <input
                      type='email'
                      name='email'
                      className='mt-1 block w-full'
                      placeholder=''
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label className='block'>
                    <span className='bg-invert px-0.5 text-sm font-light uppercase leading-none text-invert'>
                      Crew
                    </span>
                    <select
                      name='crew'
                      className='mt-1 block w-full'
                      value={formData.crew}
                      onChange={handleInputChange}
                      required
                    >
                      <option value='' disabled>
                        Select your crew
                      </option>
                      <option value='Eisbach Callin'>Eisbach Callin</option>
                      <option value='Bam Bam'>Bam Bam</option>
                      <option value='Time Trippin'>Time Trippin</option>
                      <option value='Other'>Other</option>
                    </select>
                  </label>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <button
                    className='bg-invert px-3 py-2 text-base font-light uppercase text-invert'
                    type='submit'
                  >
                    Submit
                  </button>
                </div>
              </form>
              {submissionStatus === 'success' && (
                <p style={{ color: 'green' }}>
                  Thank you! Your ticket has been registered.
                </p>
              )}
              {submissionStatus === 'error' && (
                <p style={{ color: 'red' }}>
                  There was an issue. Please try again.
                </p>
              )}
            </div>
          ) : (
            <p>
              Invalid or missing ticket. Use{' '}
              <code>?id=123e4567-e89b-12d3-a456-426614174000</code> in the URL
              to test the form.
            </p>
          )}
        </div>
      }
    />
  )
}
