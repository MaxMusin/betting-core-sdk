# @maxmusin/core-sdk

Core SDK for the betting platform MFE architecture.

## Features

- **API Client** - Typed fetch wrapper with authentication
- **Auth Utilities** - Token management and session handling
- **Betting Helpers** - Odds formatting, stake validation
- **React Hooks** - `useAuth`, `useBalance`, `useBettingApi`

## Installation

```bash
pnpm add @maxmusin/core-sdk
```

## Usage

```typescript
import { apiClient, formatOdds, validateStake } from '@maxmusin/core-sdk'
import { useAuth, useBalance } from '@maxmusin/core-sdk/hooks'
```
