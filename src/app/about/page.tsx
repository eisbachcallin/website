import React from 'react'
import ArtistCard from '@/components/ArtistCard'
import artists from '@/config/artists'
import Image from 'next/image'
import Link from 'next/link'
import SplitContainer from '@/components/layout/SplitContainer'

const About = () => {
  return (
    <SplitContainer
      stickyLeft
      leftSide={
        <div className='space-y-8 object-cover font-sans sm:text-8xl xl:space-y-16'>
          <section className='text-2xl sm:text-3xl xl:max-w-[30ch] xl:text-4xl'>
            <span className='sr-only'>About Eisbach Callin</span>
            <h1>
              Eisbach Callin is a underground dance party at home in Munich,
              Germany since 2010. All of this is only possible through the
              dedication and love of all of our supporters. Hugs and kisses for
              your support over the years 🤗😚
            </h1>
          </section>
          <section className='text-2xl sm:text-3xl xl:max-w-[30ch] xl:text-4xl'>
            <span className='sr-only'>Links & Socials</span>
            <p>
              Don’t be shy and send us an{' '}
              <Link
                className='text-pink-500 hover:text-gray-900'
                href='mailto:eisbach@gmail.com'
              >
                email
              </Link>{' '}
              or follow us on our{' '}
              <Link
                className='text-pink-500 hover:text-gray-900'
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.instagram.com/eisbachcallin/?hl=de'
              >
                instagram
              </Link>{' '}
              &{' '}
              <Link
                className='text-pink-500 hover:text-gray-900'
                target='_blank'
                rel='noopener noreferrer'
                href='/'
              >
                telegram
              </Link>{' '}
              channels! Feel free to give most of our recordings a listen too on{' '}
              <Link
                className='text-pink-500 hover:text-gray-900'
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
        <div className='space-y-8 sm:py-16'>
          <Image
            priority
            width={800}
            height={500}
            src='/about/group.jpg'
            alt='foobar'
            className='w-full border border-black object-cover'
          />
          <section>
            <span className='sr-only'>Resident artists</span>
            {artists.map((artist, index) => (
              <ArtistCard key={index} artist={artist} />
            ))}
          </section>
        </div>
      }
    />
  )
}

export default About
