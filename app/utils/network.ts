import { isBoolean } from "es-toolkit"
import { isObject } from "es-toolkit/compat"

import type { ZkSyncNetwork } from "~~/shared/types/networks"

export function isNetworkL1(network: ZkSyncNetwork) {
  return isBoolean(network.l1Network)
}

export function isNetworkL2(network: ZkSyncNetwork) {
  return isObject(network.l1Network)
}

export function networkLayer(network: ZkSyncNetwork): "L1" | "L2" | "gateway" {
  if (network.nativeTokenBridgingOnly) {
    return "gateway"
  }
  if (isBoolean(network.l1Network)) {
    return "L1"
  }
  return "L2"
}
