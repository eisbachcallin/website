import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { getYear } from 'date-fns'
import { ModeSelect } from '../layout/ModeSelect'

type FooterProps = {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={clsx('border-y border-default bg-default', className)}
      aria-label='Global'
    >
      <div className='items mx-auto flex h-12 max-w-max items-center justify-between p-2 xl:border-x xl:border-default'>
        <ModeSelect />
        <p className='text-sm font-light uppercase leading-none text-default'>
          eisbach callin ©{getYear(new Date())}
        </p>
      </div>
    </footer>
  )
}

export default Footer
