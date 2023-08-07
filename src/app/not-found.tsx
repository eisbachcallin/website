import SplitContainer from '@/components/layout/SplitContainer'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 - Event not found',
  description: 'The requested event could not be found.',
}

export default function NotFound() {
  return (
    <>
      <link
        rel='icon'
        href='/icon.svg'
        type='image/svg+xml'
        sizes='256x256'
      ></link>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1'
      ></meta>
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
              src='/error/404.jpg'
              alt='The requested event could not be found'
              className='w-full border border-default object-cover'
            />
          </div>
        }
      />
    </>
  )
}
