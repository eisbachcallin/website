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
      className={clsx('border-y border-black bg-white', className)}
      aria-label='Global'
    >
      <div className='mx-auto flex h-12 max-w-max items-center justify-end p-2 xl:border-x xl:border-black'>
        <p className='text-sm font-light uppercase leading-none text-black'>
          eisbach callin ©{getYear(new Date())}
        </p>
      </div>
    </footer>
  )
}

export default Footer
