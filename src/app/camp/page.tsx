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
  const [loading, setLoading] = useState(false) // Loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // For error messages
  const [submissionDetails, setSubmissionDetails] = useState<any | null>(null) // To store user info after success
  const [requestId, setRequestId] = useState<string | null>(null) // For requestId

  // Extract `uuid` from the query string
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const uuidParam = urlParams.get('uuid')
    setUuid(uuidParam)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uuid) return alert('No UUID provided in URL!')

    const generatedRequestId = Math.random().toString(36).substring(2, 15) // Generate requestId
    setRequestId(generatedRequestId)

    setLoading(true) // Start loading
    setErrorMessage(null) // Clear any previous errors

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formData,
          uuid: uuid,
          requestId: generatedRequestId, // Pass the requestId
        }),
      })

      if (!res.ok) throw new Error('Failed to submit form.')

      // Start polling status with the requestId
      pollStatus(uuid, generatedRequestId)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrorMessage(
        'There was an error submitting your form. Please try again.'
      )
      setLoading(false)
    }
  }

  const pollStatus = (uuid: string, requestId: string) => {
    console.log('Starting status polling for UUID:', uuid)

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/status?uuid=${uuid}&requestId=${requestId}`
        )
        const data = await res.json()

        console.log('Polling response:', data)

        if (data.status === 'success' || data.status === 'error') {
          console.log('Polling complete with status:', data.status)
          setStatus(data.status)

          // Handle successful registration
          if (data.status === 'success') {
            setSubmissionDetails({
              uuid: uuid,
              first: data.formFirst,
              last: data.formLast,
              email: data.formEmail,
              crew: data.formCrew,
            })
          }

          // If there is an error message from Zapier, display it
          if (data.status === 'error') {
            setErrorMessage(data.message || 'An unknown error occurred.')
          }

          setLoading(false) // End loading
          clearInterval(interval)
        }
      } catch (error) {
        console.error('Error polling status:', error)
        setErrorMessage('Error checking the status. Please try again later.')
        setLoading(false)
      }
    }, 2000)
  }

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Event Registration</h1>

      {!uuid ? (
        <p className='text-gray-600'>Please provide a valid UUID in the URL.</p>
      ) : submissionDetails ? (
        // Show the confirmation box after success
        <div className='rounded border border-green-600 bg-green-100 p-6'>
          <h2 className='text-xl font-bold text-green-600'>
            Registration Successful!
          </h2>
          <p className='mt-2'>
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
            className='rounded bg-blue-600 px-4 py-2 text-white disabled:bg-blue-300'
            disabled={loading}
          >
            {loading ? (
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-t-2 border-white'></span>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      )}

      {/* Show error messages */}
      {errorMessage && (
        <p className='mt-4 font-bold text-red-600'>{errorMessage}</p>
      )}

      {/* Show status message */}
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

      {/* Show a loading spinner if the form is submitting */}
      {loading && !submissionDetails && (
        <div className='mt-4 text-center'>
          <span className='h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-blue-600'></span>
        </div>
      )}
    </div>
  )
}
