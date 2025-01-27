'use client'

import SplitContainer from '@/components/layout/SplitContainer'
import { useSearchParams } from 'next/navigation'
import { useState, ChangeEvent, FormEvent } from 'react'
import validator from 'validator'

interface FormData {
  firstName: string
  lastName: string
  email: string
  crew: string
}

interface ResponseData {
  ticketId?: string
  crew?: string
  firstName?: string
  lastName?: string
  email?: string
}

export default function CampPage2025() {
  const searchParams = useSearchParams()
  const uuid = searchParams.get('id') // Extract UUID from URL params

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    crew: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [submissionStatus, setSubmissionStatus] = useState<
    'success' | 'error' | 'loading' | null
  >(null)
  const [responseData, setResponseData] = useState<ResponseData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const sanitizeFormData = (data: FormData) => ({
    firstName: validator.escape(data.firstName.trim()),
    lastName: validator.escape(data.lastName.trim()),
    email: validator.normalizeEmail(data.email.trim())!,
    crew: validator.escape(data.crew.trim()),
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting) return // Prevent multiple submissions

    setIsSubmitting(true) // Flag the form as submitting
    setError(null)
    setSubmissionStatus('loading')

    if (
      !uuid ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.crew
    ) {
      setError('Please fill in all fields.')
      setIsSubmitting(false)
      setSubmissionStatus(null)
      return
    }

    if (!validator.isEmail(formData.email)) {
      setError('Please enter a valid email address with a top-level domain.')
      setIsSubmitting(false)
      setSubmissionStatus(null)
      return
    }

    const sanitizedData = sanitizeFormData(formData)

    try {
      const response = await fetch(`/api/ticketSubmit?id=${uuid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData),
      })

      const result = await response.json()
      console.log('Response from backend:', result)

      // Check if the ticket is already claimed or invalid UUID
      if (result.status === 'error' && result.error) {
        if (result.error.includes('already claimed')) {
          setSubmissionStatus('error')
          setError('This ticket has already been claimed.') // More user-friendly error
        } else if (result.error.includes('UUID not valid')) {
          setSubmissionStatus('error')
          setError('Invalid UUID. Please check the link.')
        } else {
          setSubmissionStatus('error')
          setError(result.error) // Generic error fallback
        }
        return
      }

      if (response.ok && result.success) {
        // Ensure the key matches the response
        setSubmissionStatus('success')
        setResponseData({
          ticketId: result.reqid, // Set ticketId and crew if available
          crew: formData.crew, // Show the crew selected
        })
      } else {
        setSubmissionStatus('error')
        setError(result.error || 'Failed to register the ticket.')
      }
    } catch (err) {
      console.error('Network or parsing error:', err)
      setSubmissionStatus('error')
      setError('An unexpected error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false) // Reset submitting flag after completion
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
          {uuid ? (
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
                    disabled={isSubmitting} // Disable button during submission
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
              {submissionStatus === 'success' && responseData && (
                <div>
                  <p style={{ color: 'green' }}>
                    Thank you! Your ticket has been registered.
                  </p>
                  <p>Ticket ID: {responseData.ticketId}</p>
                  <p>Crew: {responseData.crew}</p>
                </div>
              )}
              {submissionStatus === 'error' && (
                <p style={{ color: 'red' }}>{error}</p>
              )}
            </div>
          ) : (
            <p>
              this form will only render when a valid uuid is provided using the
              &id=uuid format. Use{' '}
              <code>?id=123e4567-e89b-12d3-a456-426614174000</code> in the URL
              to test the form.
            </p>
          )}
        </div>
      }
    />
  )
}
