import { allEvents } from 'contentlayer/generated'
import React from 'react'
import { notFound } from 'next/navigation'
import { RenderMdx } from '@/components/RenderMDX'
import { Metadata } from 'next'
import EventHero from '@/components/EventHero'

interface PageProps {
  params: {
    eventSlug: string
  }
}

async function getPostFromParams(slug: string) {
  const examplePost = allEvents.find((post) => post.slugAsParams === slug)
  if (!examplePost) notFound()
  return examplePost
}

export const generateStaticParams = async () =>
  allEvents.map((post) => ({ slug: post.slugAsParams }))

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostFromParams(params.eventSlug)
  return {
    title: post.mdxMeta.title,
    description: post.mdxMeta.description,
  }
}

const ExamplePostPage = async ({ params }: PageProps) => {
  const post = await getPostFromParams(params.eventSlug)

  return (
    <article className='mx-auto max-w-5xl p-5'>
      <EventHero post={post} />
      <RenderMdx code={post.body.code} />
    </article>
  )
}

export default ExamplePostPage
