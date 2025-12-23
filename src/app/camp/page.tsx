'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import SplitContainer from '@/components/layout/SplitContainer'
import Link from 'next/link'
import { ory, getRegistrationUrl, logout } from '@/lib/ory'
import type { Session } from '@ory/client'

type Crew = { id: number; name: string }

export default function CampPage() {
  const [uuid, setUuid] = useState<string | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [crews, setCrews] = useState<Crew[]>([])
  const [formData, setFormData] = useState({ first: '', last: '', crew_id: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{
    uuid: string
    first: string
    last: string
    email: string
    crew: string
  } | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const uuidParam = params.get('uuid')
    if (uuidParam && uuidParam.length >= 34) {
      setUuid(uuidParam)
    }
  }, [])

  useEffect(() => {
    async function checkSession() {
      try {
        const { data } = await ory.toSession()
        setSession(data)
      } catch {
        setSession(null)
      } finally {
        setAuthLoading(false)
      }
    }
    checkSession()
  }, [])

  useEffect(() => {
    async function fetchCrews() {
      try {
        const res = await fetch('/api/crews')
        if (res.ok) setCrews(await res.json())
      } catch (e) {
        console.error('Failed to fetch crews:', e)
      }
    }
    fetchCrews()
  }, [])

  const handleLogin = () => {
    const returnTo = `${window.location.origin}/camp?uuid=${uuid}`
    window.location.href = getRegistrationUrl(returnTo)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uuid || !session) return

    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          uuid,
          first_name: formData.first,
          last_name: formData.last,
          crew_id: formData.crew_id,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const messages: Record<string, string> = {
          ticket_not_found: 'Invalid ticket. Check your QR code.',
          ticket_already_claimed: 'This ticket has already been redeemed.',
          user_already_has_ticket: 'You already have a ticket registered.',
          invalid_crew: 'Invalid crew selection.',
          email_not_verified: 'Please verify your email first.',
          unauthorized: 'Please log in to continue.',
        }
        setError(messages[data.error] || 'Something went wrong. Try again.')
        return
      }

      const crew = crews.find((c) => c.id === parseInt(formData.crew_id))
      setSuccess({
        uuid,
        first: formData.first,
        last: formData.last,
        email: session.identity?.traits?.email || '',
        crew: crew?.name || '',
      })
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const emailVerified = session?.identity?.verifiable_addresses?.some(
    (addr) => addr.via === 'email' && addr.verified
  )

  const renderForm = () => {
    if (!uuid || uuid.length < 34) return null

    if (success) {
      return (
        <div className='mt-6 w-full flex-1 space-y-4 border border-green-600 bg-green-100 p-3'>
          <h2 className='font-sans text-2xl text-green-600'>You're Invited!</h2>
          <div>
            <p className='text-black'>
              <strong className='bg-black p-[0.05rem] text-sm font-light uppercase leading-none text-white'>
                UUID:
              </strong>{' '}
              {success.uuid}
            </p>
            <p className='text-black'>
              <strong className='bg-black p-[0.05rem] text-sm font-light uppercase leading-none text-white'>
                Name:
              </strong>{' '}
              {success.first} {success.last}
            </p>
            <p className='text-black'>
              <strong className='bg-black p-[0.05rem] text-sm font-light uppercase leading-none text-white'>
                Email:
              </strong>{' '}
              {success.email}
            </p>
            <p className='text-black'>
              <strong className='bg-black p-[0.05rem] text-sm font-light uppercase leading-none text-white'>
                Crew:
              </strong>{' '}
              {success.crew}
            </p>
          </div>
          <p className='mt-2 font-sans text-black'>
            Please check your email. If you didn't receive an email reach out to{' '}
            <Link
              className='p-[0.05rem] font-normal text-accent hover:text-black'
              href='mailto:eisbachcallin@gmail.com'
            >
              eisbachcallin@gmail.com
            </Link>
            .
          </p>
        </div>
      )
    }

    if (authLoading) {
      return (
        <div className='mt-6 w-full flex-1 p-3'>
          <span className='mx-auto block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black'></span>
        </div>
      )
    }

    if (!session) {
      return (
        <div className='mt-6 w-full flex-1 space-y-4 border border-default p-3'>
          <p className='font-sans text-default'>
            Create an account or log in to redeem your ticket.
          </p>
          <button
            onClick={handleLogin}
            className='w-full border-transparent bg-invert px-6 py-3 font-sans text-sm text-invert hover:border-default hover:bg-accent hover:text-onaccent'
          >
            Continue
          </button>
        </div>
      )
    }

    if (!emailVerified) {
      return (
        <div className='mt-6 w-full flex-1 space-y-4 border border-yellow-600 bg-yellow-100 p-3'>
          <h2 className='font-sans text-xl text-yellow-700'>
            Verify Your Email
          </h2>
          <p className='text-black'>
            Check your inbox for a verification email from us. Once verified,
            refresh this page to continue.
          </p>
        </div>
      )
    }

    return (
      <form
        onSubmit={handleSubmit}
        className='grid w-full flex-1 grid-cols-1 gap-2 sm:max-w-md xl:max-w-xl'
      >
        {error && (
          <p className='border border-red-600 bg-red-100 p-3 text-black'>
            {error}
          </p>
        )}
        <div className='flex items-center justify-between text-sm text-default'>
          <span>Logged in as {session.identity?.traits?.email}</span>
          <button
            type='button'
            onClick={() => logout()}
            className='text-accent underline hover:text-black'
          >
            Log out
          </button>
        </div>
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
            onChange={(e) => setFormData({ ...formData, last: e.target.value })}
            className='mt-0.5 block w-full border-accent bg-default px-3 py-2 font-sans text-base shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
            placeholder='Your last name'
            required
          />
        </label>
        <label className='block'>
          <span className='bg-invert p-[0.05rem] text-sm font-light uppercase leading-none text-invert'>
            Crew
          </span>
          <select
            required
            value={formData.crew_id}
            onChange={(e) =>
              setFormData({ ...formData, crew_id: e.target.value })
            }
            className='mt-0.5 block w-full border-accent bg-default px-3 py-2 font-sans text-base shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
          >
            <option value=''>Select your crew</option>
            {crews.map((crew) => (
              <option key={crew.id} value={crew.id}>
                {crew.name}
              </option>
            ))}
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
            'Redeem Ticket'
          )}
        </button>
      </form>
    )
  }

  return (
    <SplitContainer
      stickyLeft
      leftSide={
        <div className='flex flex-col items-start space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-8'>
          <div className='flex-1 font-sans text-2xl sm:text-3xl xl:space-y-16'>
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
          {renderForm()}
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
                      A Massive Soundsystem
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
              <div className='space-y-4'>
                <ul className='text-2xl sm:text-3xl'>
                  <li className='pb-2'>
                    <span className='bg-invert p-[0.05rem] text-invert'>
                      Socials:
                    </span>
                  </li>
                  <li className='pb-2'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-accent p-[0.05rem] font-normal text-onaccent hover:text-invert'
                      href='https://www.instagram.com/eisbachcallin/'
                    >
                      Eisbach Callin
                    </a>{' '}
                  </li>
                  <li className='pb-2'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-accent p-[0.05rem] font-normal text-onaccent hover:text-invert'
                      href='https://www.instagram.com/oktagon.kollektiv/'
                    >
                      Oktagon Soundsystem
                    </a>{' '}
                  </li>
                  <li className='pb-2'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-accent p-[0.05rem] font-normal text-onaccent hover:text-invert'
                      href='https://www.instagram.com/timetrippingmunich/'
                    >
                      Time Tripping
                    </a>{' '}
                  </li>
                  <li className='pb-2'>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-accent p-[0.05rem] font-normal text-onaccent hover:text-invert'
                      href='https://www.instagram.com/bambam.fun/'
                    >
                      Bam Bam
                    </a>{' '}
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
