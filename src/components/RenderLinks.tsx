import React from 'react'
import Link from 'next/link'

interface RenderLinksProps {
  links: Array<{
    title: string
    href: string
  }>
}

const RenderLinks: React.FC<RenderLinksProps> = ({ links }) => {
  return (
    <div className='flex flex-col space-y-2'>
      {links.map((link, i) => (
        <div key={i} className='group flex items-center font-mono uppercase'>
          <div className='pr-1'>{link.title}</div>
          <Link
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className='font-sans text-accent group-hover:text-default'
          >
            {' '}
            ↗
          </Link>
        </div>
      ))}
    </div>
  )
}

export default RenderLinks
