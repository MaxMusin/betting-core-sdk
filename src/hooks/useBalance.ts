import { useCallback, useState } from 'react'

export interface UseBalanceReturn {
  balance: number
  currency: string
  updateBalance: (newBalance: number) => void
  addToBalance: (amount: number) => void
  subtractFromBalance: (amount: number) => void
  formatBalance: () => string
}

export function useBalance(
  initialBalance: number = 0,
  currency: string = 'USD'
): UseBalanceReturn {
  const [balance, setBalance] = useState(initialBalance)

  const updateBalance = useCallback((newBalance: number) => {
    setBalance(newBalance)
  }, [])

  const addToBalance = useCallback((amount: number) => {
    setBalance((prev: number) => prev + amount)
  }, [])

  const subtractFromBalance = useCallback((amount: number) => {
    setBalance((prev: number) => Math.max(0, prev - amount))
  }, [])

  const formatBalance = useCallback(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(balance)
  }, [balance, currency])

  return {
    balance,
    currency,
    updateBalance,
    addToBalance,
    subtractFromBalance,
    formatBalance,
  }
}
