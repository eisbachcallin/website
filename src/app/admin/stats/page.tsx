'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type TicketStats = {
  total_tickets: number
  claimed: number
  checked_in: number
  available: number
}

type CrewStats = {
  id: number
  name: string
  attendee_count: number
  checked_in_count: number
}

export default function StatsPage() {
  const [tickets, setTickets] = useState<TicketStats | null>(null)
  const [crews, setCrews] = useState<CrewStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setTickets(data.tickets)
        setCrews(data.crews)
      }
      setLoading(false)
    }
    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className='p-8'>Loading...</div>

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-semibold'>Stats</h1>
          <Link href='/admin' className='text-blue-600 hover:underline'>
            Back to Attendees
          </Link>
        </div>

        {tickets && (
          <div className='mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4'>
            <div className='rounded bg-white p-4 shadow'>
              <p className='text-3xl font-semibold'>{tickets.total_tickets}</p>
              <p className='text-sm text-gray-600'>Total Tickets</p>
            </div>
            <div className='rounded bg-white p-4 shadow'>
              <p className='text-3xl font-semibold'>{tickets.available}</p>
              <p className='text-sm text-gray-600'>Available</p>
            </div>
            <div className='rounded bg-white p-4 shadow'>
              <p className='text-3xl font-semibold'>{tickets.claimed}</p>
              <p className='text-sm text-gray-600'>Claimed</p>
            </div>
            <div className='rounded bg-white p-4 shadow'>
              <p className='text-3xl font-semibold text-green-600'>
                {tickets.checked_in}
              </p>
              <p className='text-sm text-gray-600'>Checked In</p>
            </div>
          </div>
        )}

        <h2 className='mb-4 text-xl font-semibold'>By Crew</h2>
        <div className='overflow-hidden rounded bg-white shadow'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-4 py-2'>Crew</th>
                <th className='px-4 py-2'>Registered</th>
                <th className='px-4 py-2'>Checked In</th>
                <th className='px-4 py-2'>%</th>
              </tr>
            </thead>
            <tbody>
              {crews.map((c) => (
                <tr key={c.id} className='border-t'>
                  <td className='px-4 py-2'>{c.name}</td>
                  <td className='px-4 py-2'>{c.attendee_count}</td>
                  <td className='px-4 py-2'>{c.checked_in_count}</td>
                  <td className='px-4 py-2'>
                    {c.attendee_count > 0
                      ? Math.round(
                          (c.checked_in_count / c.attendee_count) * 100
                        )
                      : 0}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className='mt-4 text-xs text-gray-500'>
          Auto-refreshes every 30 seconds
        </p>
      </div>
    </div>
  )
}
