// API
export { ApiClient, getApiClient, initApiClient } from './api'
export type { ApiConfig, ApiError } from './api'

// Auth
export {
    clearTokens, getAccessToken,
    getRefreshToken, isAuthenticated, isTokenExpired, parseJwt, setTokens
} from './auth'
export type { AuthTokens } from './auth'

// Betting utilities
export {
    americanToDecimal, calculateAccumulatorOdds, calculatePotentialWin,
    calculateProfit, decimalToAmerican, decimalToFractional, formatOdds, validateSelectionCount, validateStake
} from './betting'
export type { OddsFormat, StakeLimits, StakeValidationResult } from './betting'

// Hooks (also available via '@maxmusin/core-sdk/hooks')
export { useAuth, useBalance, useBettingApi } from './hooks'
export type {
    AuthState, BetPlacement,
    BetResult, UseAuthReturn,
    UseBalanceReturn, UseBettingApiReturn
} from './hooks'

