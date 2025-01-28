'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

  // Extract `uuid` from the query string
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const uuidParam = urlParams.get('uuid')
    setUuid(uuidParam)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uuid) return alert('No UUID provided in URL!')

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formData,
          querystring: uuid,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit form.')

      // Start polling status
      pollStatus(uuid)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }
  const pollStatus = (uuid: string) => {
    console.log('Starting status polling for UUID:', uuid)

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/status?uuid=${uuid}`)
        const data = await res.json()

        console.log('Polling response:', data)

        if (data.status === 'success' || data.status === 'error') {
          console.log('Polling complete with status:', data.status)
          setStatus(data.status) // Assuming you have a state setter like setStatus
          clearInterval(interval)
        }
      } catch (error) {
        console.error('Error polling status:', error)
      }
    }, 2000)
  }

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Event Registration</h1>

      {!uuid ? (
        <p className='text-gray-600'>Please provide a valid UUID in the URL.</p>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>First Name</label>
            <input
              type='text'
              value={formData.first}
              onChange={(e) =>
                setFormData({ ...formData, first: e.target.value })
              }
              className='w-full rounded border p-2'
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
              className='w-full rounded border p-2'
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
              className='w-full rounded border p-2'
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
              className='w-full rounded border p-2'
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
            className='rounded bg-blue-600 px-4 py-2 text-white'
          >
            Submit
          </button>
        </form>
      )}

      {status && (
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
    </div>
  )
}
