/**
 * AUTO-REFRESH SYSTEM
 *
 * Global auto-refresh system for the bridge page. Allows multiple components
 * and composables to subscribe to a synchronized refresh cycle.
 *
 * HOW IT WORKS:
 * 1. Components call `subscribe(name, callback)` to register a refresh operation
 * 2. Every 10 seconds, all subscriber callbacks are executed in parallel
 * 3. Progress tracking shows which operations are in-flight
 * 4. Countdown timer shows seconds until next refresh
 * 5. Manual refresh button allows immediate refresh trigger
 *
 * USAGE EXAMPLE:
 * ```typescript
 * const bridgeRefreshStore = useBridgeRefreshStore()
 *
 * onMounted(() => {
 *   // Subscribe with a unique name and callback
 *   const unsubscribe = bridgeRefreshStore.subscribe('my-operation', async () => {
 *     await fetchSomeData()
 *   })
 *
 *   // Clean up on unmount
 *   onUnmounted(() => unsubscribe())
 * })
 * ```
 */
export const useBridgeRefreshStore = defineStore("bridgeRefresh", () => {
  // Auto-refresh configuration and state
  const refreshInterval = ref<number>(10_000) // 10 seconds between refresh cycles
  const isRefreshing = ref<boolean>(false) // True when any subscriber is executing
  const lastRefreshTime = ref<number>(Date.now()) // Timestamp of last completed refresh
  const nextRefreshTime = ref<number>(Date.now() + 10_000) // Timestamp of next scheduled refresh
  const countdown = ref<number>(10) // Seconds remaining until next refresh (for UI display)

  // Timer references
  const refreshTimer = ref<NodeJS.Timeout | null>(null) // Main refresh cycle interval
  const countdownTimer = ref<NodeJS.Timeout | null>(null) // Updates countdown every second

  /**
   * Represents a subscriber to the auto-refresh system
   */
  interface RefreshSubscriber {
    id: string // Unique identifier (auto-generated)
    name: string // Human-readable name for debugging (e.g., "gas-price", "token-balance")
    callback: () => Promise<void> | void // Function to execute on each refresh
    isRefreshing: boolean // True when this subscriber's callback is executing
    lastError: Error | null // Last error encountered (null if no error)
    enabled: boolean // If false, subscriber won't be called (for future use)
  }

  // Map of all active subscribers (key = subscriber.id, value = subscriber object)
  const subscribers = ref<Map<string, RefreshSubscriber>>(new Map())

  /**
   * Execute all subscriber callbacks in parallel
   *
   * This is the core refresh cycle that:
   * 1. Checks if a refresh is already in progress (prevents overlapping)
   * 2. Executes all enabled subscriber callbacks in parallel
   * 3. Handles errors gracefully (one failure doesn't affect others)
   * 4. Updates refresh state and countdown
   *
   * IMPORTANT: Errors in individual subscribers are caught and logged but
   * don't prevent other subscribers from executing. This ensures one broken
   * operation doesn't break the entire refresh system.
   */
  async function executeRefreshCycle(): Promise<void> {
    // Prevent overlapping refresh cycles
    if (isRefreshing.value) {
      console.warn("[Bridge Auto-Refresh] Refresh already in progress, skipping cycle")
      return
    }

    isRefreshing.value = true
    const activeSubscribers = Array.from(subscribers.value.values()).filter(s => s.enabled)

    // Execute all subscribers in parallel for efficiency
    const promises = activeSubscribers.map(async (subscriber) => {
      try {
        subscriber.isRefreshing = true
        subscriber.lastError = null // Clear previous errors

        // Execute the subscriber's callback
        await subscriber.callback()
      } catch (error) {
        // Store error but don't throw - allow other subscribers to continue
        subscriber.lastError = error instanceof Error ? error : new Error(String(error))
      } finally {
        subscriber.isRefreshing = false
      }
    })

    // Wait for all subscribers to complete (or fail)
    await Promise.allSettled(promises)

    // Update refresh state
    isRefreshing.value = false
    lastRefreshTime.value = Date.now()
    nextRefreshTime.value = Date.now() + refreshInterval.value

    // Reset countdown for next cycle
    countdown.value = Math.floor(refreshInterval.value / 1000)
  }

  /**
   * Update countdown timer every second
   *
   * Provides a real-time countdown in seconds for the UI. Updates independently
   * of the main refresh cycle to ensure smooth UI updates.
   */
  function startCountdown(): void {
    // Clear any existing countdown timer
    if (countdownTimer.value) {
      clearInterval(countdownTimer.value)
    }

    // Initialize countdown
    countdown.value = Math.floor(refreshInterval.value / 1000)

    // Update countdown every second
    countdownTimer.value = setInterval(() => {
      const remaining = Math.max(0, Math.floor((nextRefreshTime.value - Date.now()) / 1000))
      countdown.value = remaining
    }, 1000)
  }

  /**
   * Subscribe to the auto-refresh system
   *
   * Registers a callback to be executed on each refresh cycle. All subscribers
   * are called in parallel every 10 seconds.
   *
   * @param name - Human-readable identifier for debugging (e.g., "gas-price", "token-balance")
   * @param callback - Function to execute on each refresh (can be async or sync)
   * @returns Unsubscribe function - MUST be called on component unmount to prevent memory leaks
   *
   * @example
   * ```typescript
   * // In a composable
   * const bridgeStore = useBridgeStore()
   * let unsubscribe: (() => void) | null = null
   *
   * onMounted(() => {
   *   unsubscribe = bridgeRefreshStore.subscribe('gas-price', async () => {
   *     await fetchGasPrice()
   *   })
   * })
   *
   * onUnmounted(() => {
   *   if (unsubscribe) unsubscribe()
   * })
   * ```
   */
  function subscribe(name: string, callback: () => Promise<void> | void): () => void {
    // Generate unique ID to prevent collisions
    const id = `${name}-${Date.now()}-${Math.random()}`

    subscribers.value.set(id, {
      id,
      name,
      callback,
      isRefreshing: false,
      lastError: null,
      enabled: true,
    })

    // Return cleanup function
    return () => {
      subscribers.value.delete(id)
    }
  }

  /**
   * Manually trigger an immediate refresh cycle
   *
   * Executes all subscriber callbacks immediately, without waiting for the next
   * scheduled refresh. Useful for "Refresh Now" buttons in the UI.
   *
   * @example
   * ```vue
   * <button @click="bridgeStore.manualRefresh()">
   *   Refresh Now
   * </button>
   * ```
   */
  async function manualRefresh(): Promise<void> {
    await executeRefreshCycle()
  }

  /**
   * Start the auto-refresh timer
   *
   * Begins the refresh cycle and countdown timer. Should be called when the
   * bridge page mounts.
   *
   * IMPORTANT: Must be paired with `stopAutoRefresh()` on unmount to prevent
   * memory leaks and unnecessary network requests.
   *
   * @example
   * ```typescript
   * onMounted(() => {
   *   bridgeStore.startAutoRefresh()
   * })
   *
   * onUnmounted(() => {
   *   bridgeStore.stopAutoRefresh()
   * })
   * ```
   */
  function startAutoRefresh(): void {
    // Prevent multiple timers if already running
    if (refreshTimer.value)
      return

    // Execute immediate refresh on start
    executeRefreshCycle()

    // Set up interval for future refreshes
    refreshTimer.value = setInterval(executeRefreshCycle, refreshInterval.value)

    // Start countdown timer for UI
    startCountdown()
  }

  /**
   * Stop the auto-refresh timer
   *
   * Cleans up all timers and stops the refresh cycle. Should be called when the
   * bridge page unmounts.
   *
   * IMPORTANT: Always call this on component unmount to prevent memory leaks.
   */
  function stopAutoRefresh(): void {
    if (refreshTimer.value) {
      clearInterval(refreshTimer.value)
      refreshTimer.value = null
    }
    if (countdownTimer.value) {
      clearInterval(countdownTimer.value)
      countdownTimer.value = null
    }
  }

  const hasErrors = computed(() => Array.from(subscribers.value.values()).some(s => s.lastError !== null))
  const refreshingCount = computed(() => Array.from(subscribers.value.values()).filter(s => s.isRefreshing).length)

  return {
    // Auto-refresh API
    subscribe,
    manualRefresh,
    startAutoRefresh,
    stopAutoRefresh,

    // Direct access to refresh state properties (for better reactivity)
    isRefreshing,
    countdown,
    lastRefreshTime,
    hasErrors,
    refreshingCount,
  }
})
