'use client'

import Logo from '@/assets/Logo'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

type HeaderProps = {
  className?: string
}

const navigation = [
  { name: 'next', href: '/' },
  { name: 'past', href: '/past' },
  { name: 'about', href: '/about' },
]

const Header: React.FC<HeaderProps> = ({ className }) => {
  const currentRoute = usePathname()
  const linkStyle = 'text-sm font-light uppercase leading-none'
  const activeStyle = linkStyle + ' text-onaccent bg-accent'
  const nonActiveStyle = linkStyle + ' text-default hover:text-accent'
  return (
    <header
      className={clsx('sticky top-0 z-10 border-y border-default', className)}
    >
      <nav
        className='mx-auto flex max-w-max items-center justify-between bg-default p-2 xl:border-x xl:border-default'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link href={'/'} className='-m-1.5 p-1.5'>
            <span className='sr-only'>Eisbach Callin</span>
            <Logo className='h-6 w-6 fill-default' />
          </Link>
        </div>
        <div className='flex items-center gap-x-4'>
          {navigation.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={
                currentRoute === `${item.href}` ? activeStyle : nonActiveStyle
              }
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header
