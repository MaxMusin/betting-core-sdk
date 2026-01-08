import { useCallback, useEffect, useState } from 'react'
import type { AuthTokens } from '../auth'
import { clearTokens, getAccessToken, isTokenExpired, setTokens } from '../auth'

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
}

export interface UseAuthReturn extends AuthState {
  login: (tokens: AuthTokens) => void
  logout: () => void
  checkAuth: () => boolean
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    token: null,
  })

  useEffect(() => {
    const token = getAccessToken()
    const authenticated = token ? !isTokenExpired(token) : false
    
    setState({
      isAuthenticated: authenticated,
      isLoading: false,
      token: authenticated ? token : null,
    })
  }, [])

  const login = useCallback((tokens: AuthTokens) => {
    setTokens(tokens)
    setState({
      isAuthenticated: true,
      isLoading: false,
      token: tokens.accessToken,
    })
  }, [])

  const logout = useCallback(() => {
    clearTokens()
    setState({
      isAuthenticated: false,
      isLoading: false,
      token: null,
    })
  }, [])

  const checkAuth = useCallback((): boolean => {
    const token = getAccessToken()
    if (!token || isTokenExpired(token)) {
      logout()
      return false
    }
    return true
  }, [logout])

  return {
    ...state,
    login,
    logout,
    checkAuth,
  }
}
