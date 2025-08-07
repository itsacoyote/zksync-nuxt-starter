// TODO: figure out a way to potentially simplify these two functions,
// fetchBlockExplorerApiData and fetchBlockExplorerApiAddressData
export async function fetchBlockExplorerApiData<T>(fetchQuery: () => Promise<Response>): Promise<T> {
  const response = await fetchQuery()
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const data: BlockExplorerApiResponse<T> = await response.json()
  if (data.message === "NOTOK") {
    throw new Error(`API ${data.result}`, { cause: "NOTOK" })
  }

  return data.result
}

export async function fetchBlockExplorerApiAddressData<T>(fetchQuery: () => Promise<Response>): Promise<T> {
  const response = await fetchQuery()
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const data: BlockExplorerErrorResponse | BlockExplorerApiAddressResponse<T> = await response.json()
  if ((data as BlockExplorerErrorResponse).error) {
    throw new Error(`${(data as BlockExplorerErrorResponse).message.join(", ")}`)
  }

  return (data as BlockExplorerApiAddressResponse<T>).items
}

export function blockExplorerApiRetry(_failureCount: number, error: Error) {
  if (error.cause === "NOTOK") {
    return false
  }

  return true
}
