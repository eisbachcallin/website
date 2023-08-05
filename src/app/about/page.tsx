import React from 'react'
import Link from 'next/link'
import SplitContainer from '@/components/layout/SplitContainer'
import ResidentSection from '@/components/ResidentSection'
import artists from '../../config/residents'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Munich’s finest underground rave',
}

const About = () => {
  return (
    <SplitContainer
      stickyLeft
      leftSide={
        <div className='space-y-8 object-cover font-sans sm:text-8xl xl:space-y-16'>
          <div className='text-2xl sm:text-3xl'>
            <span className='sr-only'>About Eisbach Callin</span>
            <h1>
              Eisbach Callin is a underground dance party at home in Munich,
              Germany since 2010. All of this is only possible through the
              dedication and love of all of our supporters. Hugs and kisses for
              your support over the years 🤗😚
            </h1>
          </div>
          <section className='text-2xl sm:text-3xl'>
            <span className='sr-only'>Links & Socials</span>
            <p>
              Don’t be shy and send us an{' '}
              <Link
                className='text-accent hover:text-default'
                href='mailto:eisbach@gmail.com'
              >
                email
              </Link>{' '}
              or follow us on our{' '}
              <Link
                className='text-accent hover:text-default'
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.instagram.com/eisbachcallin/?hl=de'
              >
                instagram
              </Link>{' '}
              &{' '}
              <Link
                className='text-accent hover:text-default'
                target='_blank'
                rel='noopener noreferrer'
                href='/'
              >
                telegram
              </Link>{' '}
              channels! Feel free to give most of our recordings a listen too on{' '}
              <Link
                className='text-accent hover:text-default'
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.mixcloud.com/eisbachcallin/'
              >
                mixcloud
              </Link>
              .
            </p>
          </section>
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
          <ResidentSection residents={artists} label='residents artists' />
        </div>
      }
    />
  )
}

export default About
