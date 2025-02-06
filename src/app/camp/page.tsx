'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import SplitContainer from '@/components/layout/SplitContainer'
import Link from 'next/link'
import validator from 'validator'

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

    if (uuidParam && uuidParam.length >= 10) {
      setUuid(uuidParam)
    } else {
      setUuid(null)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uuid) return alert('No UUID provided in URL!')

    const sanitizedFormData = {
      first: validator.escape(formData.first.trim()),
      last: validator.escape(formData.last.trim()),
      email: validator.escape(formData.email.trim()),
      crew: validator.escape(formData.crew.trim()),
    }

    if (
      validator.isEmpty(sanitizedFormData.first) ||
      validator.isEmpty(sanitizedFormData.last) ||
      validator.isEmpty(sanitizedFormData.crew)
    ) {
      setErrorMessage('All fields are required.')
      return
    }

    if (!validator.isEmail(sanitizedFormData.email)) {
      setErrorMessage('Invalid email address.')
      return
    }

    if (
      !['Eisbach Callin', 'Bam Bam', 'Time Trippin', 'Other'].includes(
        sanitizedFormData.crew
      )
    ) {
      setErrorMessage('Invalid crew selection.')
      return
    }

    setErrorMessage(null)
    setLoading(true)

    const generatedRequestId = Math.random().toString(36).substring(2, 15)
    setRequestId(generatedRequestId)

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: sanitizedFormData,
          uuid: uuid,
          requestId: generatedRequestId,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit form.')

      pollStatus(uuid, generatedRequestId)
    } catch (error) {
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
          setLoading(false)
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
        <div className='flex flex-col items-start space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-8'>
          <div className='flex-1 font-sans text-2xl  sm:text-3xl xl:space-y-16  '>
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
          {uuid &&
            uuid.length >= 34 &&
            (submissionDetails ? (
              <div className='mt-6 w-full flex-1 space-y-4 border border-green-600 bg-green-100 p-3'>
                <h2 className='font-sans text-2xl text-green-600'>
                  You’re Invited!
                </h2>
                <div>
                  <p className='text-black'>
                    <strong className='bg-black p-[0.05rem] text-sm font-light uppercase leading-none text-white'>
                      UUID:
                    </strong>{' '}
                    {submissionDetails.uuid}
                  </p>
                  <p className='text-black'>
                    <strong className='bg-black p-[0.05rem] text-sm font-light uppercase leading-none text-white'>
                      Name:
                    </strong>{' '}
                    {submissionDetails.first} {submissionDetails.last}
                  </p>
                  <p className='text-black'>
                    <strong className='bg-black p-[0.05rem] text-sm font-light uppercase leading-none text-white'>
                      Email:
                    </strong>{' '}
                    {submissionDetails.email}
                  </p>
                  <p className='text-black'>
                    <strong className='bg-black p-[0.05rem] text-sm font-light uppercase leading-none text-white'>
                      Crew:
                    </strong>{' '}
                    {submissionDetails.crew}
                  </p>
                </div>
                <p className='mt-2 font-sans text-black'>
                  Please check your email. If you didn’t receive an email reach
                  out to{' '}
                  <Link
                    className='p-[0.05rem] font-normal text-accent hover:text-black'
                    href='mailto:eisbachcallin@gmail.com'
                  >
                    eisbachcallin@gmail.com
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className='grid w-full flex-1 grid-cols-1 gap-2 sm:max-w-md xl:max-w-xl'
              >
                {errorMessage && (
                  <p className='border border-red-600 bg-red-100 p-3 text-black'>
                    {errorMessage}
                  </p>
                )}
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
                    className='mt-0.5 block w-full border-accent bg-default px-3 py-2 font-sans text-base shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
                    placeholder='Your first name'
                    required
                  />
                </label>
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
                    className='mt-0.5 block w-full border-accent bg-default px-3 py-2 font-sans text-base shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
                    placeholder='Your last name'
                    required
                  />
                </label>
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
                    className='mt-0.5 block w-full border-accent bg-default px-3 py-2 font-sans text-base shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
                    placeholder='Your email'
                    required
                  />
                </label>
                <label className='block'>
                  <span className='bg-invert p-[0.05rem] text-sm font-light uppercase leading-none text-invert'>
                    Crew
                  </span>
                  <select
                    required
                    value={formData.crew}
                    onChange={(e) =>
                      setFormData({ ...formData, crew: e.target.value })
                    }
                    className='mt-0.5 block w-full border-accent bg-default px-3 py-2 font-sans text-base shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
                  >
                    <option value=''>Select your crew</option>
                    <option>Eisbach Callin</option>
                    <option>Bam Bam</option>
                    <option>Time Trippin</option>
                    <option>Other</option>
                  </select>
                </label>
                <button
                  type='submit'
                  className='mt-4 w-full border-transparent bg-invert px-6 py-3 font-sans text-sm text-invert hover:border-default hover:bg-accent hover:text-onaccent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-accent'
                  disabled={loading}
                >
                  {loading ? (
                    <span className='mx-auto block h-5 w-5 animate-spin rounded-full border-2 border-t-2 border-gray-300 border-t-white'></span>
                  ) : (
                    'Request Invitation'
                  )}
                </button>
              </form>
            ))}
        </div>
      }
      rightSide={
        <div className='font-sans text-default'>
          <div className=' border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='flex max-w-4xl flex-col space-y-2 sm:flex-row sm:items-start sm:gap-4 sm:space-y-0'>
              <div className='space-y-4'>
                <h2 className='text-4xl sm:text-5xl'>
                  One Festival. Two Nights of Bass. Three Crews.
                </h2>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2 border-b border-default  p-2 md:grid-cols-4'>
            <div className='grid gap-2'>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/1-03.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/1-02.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/1-01.png'
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
                  src='/camp/2-03.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/2-02.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/2-01.png'
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
                  src='/camp/3-03.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/3-02.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/3-01.png'
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
                  src='/camp/4-03.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/4-02.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/4-01.png'
                />
              </div>
            </div>
          </div>

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

          <div className='border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='flex max-w-4xl flex-col space-y-2 sm:flex-row sm:items-start sm:gap-4 sm:space-y-0'>
              <div className='space-y-4 self-center'>
                <p className='text-2xl sm:text-3xl'>
                  <span className='bg-invert p-[0.05rem] text-invert'>
                    This private event requires an invitation.
                  </span>{' '}
                  There are no tickets and no on-site ticket sales. We’re all
                  about safe, respectful spaces with zero tolerance for bad
                  vibes. You take care of your trash, keep noise down at
                  campsites, and bring nothing hazardous. Got questions?{' '}
                  <Link
                    className='bg-accent p-[0.05rem] font-normal text-onaccent hover:text-invert'
                    href='mailto:eisbachcallin@gmail.com'
                  >
                    Drop us a message
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className='p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='flex max-w-4xl flex-col space-y-2 sm:flex-row sm:items-start sm:gap-4 sm:space-y-0'>
              <div className='space-y-4 self-center'>
                <ul className='text-2xl sm:text-3xl'>
                  <li className='pb-2'>
                    <span className='bg-invert p-[0.05rem] text-invert'>
                      Socials:
                    </span>
                  </li>
                  <li className='pb-2'>
                    <Link
                      className='bg-accent p-[0.05rem] font-normal text-onaccent hover:text-invert'
                      href='#'
                    >
                      Eisbach Callin
                    </Link>{' '}
                  </li>
                  <li className='pb-2'>
                    <Link
                      className='bg-accent p-[0.05rem] font-normal text-onaccent hover:text-invert'
                      href='#'
                    >
                      Time Trippin
                    </Link>{' '}
                  </li>
                  <li className='pb-2'>
                    <Link
                      className='bg-accent p-[0.05rem] font-normal text-onaccent hover:text-invert'
                      href='#'
                    >
                      Bam Bam
                    </Link>{' '}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
