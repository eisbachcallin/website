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
    <div className='mdx prose prose-sm dark:prose-invert md:prose-base sm:py-16'>
      <Component className={className} components={components} />
    </div>
  )
}
