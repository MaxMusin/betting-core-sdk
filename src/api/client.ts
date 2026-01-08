export interface ApiConfig {
  baseUrl: string
  getAuthToken?: () => string | null
}

export interface ApiError {
  status: number
  message: string
  code?: string
}

export class ApiClient {
  private config: ApiConfig

  constructor(config: ApiConfig) {
    this.config = config
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`
    const token = this.config.getAuthToken?.()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      ;(headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        message: response.statusText,
      }
      try {
        const body = await response.json()
        error.message = body.message || error.message
        error.code = body.code
      } catch {
        // Ignore JSON parse errors
      }
      throw error
    }

    return response.json()
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

let defaultClient: ApiClient | null = null

export function initApiClient(config: ApiConfig): ApiClient {
  defaultClient = new ApiClient(config)
  return defaultClient
}

export function getApiClient(): ApiClient {
  if (!defaultClient) {
    throw new Error('API client not initialized. Call initApiClient() first.')
  }
  return defaultClient
}
