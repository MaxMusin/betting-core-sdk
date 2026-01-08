import { useCallback, useState } from 'react'
import { getApiClient } from '../api'

export interface BetPlacement {
  selections: Array<{
    eventId: string
    marketId: string
    outcomeId: string
    odds: number
  }>
  stake: number
  betType: 'single' | 'accumulator'
}

export interface BetResult {
  betId: string
  status: 'pending' | 'accepted' | 'rejected'
  potentialWin: number
}

export interface UseBettingApiReturn {
  placeBet: (bet: BetPlacement) => Promise<BetResult>
  isPlacing: boolean
  error: string | null
  clearError: () => void
}

export function useBettingApi(): UseBettingApiReturn {
  const [isPlacing, setIsPlacing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const placeBet = useCallback(async (bet: BetPlacement): Promise<BetResult> => {
    setIsPlacing(true)
    setError(null)

    try {
      const client = getApiClient()
      const result = await client.post<BetResult>('/bets', bet)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to place bet'
      setError(message)
      throw err
    } finally {
      setIsPlacing(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    placeBet,
    isPlacing,
    error,
    clearError,
  }
}
