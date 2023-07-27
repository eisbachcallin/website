import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { getYear } from 'date-fns'

type FooterProps = {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={clsx('border-t border-pink-500 bg-black ', className)}
      aria-label='Global'
    >
      <div className='mx-auto flex h-12 max-w-max items-center justify-end p-2'>
        <p className='text-sm font-light uppercase leading-none text-white'>
          eisbach callin ©{getYear(new Date())}
        </p>
      </div>
    </footer>
  )
}

export default Footer
