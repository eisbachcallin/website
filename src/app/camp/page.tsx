'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import SplitContainer from '@/components/layout/SplitContainer'

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
        <div className='space-y-8 font-sans text-xl sm:text-2xl'>
          {!uuid ? (
            // Render event description when no uuid is present
            <div>
              <h1 className='text-3xl font-bold'>About the Event</h1>
              <p>
                Join us for an unforgettable weekend filled with rolling beats,
                deep bass, and great vibes. From August 22 to 24, Eisbach
                Callin, Time Tripping, and Bam Bam will bring you a private
                festival experience with over 20 DJs, clean camping facilities,
                and an intimate, respectful atmosphere.
              </p>
              <p>
                Don’t miss out on this intimate weekend for music lovers – fun,
                friendship, and bass await you.
              </p>
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
        <div className='space-y-6 text-default'>
          <h2 className='font-mono text-3xl font-semibold uppercase'>
            One weekend. Three crews. Two nights of bass.
          </h2>
          <p className='font-sans text-base'>
            Eisbach Callin, Time Tripping, and Bam Bam invite you to an intimate
            weekend for lovers of rolling beats and deep frequencies. No hype,
            no frills – just us, good music, and the essence of what a festival
            should be: fun, friendship, and bass.
          </p>
          <div className='border-t-2 border-default pt-4'>
            <h3 className='text-xl font-semibold'>
              Save the Date: 22.08 – 24.08
            </h3>
            <p className='font-sans text-base'>
              Join us on the former Jim Camp grounds in Schattenhofen for two
              unforgettable nights and a laid-back, sunny weekend with:
            </p>
            <ul className='list-inside space-y-2 font-sans'>
              <li>
                • 20 DJs from Munich and the surrounding area bringing the best
                in drum and bass, jungle, and beyond.
              </li>
              <li>
                • A not-so-serious daytime program (for the curious and the
                early risers).
              </li>
              <li>
                • Showers and clean toilets, because nobody needs to rough it.
              </li>
              <li>
                • Coffee, snacks, and drinks at fair prices to fuel the vibes.
              </li>
            </ul>
          </div>

          <div className='border-t-2 border-default pt-4'>
            <h3 className='text-xl font-semibold'>
              Important Info: Ticket Required
            </h3>
            <p className='font-sans text-base'>
              This is a private event with limited access. You must have a
              ticket to enter. There’s no on-site ticketing and no exceptions –
              this keeps things intimate and ensures everyone’s on the same
              wavelength.
            </p>
          </div>

          <div className='border-t-2 border-default pt-4'>
            <h3 className='text-xl font-semibold'>
              The Vibe: Safe, Fun, Respectful
            </h3>
            <p className='font-sans text-base'>
              Our camping grounds and festival space are a safe space for
              everyone – all genders, movements, and identities. We don’t
              tolerate any kind of harassment, discrimination, or bad vibes.
              Respect your fellow humans, the environment, and the music, and
              we’ll all have an incredible time.
            </p>
          </div>

          <div className='border-t-2 border-default pt-4'>
            <h3 className='text-xl font-semibold'>The Plan</h3>
            <ul className='list-inside space-y-2 font-sans'>
              <li>
                • Arrival: Friday, August 22, from 4 PM – settle in, meet the
                crew, and soak up the atmosphere.
              </li>
              <li>
                • Bass Time: Friday and Saturday nights – let the music take
                over.
              </li>
              <li>
                • Chill Days: Relax, enjoy the space, or check out the casual
                daytime activities.
              </li>
              <li>
                • Departure: Sunday, August 24, around noon – refreshed (or
                wonderfully exhausted).
              </li>
            </ul>
          </div>

          <div className='border-t-2 border-default pt-4'>
            <h3 className='text-xl font-semibold'>
              The Fine Print (But Important!)
            </h3>
            <ul className='list-inside space-y-2 font-sans'>
              <li>
                • No Trash: Bring it in, take it out. Everyone is responsible
                for their own waste – Schattenhofen stays clean.
              </li>
              <li>
                • Camping Rules: No gas bottles. Small camping stoves are fine,
                but please be safe.
              </li>
              <li>
                • Respect: No big speaker setups at the campsite. The music
                stays on the floors.
              </li>
              <li>
                • Fair Play: Support the bar and its fair prices – it’s how we
                keep this running.
              </li>
              <li>• Good Vibes Only: No stress, no drama, no exceptions.</li>
            </ul>
          </div>

          <div className='border-t-2 border-default pt-4'>
            <h3 className='text-xl font-semibold'>Got Questions?</h3>
            <p className='font-sans text-base'>
              Drop us a message for any questions or ticket info – let’s keep it
              short and sweet.
            </p>
          </div>
        </div>
      }
    />
  )
}
