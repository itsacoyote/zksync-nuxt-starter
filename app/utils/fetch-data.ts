/**
 * Configuration for extracting and validating block explorer API responses
 */
type FetchConfig<TData, TResult> = {
  extractResult: (data: TData) => TResult
  checkError: (data: TData) => {
    hasError: boolean
    errorMessage?: string
    errorCause?: string
  }
}

/**
 * Generic function to fetch and process block explorer API data
 * Handles response validation, error checking, and result extraction based on configuration
 */
async function fetchBlockExplorerApi<TData, TResult>(fetchQuery: () => Promise<Response>,
  config: FetchConfig<TData, TResult>): Promise<TResult> {
  let response: Response
  try {
    response = await fetchQuery()
  } catch (error) {
    // Re-throw URL configuration errors without retrying
    if (error instanceof Error && error.message === "Block explorer API URL is not defined for the current network") {
      throw error
    }
    throw error
  }

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const data = await response.json()
  const {
    hasError,
    errorMessage,
    errorCause,
  } = config.checkError(data)

  if (hasError) {
    const error = new Error(errorMessage || "API Error")
    if (errorCause) {
      (error as Error & { cause?: string }).cause = errorCause
    }
    throw error
  }

  return config.extractResult(data)
}

/**
 * Fetches data from block explorer API endpoints that return result-based responses
 */
export async function fetchBlockExplorerApiData<T>(fetchQuery: () => Promise<Response>): Promise<T> {
  return fetchBlockExplorerApi<BlockExplorerApiResponse<T>, T>(fetchQuery, {
    extractResult: (data: BlockExplorerApiResponse<T>) => data.result,
    checkError: (data: BlockExplorerApiResponse<T>) => ({
      hasError: data.message === "NOTOK",
      errorMessage: `API ${data.result}`,
      errorCause: "NOTOK",
    }),
  })
}

/**
 * Fetches data from block explorer API endpoints that return items-based responses
 */
export async function fetchBlockExplorerApiAddressData<T>(fetchQuery: () => Promise<Response>): Promise<T> {
  return fetchBlockExplorerApi<BlockExplorerErrorResponse | BlockExplorerApiAddressResponse<T>, T>(fetchQuery, {
    extractResult: data => (data as BlockExplorerApiAddressResponse<T>).items,
    checkError: (data) => {
      const errorResponse = data as BlockExplorerErrorResponse
      return {
        hasError: !!errorResponse.error,
        errorMessage: errorResponse.message?.join(", "),
      }
    },
  })
}

export function blockExplorerApiRetry(_failureCount: number, error: Error) {
  if (error.message === "Block explorer API URL is not defined for the current network") {
    return false
  }
  if (error.cause === "NOTOK") {
    return false
  }

  return true
}
