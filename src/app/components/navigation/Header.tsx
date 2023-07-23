'use client'

import Logo from '@/app/assets/Logo'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

type HeaderProps = {
  className?: string
}

const navigation = [
  { name: 'next', href: '/next' },
  { name: 'past', href: '/past' },
  { name: 'about', href: '/about' },
]

const Header: React.FC<HeaderProps> = ({ className }) => {
  const currentRoute = usePathname()
  const linkStyle = 'text-sm font-light uppercase leading-none '
  const activeStyle = linkStyle + ' text-pink-500'
  const nonActiveStyle = linkStyle + 'text-gray-900 hover:text-pink-500'
  return (
    <header
      className={clsx(
        'sticky top-0 z-10 border-b border-black bg-white/5 backdrop-blur-2xl',
        className
      )}
    >
      <nav
        className='mx-auto flex items-center justify-between p-4 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Eisbach Callin</span>
            <Logo className='h-6 w-6 fill-black dark:fill-white' />
          </Link>
        </div>
        <div className='flex gap-x-4'>
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
