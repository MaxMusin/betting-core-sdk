export type OddsFormat = 'decimal' | 'fractional' | 'american'

export function formatOdds(decimal: number, format: OddsFormat = 'decimal'): string {
  switch (format) {
    case 'decimal':
      return decimal.toFixed(2)
    
    case 'fractional': {
      const numerator = Math.round((decimal - 1) * 100)
      const denominator = 100
      const gcd = greatestCommonDivisor(numerator, denominator)
      return `${numerator / gcd}/${denominator / gcd}`
    }
    
    case 'american': {
      if (decimal >= 2) {
        return `+${Math.round((decimal - 1) * 100)}`
      } else {
        return `${Math.round(-100 / (decimal - 1))}`
      }
    }
    
    default:
      return decimal.toFixed(2)
  }
}

export function decimalToFractional(decimal: number): { numerator: number; denominator: number } {
  const numerator = Math.round((decimal - 1) * 100)
  const denominator = 100
  const gcd = greatestCommonDivisor(numerator, denominator)
  return {
    numerator: numerator / gcd,
    denominator: denominator / gcd,
  }
}

export function decimalToAmerican(decimal: number): number {
  if (decimal >= 2) {
    return Math.round((decimal - 1) * 100)
  }
  return Math.round(-100 / (decimal - 1))
}

export function americanToDecimal(american: number): number {
  if (american > 0) {
    return american / 100 + 1
  }
  return 100 / Math.abs(american) + 1
}

export function calculatePotentialWin(stake: number, odds: number): number {
  return stake * odds
}

export function calculateProfit(stake: number, odds: number): number {
  return stake * (odds - 1)
}

function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b)
}
