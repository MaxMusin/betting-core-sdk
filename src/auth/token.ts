const TOKEN_KEY = 'betting_auth_token'
const REFRESH_TOKEN_KEY = 'betting_refresh_token'

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  expiresAt?: number
}

export function setTokens(tokens: AuthTokens): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem(TOKEN_KEY, tokens.accessToken)
  if (tokens.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
  }
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function clearTokens(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return !!getAccessToken()
}

export function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token)
  if (!payload || typeof payload.exp !== 'number') return true
  return Date.now() >= payload.exp * 1000
}
