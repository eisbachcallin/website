import Image from 'next/image'
import SplitContainer from '@/components/layout/SplitContainer'
import Link from 'next/link'

// Placeholder shown between CAMP events.
// The full ticket-redemption page is preserved in `page.event.tsx.bak` —
// swap it back into `page.tsx` when the next CAMP event is planned.
export default function CampPage() {
  return (
    <SplitContainer
      stickyLeft
      leftSide={
        <div className='flex flex-col items-start space-y-8'>
          <div className='flex-1 font-sans text-2xl sm:text-3xl xl:space-y-16'>
            <div>
              <span className='sr-only'>Eisbach Callin Camp</span>
              <h1>CAMP</h1>
            </div>
          </div>
          <div className='w-full flex-1 space-y-4 border border-default p-3'>
            <p className='font-sans text-2xl text-default sm:text-3xl'>
              Danke dass ihr alle da wart und bis zum nächsten Mal!
            </p>
            <p className='mt-2 font-sans text-default'>
              Fragen? Schreib uns an{' '}
              <Link
                className='p-[0.05rem] font-normal text-accent hover:text-black'
                href='mailto:mail@eisbachcallin.com'
              >
                mail@eisbachcallin.com
              </Link>
              .
            </p>
          </div>
        </div>
      }
      rightSide={
        <div className='font-sans text-default'>
          <div className='grid grid-cols-2 gap-2 border-b border-default  p-2 md:grid-cols-4'>
            <div className='grid gap-2'>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/1-03.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/1-02.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/1-01.png'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/2-03.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/2-02.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/2-01.png'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/3-03.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/3-02.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/3-01.png'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/4-03.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/4-02.png'
                />
              </div>
              <div>
                <Image
                  width={800}
                  height={800}
                  alt='An underground dance party from Eisbach Callin'
                  className='h-full max-w-full border border-default object-cover'
                  src='/camp/4-01.png'
                />
              </div>
            </div>
          </div>

          <div className='p-2 text-xl font-normal text-default sm:text-2xl'>
            <div className='flex max-w-4xl flex-col space-y-2 sm:flex-row sm:items-start sm:gap-4 sm:space-y-0'>
              <div className='space-y-4 self-center'>
                <p className='bg-invert p-[0.05rem] text-invert'>
                  Bis zum nächsten Mal.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
