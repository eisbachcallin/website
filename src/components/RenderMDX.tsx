import * as React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'

const components = {
  Image,
}

interface MdxProps {
  code: string
  className?: string
}

export function RenderMdx({ code, className }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className='mdx prose prose-sm h-full flex-col p-2 font-sans dark:prose-invert md:prose-base xl:border-r xl:border-black'>
      <Component className={className} components={components} />
    </div>
  )
}
