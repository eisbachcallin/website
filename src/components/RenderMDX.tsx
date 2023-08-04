import * as React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import RenderArtists from './RenderArtists'
import RenderLinks from './RenderLinks'
import RenderLocation from './RenderLocation'
import RenderDoors from './RenderDoors'

const components = {
  Image,
  RenderArtists,
  RenderLinks,
  RenderLocation,
  RenderDoors,
}

interface MdxProps {
  code: string
  className?: string
}

export function RenderMdx({ code, className }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className='mdx prose prose-sm h-full flex-col px-2 pb-8 pt-2 font-sans dark:prose-invert md:prose-base prose-headings:font-mono prose-headings:uppercase prose-a:text-pink-500 prose-a:no-underline hover:prose-a:text-black xl:border-r xl:border-black'>
      <Component className={className} components={components} />
    </div>
  )
}
