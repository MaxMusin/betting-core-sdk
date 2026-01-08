export interface StakeValidationResult {
  valid: boolean
  error?: string
}

export interface StakeLimits {
  min: number
  max: number
}

const DEFAULT_LIMITS: StakeLimits = {
  min: 0.1,
  max: 10000,
}

export function validateStake(
  stake: number,
  limits: StakeLimits = DEFAULT_LIMITS
): StakeValidationResult {
  if (isNaN(stake) || stake <= 0) {
    return { valid: false, error: 'Stake must be a positive number' }
  }

  if (stake < limits.min) {
    return { valid: false, error: `Minimum stake is ${limits.min}` }
  }

  if (stake > limits.max) {
    return { valid: false, error: `Maximum stake is ${limits.max}` }
  }

  return { valid: true }
}

export function validateSelectionCount(
  count: number,
  maxSelections: number = 20
): StakeValidationResult {
  if (count === 0) {
    return { valid: false, error: 'At least one selection is required' }
  }

  if (count > maxSelections) {
    return { valid: false, error: `Maximum ${maxSelections} selections allowed` }
  }

  return { valid: true }
}

export function calculateAccumulatorOdds(odds: number[]): number {
  return odds.reduce((acc, odd) => acc * odd, 1)
}
