'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import SplitContainer from '@/components/layout/SplitContainer'
import Link from 'next/link'

const CrewOptions = ['Crew A', 'Crew B', 'Crew C']

export default function CampPage() {
  const router = useRouter()
  const [uuid, setUuid] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    email: '',
    crew: CrewOptions[0],
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
        <div>
          {!uuid ? (
            // Render event description when no uuid is present
            <div className='space-y-8 font-sans text-2xl sm:text-3xl xl:space-y-16'>
              <div>
                <span className='sr-only'>About Eisbach Callin Camp</span>
                <h1>
                  Join us for an unforgettable weekend filled with rolling
                  beats, deep bass, and great vibes. From August 22 to 24,
                  Eisbach Callin, Time Tripping, and Bam Bam will bring you a
                  private festival experience with over 20 DJs, clean camping
                  facilities, and an intimate, respectful atmosphere.
                </h1>
              </div>
            </div>
          ) : submissionDetails ? (
            // Show success message if form is submitted
            <div className='rounded border border-green-600 bg-green-100 p-6'>
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
            // Render the form when uuid is present
            <>
              <h1 className='text-3xl font-bold'>Event Registration</h1>
              <p className='text-lg'>
                Please fill out the form below to register for the event. Once
                completed, you'll receive a confirmation.
              </p>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium'>
                    First Name
                  </label>
                  <input
                    type='text'
                    value={formData.first}
                    onChange={(e) =>
                      setFormData({ ...formData, first: e.target.value })
                    }
                    className='w-full rounded-lg border p-3 text-lg'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>Last Name</label>
                  <input
                    type='text'
                    value={formData.last}
                    onChange={(e) =>
                      setFormData({ ...formData, last: e.target.value })
                    }
                    className='w-full rounded-lg border p-3 text-lg'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>Email</label>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className='w-full rounded-lg border p-3 text-lg'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>Crew</label>
                  <select
                    value={formData.crew}
                    onChange={(e) =>
                      setFormData({ ...formData, crew: e.target.value })
                    }
                    className='w-full rounded-lg border p-3 text-lg'
                  >
                    {CrewOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type='submit'
                  className='rounded-lg bg-blue-600 px-6 py-3 text-lg text-white disabled:bg-blue-300'
                  disabled={loading}
                >
                  {loading ? (
                    <span className='h-4 w-4 animate-spin rounded-full border-2 border-t-2 border-white'></span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>

              {errorMessage && (
                <p className='mt-4 font-bold text-red-600'>{errorMessage}</p>
              )}

              {status && !submissionDetails && (
                <p
                  className={`mt-4 font-bold ${
                    status === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {status === 'success'
                    ? 'Registration Successful!'
                    : 'Failed to register. Please try again.'}
                </p>
              )}

              {loading && !submissionDetails && (
                <div className='mt-4 text-center'>
                  <span className='h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-blue-600'></span>
                </div>
              )}
            </>
          )}
        </div>
      }
      rightSide={
        <div className='font-sans text-default'>
          <div className='border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='max-w-2xl space-y-2'>
              <h2 className='w-fit bg-invert p-[0.05rem] font-mono text-sm font-light uppercase leading-none text-invert'>
                One Weekend. Three Crews. Two Nights of Bass.
              </h2>
              <p>
                <span className='font-bold'>Eisbach Callin</span>,{' '}
                <span className='font-bold'>Time Tripping</span>, and{' '}
                <span className='font-bold'>Bam Bam</span>{' '}
                <span className='font-extralight'>
                  invite you to an intimate weekend for lovers of rolling beats
                  and deep frequencies.
                </span>{' '}
                <span className='font-bold'>No hype, no frills</span>{' '}
                <span className='font-extralight'>
                  – just us, good music, and the essence of what a festival
                  should be:
                </span>{' '}
                <span className='font-bold'>fun, friendship, and bass.</span>
              </p>
            </div>
          </div>

          <div className='border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='max-w-2xl space-y-2'>
              <h3 className='w-fit bg-invert p-[0.05rem] font-mono text-sm font-light uppercase leading-none text-invert'>
                Save the Date: 22.08 – 24.08
              </h3>
              <p>
                <span className='font-extralight'>
                  Join us on the former Jim Camp grounds in Schattenhofen for
                  two unforgettable nights and a laid-back, sunny weekend with:
                </span>{' '}
                <span className='font-bold'>20 DJs</span>{' '}
                <span className='font-extralight'>
                  from Munich and the surrounding area bringing the best in drum
                  and bass, jungle, and beyond.
                </span>{' '}
                <span className='font-bold'>Daytime Program:</span>{' '}
                <span className='font-extralight'>
                  A not-so-serious lineup for the curious and the early risers.
                </span>{' '}
                <span className='font-bold'>Comfort Matters:</span>{' '}
                <span className='font-extralight'>
                  Showers and clean toilets, because nobody needs to rough it.
                </span>{' '}
                <span className='font-bold'>Fuel for the Vibes:</span>{' '}
                <span className='font-extralight'>
                  Coffee, snacks, and drinks at fair prices to keep you going.
                </span>
              </p>
            </div>
          </div>

          <div className='border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='max-w-2xl space-y-2'>
              <h3 className='w-fit bg-invert p-[0.05rem] font-mono text-sm font-light uppercase leading-none text-invert'>
                Important Info: Invitation Required
              </h3>
              <p>
                <span className='font-bold'>Private Event:</span>{' '}
                <span className='font-extralight'>
                  This is a private event with limited access. You must have a
                  ticket to enter.
                </span>{' '}
                <span className='font-bold'>No On-Site Ticketing:</span>{' '}
                <span className='font-extralight'>
                  There’s no on-site ticketing and no exceptions – this keeps
                  things intimate and ensures everyone’s on the same wavelength.
                </span>
              </p>
            </div>
          </div>

          <div className='border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='max-w-2xl space-y-2'>
              <h3 className='w-fit bg-invert p-[0.05rem] font-mono text-sm font-light uppercase leading-none text-invert'>
                The Vibe: Safe, Fun, Respectful
              </h3>
              <p>
                <span className='font-bold'>Safe Space:</span>{' '}
                <span className='font-extralight'>
                  Our camping grounds and festival space are welcoming to
                  everyone – all genders, movements, and identities.
                </span>{' '}
                <span className='font-bold'>Zero Tolerance:</span>{' '}
                <span className='font-extralight'>
                  We don’t tolerate any kind of harassment, discrimination, or
                  bad vibes.
                </span>{' '}
                <span className='font-bold'>Respect:</span>{' '}
                <span className='font-extralight'>
                  Respect your fellow humans, the environment, and the music,
                  and we’ll all have an incredible time.
                </span>
              </p>
            </div>
          </div>

          <div className='border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='max-w-2xl space-y-2'>
              <h3 className='w-fit bg-invert p-[0.05rem] font-mono text-sm font-light uppercase leading-none text-invert'>
                The Plan
              </h3>
              <p>
                <span className='font-bold'>Arrival:</span>{' '}
                <span className='font-extralight'>
                  Friday, August 22, from 4 PM – settle in, meet the crew, and
                  soak up the atmosphere.
                </span>{' '}
                <span className='font-bold'>Bass Time:</span>{' '}
                <span className='font-extralight'>
                  Friday and Saturday nights – let the music take over.
                </span>{' '}
                <span className='font-bold'>Chill Days:</span>{' '}
                <span className='font-extralight'>
                  Relax, enjoy the space, or check out the casual daytime
                  activities.
                </span>{' '}
                <span className='font-bold'>Departure:</span>{' '}
                <span className='font-extralight'>
                  Sunday, August 24, around noon – refreshed (or wonderfully
                  exhausted).
                </span>
              </p>
            </div>
          </div>

          <div className='border-b border-default p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='max-w-2xl space-y-2 '>
              <h3 className='w-fit bg-invert p-[0.05rem] font-mono text-sm font-light uppercase leading-none text-invert'>
                Fine Print
              </h3>
              <p>
                <span className='font-bold'>No Trash</span>{' '}
                <span className='font-extralight'>
                  Bring it in, take it out. Everyone is responsible for their
                  own waste – Schattenhofen stays clean.
                </span>{' '}
                <span className='font-bold'>No Hazards</span>{' '}
                <span className='font-extralight'>
                  No gas bottles. Small camping stoves are fine, but please be
                  safe.
                </span>{' '}
                <span className='font-bold'>Stay Respectful</span>{' '}
                <span className='font-extralight'>
                  No big speaker setups at the campsite. The music stays on the
                  floors. Respect people’s rest.
                </span>{' '}
                <span className='font-bold'>Good Vibes</span>{' '}
                <span className='font-extralight'>
                  No stress, no drama, no exceptions.
                </span>
              </p>
              {/* <ul className='list-inside space-y-2 font-sans'>
                <li>
                  <span className='bg-accent p-[0.05rem] text-onaccent'>
                    No Trash:—
                  </span>{' '}
                  <span className='font-light'>
                    Bring it in, take it out. Everyone is responsible for their
                    own waste – Schattenhofen stays clean.
                  </span>
                </li>
                <li>
                  <span className='bg-accent p-[0.05rem] text-onaccent'>
                    Camp Rules:
                  </span>{' '}
                  <span className='font-light'>
                    No gas bottles. Small camping stoves are fine, but please be
                    safe.
                  </span>
                </li>
                <li>
                  <span className='bg-accent p-[0.05rem] text-onaccent'>
                    Respect:
                  </span>{' '}
                  <span className='font-light'>
                    No big speaker setups at the campsite. The music stays on
                    the floors.
                  </span>
                </li>
                <li>
                  <span className='bg-accent p-[0.05rem] text-onaccent'>
                    Fair Play:
                  </span>{' '}
                  <span className='font-light'>
                    Support the bar and its fair prices – it’s how we keep this
                    running.
                  </span>
                </li>
                <li>
                  <span className='bg-accent p-[0.05rem] text-onaccent'>
                    Good Vibes Only:
                  </span>{' '}
                  <span className='font-light'>
                    No stress, no drama, no exceptions.
                  </span>
                </li>
              </ul> */}
            </div>
          </div>

          <div className='font-noraml p-2 text-xl text-default sm:text-2xl'>
            <div className='max-w-2xl space-y-2 '>
              <h3 className='w-fit bg-invert p-[0.05rem] font-mono text-sm font-light uppercase leading-none text-invert'>
                Questions?
              </h3>
              <p className='font-extralight'>
                <Link
                  className='font-normal text-accent hover:text-default'
                  href='mailto:eisbach@gmail.com'
                >
                  Drop us a message
                </Link>{' '}
                for any questions or ticket info – let’s keep it short and
                sweet.
              </p>
            </div>
          </div>
        </div>
      }
    />
  )
}
