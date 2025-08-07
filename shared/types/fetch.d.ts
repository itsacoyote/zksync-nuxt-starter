interface BlockExplorerApiResponse<T> {
  result: T
  message: string
  status: string
}

interface BlockExplorerApiAddressResponse<T> {
  items: T
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
  links: {
    first: string
    previous: string
    next: string
    last: string
  }
}

interface BlockExplorerErrorResponse {
  statusCode: number
  message: string[]
  error: string
}
