import { Configuration, FrontendApi, Session } from '@ory/client'

type MetadataPublic = {
  admin?: boolean
}

const ory = new FrontendApi(
  new Configuration({ basePath: process.env.NEXT_PUBLIC_ORY_URL })
)

export async function getSessionFromCookie(
  cookie: string
): Promise<Session | null> {
  try {
    const { data } = await ory.toSession({ cookie })
    return data
  } catch {
    return null
  }
}

export async function requireSession(cookie: string): Promise<Session> {
  const session = await getSessionFromCookie(cookie)
  if (!session) throw new Error('unauthorized')
  return session
}

export async function requireAdmin(cookie: string): Promise<Session> {
  const session = await requireSession(cookie)
  const metadata = session.identity?.metadata_public as MetadataPublic | null
  if (metadata?.admin !== true) {
    throw new Error('forbidden')
  }
  return session
}

export function isEmailVerified(session: Session): boolean {
  return (
    session.identity?.verifiable_addresses?.some(
      (addr) => addr.via === 'email' && addr.verified
    ) ?? false
  )
}
