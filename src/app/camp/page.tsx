'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import SplitContainer from '@/components/layout/SplitContainer'
import Link from 'next/link'

export default function CampPage() {
  const router = useRouter()
  const [uuid, setUuid] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    email: '',
    crew: '',
  })
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submissionDetails, setSubmissionDetails] = useState<any | null>(null)
  const [requestId, setRequestId] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const uuidParam = urlParams.get('uuid')
    setUuid(uuidParam)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uuid) return alert('No UUID provided in URL!')

    const generatedRequestId = Math.random().toString(36).substring(2, 15)
    setRequestId(generatedRequestId)

    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formData,
          uuid: uuid,
          requestId: generatedRequestId,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit form.')

      pollStatus(uuid, generatedRequestId)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMessage(
        'There was an error submitting your form. Please try again.'
      )
      setLoading(false)
    }
  }

  const pollStatus = async (uuid: string, requestId: string) => {
    try {
      const response = await fetch(
        `/api/status?uuid=${uuid}&requestId=${requestId}`
      )
      const data = await response.json()

      if (response.ok) {
        if (data.status === 'pending') {
          setTimeout(() => pollStatus(uuid, requestId), 5000)
        } else {
          if (data.status === 'success') {
            setSubmissionDetails({
              uuid,
              first: data.formData?.formFirst,
              last: data.formData?.formLast,
              email: data.formData?.formEmail,
              crew: data.formData?.formCrew,
            })
            setStatus('success')
          } else if (data.status === 'error') {
            setErrorMessage(data.message)
            setStatus('error')
          }
        }
      } else {
        console.error('Error fetching status:', data)
      }
    } catch (error) {
      console.error('Polling error:', error)
    }
  }

  return (
    <SplitContainer
      stickyLeft
      leftSide={
        <div className='space-y-8'>
          {/* ✅ Always Visible: Event Description */}
          <div className='space-y-8 font-sans text-2xl sm:text-3xl xl:space-y-16'>
            <div>
              <span className='sr-only'>About Eisbach Callin Camp</span>
              <h1>
                Join us{' '}
                <span className='bg-invert p-[0.05rem] text-invert'>
                  Aug 22–24
                </span>{' '}
                for a private festival with 20+ DJs from 3 crews, clean camping,
                and good atmosphere.
              </h1>
            </div>
          </div>

          {/* ✅ Conditional: Form visible only if UUID exists */}
          {uuid &&
            (submissionDetails ? (
              // Show success message if form is submitted
              <div className='mt-6 rounded border border-green-600 bg-green-100 p-6'>
                <h2 className='text-xl font-bold text-green-600'>
                  Registration Successful!
                </h2>
                <p>
                  <strong>UUID:</strong> {submissionDetails.uuid}
                </p>
                <p>
                  <strong>Name:</strong> {submissionDetails.first}{' '}
                  {submissionDetails.last}
                </p>
                <p>
                  <strong>Email:</strong> {submissionDetails.email}
                </p>
                <p>
                  <strong>Crew:</strong> {submissionDetails.crew}
                </p>
                <p className='mt-2'>
                  Please check your email for further instructions.
                </p>
              </div>
            ) : (
              // Render the form
              <form
                onSubmit={handleSubmit}
                className='grid max-w-lg grid-cols-1 gap-6'
              >
                {/* First Name */}
                <label className='block'>
                  <span className='bg-invert p-[0.05rem] text-sm font-light uppercase leading-none text-invert'>
                    First Name
                  </span>
                  <input
                    type='text'
                    value={formData.first}
                    onChange={(e) =>
                      setFormData({ ...formData, first: e.target.value })
                    }
                    className='mt-0.5 block w-full border-accent bg-default px-3 py-2 font-sans text-sm shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
                    placeholder='Your first name'
                    required
                  />
                </label>

                {/* Last Name */}
                <label className='block'>
                  <span className='bg-invert p-[0.05rem] text-sm font-light uppercase leading-none text-invert'>
                    Last Name
                  </span>
                  <input
                    type='text'
                    value={formData.last}
                    onChange={(e) =>
                      setFormData({ ...formData, last: e.target.value })
                    }
                    className='mt-0.5 block w-full border-accent bg-default px-3 py-2 font-sans text-sm shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
                    placeholder='Your last name'
                    required
                  />
                </label>

                {/* Email */}
                <label className='block'>
                  <span className='bg-invert p-[0.05rem] text-sm font-light uppercase leading-none text-invert'>
                    Email
                  </span>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className='mt-0.5 block w-full border-accent px-3 py-2 font-sans text-sm shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
                    placeholder='Your email'
                    required
                  />
                </label>

                {/* Crew Selection */}
                <label className='block'>
                  <span className='bg-invert p-[0.05rem] text-sm font-light uppercase leading-none text-invert'>
                    Crew
                  </span>
                  <select
                    value={formData.crew}
                    onChange={(e) =>
                      setFormData({ ...formData, crew: e.target.value })
                    }
                    className='mt-0.5 block w-full border-accent px-3 py-2 font-sans text-sm shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
                  >
                    <option value=''>Select your crew</option>
                    <option>Eisbach Callin</option>
                    <option>Bam Bam</option>
                    <option>Time Trippin</option>
                    <option>Other</option>
                  </select>
                </label>

                {/* Submit Button */}
                <button
                  type='submit'
                  className='mt-4 w-full border-transparent bg-invert px-6 py-3 font-sans text-sm text-invert hover:border-default hover:bg-accent hover:text-onaccent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300'
                  disabled={loading}
                >
                  {loading ? (
                    <span className='mx-auto block h-4 w-4 animate-spin rounded-full border-2 border-t-2 border-white'></span>
                  ) : (
                    'Request Invitation'
                  )}
                </button>

                {/* Error Message */}
                {errorMessage && (
                  <p className='mt-4 text-center font-bold text-red-600'>
                    {errorMessage}
                  </p>
                )}
              </form>
            ))}
        </div>
      }
      rightSide={
        <div className='font-sans text-default'>
          {/* Section 1 */}
          <div className=' border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='flex max-w-4xl flex-col space-y-2 sm:flex-row sm:items-start sm:gap-4 sm:space-y-0'>
              <div className='space-y-4 self-center'>
                <h2 className='text-4xl sm:text-5xl '>Two Nights of Bass.</h2>
              </div>
            </div>
          </div>

          {/* Section img */}
          <div className='grid grid-cols-2 gap-2 border-b border-default  p-2 md:grid-cols-4'>
            <div className='grid gap-2'>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/2016-12-25.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/about/group.jpg'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/2013-05-31.png'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/2016-12-25.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/about/group.jpg'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/2013-05-31.png'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/2016-12-25.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/about/group.jpg'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/2013-05-31.png'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/2016-12-25.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/about/group.jpg'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/2013-05-31.png'
                />
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className='border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='flex max-w-4xl flex-col space-y-2 sm:flex-row sm:items-start sm:gap-4 sm:space-y-0'>
              <div className='space-y-4 self-center'>
                <ul className='text-2xl sm:text-3xl'>
                  <li className='pb-2'>
                    <span className='bg-invert p-[0.05rem] text-invert'>
                      Aug 22-24
                    </span>
                  </li>
                  <li className='pb-2'>
                    <span className='bg-invert p-[0.05rem] text-invert'>
                      Jim Camp Grounds
                    </span>{' '}
                    in{' '}
                    <span className='bg-invert p-[0.05rem] text-invert'>
                      Schattenhofen
                    </span>
                  </li>
                  <li className='pb-2'>
                    <span className='bg-invert p-[0.05rem] text-invert'>
                      20+ DJs from 3 Crews
                    </span>
                  </li>
                  <li className='pb-2'>
                    <span className='bg-invert p-[0.05rem] text-invert'>
                      Invitation Only
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <div className=' border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='flex max-w-4xl flex-col space-y-2 sm:flex-row sm:items-start sm:gap-4 sm:space-y-0'>
              <div className='space-y-4 self-center'>
                <h3 className='text-2xl sm:text-3xl'>
                  Expect rolling beats, deep frequencies, and laid-back vibes on
                  the former{' '}
                  <span className='bg-invert p-[0.05rem] text-invert'>
                    Jim Camp grounds in Schattenhofen
                  </span>
                  . We’ve got clean camping, showers, coffee, snacks, and all
                  the essentials for a stress-free festival.
                </h3>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className='p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='flex max-w-4xl flex-col space-y-2 sm:flex-row sm:items-start sm:gap-4 sm:space-y-0'>
              <div className='space-y-4 self-center'>
                <p className='text-2xl sm:text-3xl'>
                  <span className='bg-invert p-[0.05rem] text-invert'>
                    This private event requires an invitation.
                  </span>{' '}
                  There are no tickets and no on-site ticket sales. We’re all
                  about safe, respectful spaces with zero tolerance for bad
                  vibes. You bring in trash, your bring it out, keep noise down
                  at campsites, and bring nothing hazardous. Got questions?{' '}
                  <Link
                    className='font-normal text-accent hover:text-default'
                    href='mailto:eisbach@gmail.com'
                  >
                    Drop us a message
                  </Link>{' '}
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
