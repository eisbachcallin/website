import React from 'react'
import Link from 'next/link'
import SplitContainer from '@/components/layout/SplitContainer'
import ResidentSection from '@/components/ResidentSection'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404',
}

export default function NotFound() {
  return (
    <SplitContainer
      stickyLeft
      leftSide={
        <div className='space-y-8 object-cover font-sans sm:text-8xl xl:space-y-16'>
          <div className='text-2xl sm:text-3xl'>
            <h1>
              404 / This page doesn’t exist. Check{' '}
              <Link className='text-accent hover:text-default' href='/'>
                home
              </Link>{' '}
              to find all upcoming or past Eisbach Callin events.
            </h1>
          </div>
        </div>
      }
      rightSide={
        <div className='p-2'>
          <Image
            priority
            width={800}
            height={500}
            src='/about/group.jpg'
            alt='foobar'
            className='mb-2 w-full border border-default object-cover'
          />
        </div>
      }
    />
  )
}
