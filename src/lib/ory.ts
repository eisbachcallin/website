import { Configuration, FrontendApi, Session } from '@ory/client'

const oryUrl = process.env.NEXT_PUBLIC_ORY_URL!

export const ory = new FrontendApi(
  new Configuration({
    basePath: oryUrl,
    baseOptions: {
      withCredentials: true,
    },
  })
)

export async function getSession(): Promise<Session | null> {
  try {
    const { data } = await ory.toSession()
    return data
  } catch {
    return null
  }
}

export function getLoginUrl(returnTo: string): string {
  return `${oryUrl}/self-service/login/browser?return_to=${encodeURIComponent(
    returnTo
  )}`
}

export function getRegistrationUrl(returnTo: string): string {
  return `${oryUrl}/self-service/registration/browser?return_to=${encodeURIComponent(
    returnTo
  )}`
}

export async function logout(): Promise<void> {
  try {
    const { data } = await ory.createBrowserLogoutFlow()
    window.location.href = data.logout_url
  } catch (e) {
    console.error('Logout failed:', e)
  }
}
