import { allEvents } from 'contentlayer/generated'
import React from 'react'
import { notFound } from 'next/navigation'
import { RenderMdx } from '@/components/RenderMDX'
import { Metadata } from 'next'
import EventHero from '@/components/EventHero'
import SplitContainer from '@/components/layout/SplitContainer'

interface PageProps {
  params: {
    eventSlug: string
  }
}

async function getPostFromParams(slug: string) {
  const event = allEvents.find((post) => post.slugAsParams === slug)
  if (!event) notFound()
  return event
}

export const generateStaticParams = async () =>
  allEvents.map((post) => ({ slug: post.slugAsParams }))

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostFromParams(params.eventSlug)

  if (!post) {
    return {
      title: '404 - Event not found',
      description: 'The requested event could not be found.',
    }
  }

  return {
    title: post.mdxMeta.title,
    description: post.mdxMeta.description,
  }
}

const EventPostPage = async ({ params }: PageProps) => {
  const post = await getPostFromParams(params.eventSlug)

  return (
    <SplitContainer
      stickyLeft
      leftSide={<EventHero post={post} />}
      rightSide={<RenderMdx code={post.body.code} />}
    />
  )
}

export default EventPostPage
