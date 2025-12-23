'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

type Attendee = {
  id: string
  first_name: string
  last_name: string
  email: string
  crew_name: string
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
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [checkingIn, setCheckingIn] = useState<string | null>(null)

  const fetchAttendees = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (crewFilter) params.set('crew_id', crewFilter)
    if (checkedInFilter) params.set('checked_in', checkedInFilter)
    params.set('page', page.toString())

    const res = await fetch(`/api/admin/attendees?${params}`)
    if (res.ok) {
      const data = await res.json()
      setAttendees(data.attendees)
      setTotalPages(data.pages)
      setTotal(data.total)
    }
    setLoading(false)
  }, [search, crewFilter, checkedInFilter, page])

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchAttendees()
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-semibold'>Attendees</h1>
          <Link href='/admin/stats' className='text-blue-600 hover:underline'>
            View Stats
          </Link>
        </div>

        <form onSubmit={handleSearch} className='mb-4 flex flex-wrap gap-2'>
          <input
            type='text'
            placeholder='Search name or email...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='rounded border px-3 py-2'
          />
          <select
            value={crewFilter}
            onChange={(e) => {
              setCrewFilter(e.target.value)
              setPage(1)
            }}
            className='rounded border px-3 py-2'
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
            className='rounded border px-3 py-2'
          >
            <option value=''>All</option>
            <option value='true'>Checked in</option>
            <option value='false'>Not checked in</option>
          </select>
          <button
            type='submit'
            className='rounded bg-black px-4 py-2 text-white'
          >
            Search
          </button>
        </form>

        <p className='mb-2 text-sm text-gray-600'>{total} attendees found</p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='overflow-x-auto rounded bg-white shadow'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='px-4 py-2'>Name</th>
                  <th className='px-4 py-2'>Email</th>
                  <th className='px-4 py-2'>Crew</th>
                  <th className='px-4 py-2'>Status</th>
                  <th className='px-4 py-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((a) => (
                  <tr key={a.id} className='border-t'>
                    <td className='px-4 py-2'>
                      {a.first_name} {a.last_name}
                    </td>
                    <td className='px-4 py-2'>{a.email}</td>
                    <td className='px-4 py-2'>{a.crew_name}</td>
                    <td className='px-4 py-2'>
                      {a.checked_in ? (
                        <span className='text-green-600'>Checked in</span>
                      ) : (
                        <span className='text-gray-500'>Not checked in</span>
                      )}
                    </td>
                    <td className='px-4 py-2'>
                      {a.checked_in ? (
                        <span className='text-xs text-gray-400'>
                          {new Date(a.checked_in_at!).toLocaleTimeString()}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleCheckIn(a.id)}
                          disabled={checkingIn === a.id}
                          className='rounded bg-green-600 px-3 py-1 text-xs text-white disabled:opacity-50'
                        >
                          {checkingIn === a.id ? '...' : 'Check In'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className='mt-4 flex gap-2'>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className='rounded border px-3 py-1 disabled:opacity-50'
            >
              Prev
            </button>
            <span className='px-3 py-1'>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className='rounded border px-3 py-1 disabled:opacity-50'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
