'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { logout } from '@/lib/ory'

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

  if (loading) {
    return (
      <div className='min-h-screen bg-default p-8 font-sans'>
        <span className='mx-auto block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black'></span>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-default p-4 font-sans text-default'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-6 flex items-center justify-between border-b border-default pb-4'>
          <h1 className='text-2xl'>Stats</h1>
          <div className='flex items-center space-x-4'>
            <Link
              href='/admin'
              className='bg-accent p-[0.05rem] text-onaccent hover:text-invert'
            >
              Back to Attendees
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

        {tickets && (
          <div className='mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4'>
            <div className='border border-default p-4'>
              <p className='text-3xl'>{tickets.total_tickets}</p>
              <p className='text-sm'>Total Tickets</p>
            </div>
            <div className='border border-default p-4'>
              <p className='text-3xl'>{tickets.available}</p>
              <p className='text-sm'>Available</p>
            </div>
            <div className='border border-default p-4'>
              <p className='text-3xl'>{tickets.claimed}</p>
              <p className='text-sm'>Claimed</p>
            </div>
            <div className='border p-4'>
              <p className='text-3xl'>{tickets.checked_in}</p>
              <p className='text-sm'>Checked In</p>
            </div>
          </div>
        )}

        <h2 className='mb-4 text-xl'>By Crew</h2>
        <div className='overflow-hidden border border-default'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-invert text-invert'>
              <tr>
                <th className='px-4 py-2'>Crew</th>
                <th className='px-4 py-2'>Registered</th>
                <th className='px-4 py-2'>Checked In</th>
                <th className='px-4 py-2'>%</th>
              </tr>
            </thead>
            <tbody>
              {crews.map((c) => (
                <tr key={c.id} className='border-t border-default'>
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
