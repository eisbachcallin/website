'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { logout } from '@/lib/ory'

type Attendee = {
  id: string
  first_name: string
  last_name: string
  email: string
  crew_name: string
  confirmed: boolean
  checked_in: boolean
  checked_in_at: string | null
  created_at: string
}

type Crew = { id: number; name: string }

export default function AdminPage() {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [crews, setCrews] = useState<Crew[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [crewFilter, setCrewFilter] = useState('')
  const [checkedInFilter, setCheckedInFilter] = useState('')
  const [confirmedFilter, setConfirmedFilter] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [checkingIn, setCheckingIn] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)

  const fetchAttendees = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (crewFilter) params.set('crew_id', crewFilter)
    if (checkedInFilter) params.set('checked_in', checkedInFilter)
    if (confirmedFilter) params.set('confirmed', confirmedFilter)
    params.set('page', page.toString())

    const res = await fetch(`/api/admin/attendees?${params}`)
    if (res.ok) {
      const data = await res.json()
      setAttendees(data.attendees)
      setTotalPages(data.pages)
      setTotal(data.total)
    }
    setLoading(false)
  }, [search, crewFilter, checkedInFilter, confirmedFilter, page])

  useEffect(() => {
    fetch('/api/crews')
      .then((r) => r.json())
      .then(setCrews)
  }, [])

  useEffect(() => {
    fetchAttendees()
  }, [fetchAttendees])

  const handleCheckIn = async (id: string) => {
    setCheckingIn(id)
    const res = await fetch(`/api/admin/attendees/${id}/check-in`, {
      method: 'POST',
    })
    if (res.ok) {
      setAttendees((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                confirmed: true,
                checked_in: true,
                checked_in_at: new Date().toISOString(),
              }
            : a
        )
      )
    } else {
      const data = await res.json()
      alert(
        data.error === 'already_checked_in'
          ? 'Already checked in'
          : 'Check-in failed'
      )
    }
    setCheckingIn(null)
  }

  const handleToggleConfirmed = async (id: string, next: boolean) => {
    setToggling(id)
    const res = await fetch(`/api/admin/attendees/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confirmed: next }),
    })
    if (res.ok) {
      setAttendees((prev) =>
        prev.map((a) => (a.id === id ? { ...a, confirmed: next } : a))
      )
    } else {
      alert('Update failed')
    }
    setToggling(null)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchAttendees()
  }

  return (
    <div className='min-h-screen bg-default p-4 font-sans text-default'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-6 flex items-center justify-between border-b border-default pb-4'>
          <h1 className='text-2xl'>Attendees</h1>
          <div className='flex items-center space-x-4'>
            <Link
              href='/admin/stats'
              className='bg-accent p-[0.05rem] text-onaccent hover:text-invert'
            >
              View Stats
            </Link>
            <button
              type='button'
              onClick={() => logout()}
              className='text-accent underline hover:text-black'
            >
              Log out
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className='mb-4 flex flex-wrap gap-2'>
          <input
            type='text'
            placeholder='Search name or email...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='border-accent bg-default px-3 py-2 font-sans text-base shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
          />
          <select
            value={crewFilter}
            onChange={(e) => {
              setCrewFilter(e.target.value)
              setPage(1)
            }}
            className='border-accent bg-default px-3 py-2 font-sans text-base shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
          >
            <option value=''>All crews</option>
            {crews.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={checkedInFilter}
            onChange={(e) => {
              setCheckedInFilter(e.target.value)
              setPage(1)
            }}
            className='border-accent bg-default px-3 py-2 font-sans text-base shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
          >
            <option value=''>All</option>
            <option value='true'>Checked in</option>
            <option value='false'>Not checked in</option>
          </select>
          <select
            value={confirmedFilter}
            onChange={(e) => {
              setConfirmedFilter(e.target.value)
              setPage(1)
            }}
            className='border-accent bg-default px-3 py-2 font-sans text-base shadow-sm focus:border-default focus:ring-1 focus:ring-blue-500'
          >
            <option value=''>All</option>
            <option value='true'>Confirmed</option>
            <option value='false'>Not confirmed</option>
          </select>
          <button
            type='submit'
            className='border-transparent bg-invert px-6 py-2 font-sans text-sm text-invert hover:border-default hover:bg-accent hover:text-onaccent'
          >
            Search
          </button>
        </form>

        <p className='mb-2 text-sm'>{total} attendees found</p>

        {loading ? (
          <div className='p-8'>
            <span className='mx-auto block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black'></span>
          </div>
        ) : (
          <>
            {/* Mobile: card layout — no sideways scrolling */}
            <div className='space-y-3 sm:hidden'>
              {attendees.map((a) => (
                <div key={a.id} className='border border-default p-4'>
                  <div className='mb-2'>
                    <p className='text-base'>
                      {a.first_name} {a.last_name}
                    </p>
                    <p className='break-all text-sm text-gray-500'>{a.email}</p>
                    <p className='text-sm text-gray-500'>{a.crew_name}</p>
                  </div>
                  <div className='mb-3 flex flex-wrap items-center gap-2'>
                    <button
                      onClick={() => handleToggleConfirmed(a.id, !a.confirmed)}
                      disabled={toggling === a.id}
                      title={
                        a.confirmed
                          ? 'Click to mark as not confirmed'
                          : 'Click to mark as confirmed'
                      }
                      className={
                        a.confirmed
                          ? 'bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-700 disabled:opacity-50'
                          : 'bg-amber-500 px-2 py-1 text-sm text-white hover:bg-amber-600 disabled:opacity-50'
                      }
                    >
                      {toggling === a.id
                        ? '...'
                        : a.confirmed
                          ? 'Confirmed'
                          : 'Not confirmed'}
                    </button>
                    {a.checked_in ? (
                      <span className='bg-green-600 px-2 py-1 text-sm text-white'>
                        Checked in
                      </span>
                    ) : (
                      <span className='text-sm text-gray-500'>
                        Not checked in
                      </span>
                    )}
                  </div>
                  {a.checked_in ? (
                    <p className='text-xs text-gray-400'>
                      Checked in{' '}
                      {new Date(a.checked_in_at!).toLocaleString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  ) : (
                    <button
                      onClick={() => handleCheckIn(a.id)}
                      disabled={checkingIn === a.id}
                      className={
                        a.confirmed
                          ? 'w-full border-transparent bg-green-600 px-3 py-3 text-sm text-white hover:bg-green-700 disabled:opacity-50'
                          : 'w-full border-transparent bg-amber-500 px-3 py-3 text-sm text-white hover:bg-amber-600 disabled:opacity-50'
                      }
                    >
                      {checkingIn === a.id
                        ? '...'
                        : a.confirmed
                          ? 'Check In'
                          : 'Confirm & Check In'}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop: table layout */}
            <div className='hidden overflow-x-auto border border-default sm:block'>
              <table className='w-full text-left text-sm'>
                <thead className='bg-invert text-invert'>
                  <tr>
                    <th className='px-4 py-2'>Name</th>
                    <th className='px-4 py-2'>Email</th>
                    <th className='px-4 py-2'>Crew</th>
                    <th className='px-4 py-2'>Confirmed</th>
                    <th className='px-4 py-2'>Status</th>
                    <th className='px-4 py-2'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((a) => (
                    <tr key={a.id} className='border-t border-default'>
                      <td className='px-4 py-2'>
                        {a.first_name} {a.last_name}
                      </td>
                      <td className='px-4 py-2'>{a.email}</td>
                      <td className='px-4 py-2'>{a.crew_name}</td>
                      <td className='px-4 py-2'>
                        <button
                          onClick={() =>
                            handleToggleConfirmed(a.id, !a.confirmed)
                          }
                          disabled={toggling === a.id}
                          title={
                            a.confirmed
                              ? 'Click to mark as not confirmed'
                              : 'Click to mark as confirmed'
                          }
                          className={
                            a.confirmed
                              ? 'bg-green-600 p-[0.05rem] text-sm text-white hover:bg-green-700 disabled:opacity-50'
                              : 'bg-amber-500 p-[0.05rem] text-sm text-white hover:bg-amber-600 disabled:opacity-50'
                          }
                        >
                          {toggling === a.id
                            ? '...'
                            : a.confirmed
                              ? 'Confirmed'
                              : 'Not confirmed'}
                        </button>
                      </td>
                      <td className='px-4 py-2'>
                        {a.checked_in ? (
                          <span className='bg-green-600 p-[0.05rem] text-sm text-white'>
                            Checked in
                          </span>
                        ) : (
                          <span className='text-gray-500'>Not checked in</span>
                        )}
                      </td>
                      <td className='px-4 py-2'>
                        {a.checked_in ? (
                          <span className='text-xs text-gray-400'>
                            {new Date(a.checked_in_at!).toLocaleString('de-DE', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleCheckIn(a.id)}
                            disabled={checkingIn === a.id}
                            className={
                              a.confirmed
                                ? 'border-transparent bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700 disabled:opacity-50'
                                : 'border-transparent bg-amber-500 px-3 py-1 text-xs text-white hover:bg-amber-600 disabled:opacity-50'
                            }
                          >
                            {checkingIn === a.id
                              ? '...'
                              : a.confirmed
                                ? 'Check In'
                                : 'Confirm & Check In'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {totalPages > 1 && (
          <div className='mt-4 flex items-center gap-2'>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className='border border-default px-3 py-1 disabled:opacity-50'
            >
              Prev
            </button>
            <span className='px-3 py-1'>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className='border border-default px-3 py-1 disabled:opacity-50'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
