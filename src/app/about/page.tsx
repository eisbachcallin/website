import React from 'react'
import ArtistCard from '@/components/ArtistCard'
import artists from '@/config/artists'
import Image from 'next/image'
import Link from 'next/link'

const About = () => {
  return (
    <div className='mx-auto w-full px-2 py-12'>
      <div className='flex flex-col items-start justify-center gap-6 xl:mx-auto xl:grid xl:max-w-max xl:grid-cols-2 '>
        <div className='  xl:grid-col-1  mx-auto w-full max-w-max space-y-8 object-cover font-sans sm:py-16 sm:text-8xl xl:sticky xl:top-0 xl:max-w-none  xl:space-y-16  '>
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

        <div className='xl:max-w-1/2 xl:grid-col-1 max-w-maxxl:max-w-none xl:py-16'>
          <div className='space-y-8 sm:max-w-[60ch] xl:max-w-[80ch] '>
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
        </div>
      </div>
    </div>
  )
}

export default About
