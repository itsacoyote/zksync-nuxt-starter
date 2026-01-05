# Estimate Fee

For bridging, we need to estimate the fee.
This will occur on the @app/pages/bridge.vue file.
Create a new useBridgeFee.vue composable that we will use to calculate fees for bridging.
This is not all of the logic, we will introduce more logic based on network selection and other variables
so make sure this is modular and commented well to describe how to calculate and return fee value.

For deposits (L1 -> L2)

- The gas fee limit for ERC20 deposit is 1000000
- The gas fee limit for ETH deposit is 200000
- Calculate the fee limit for the user at 115% of the gas fee limit to ensure some padding and avoiding not enough gas for a transaction execution
- The base token for calculating fees is ETH when depositing from L1 to L2.

For withdrawals (L2 -> L1)

- the base token for calculating fees is the L2 base token at the address defined in @app/utils/constants.ts `L2_BASE_TOKEN_ADDRESS`.

If there is a `formattedBalance`, we will use the fee to add functionality to the 25%, 50%, 75% and MAX buttons
so that we can set the `transferAmount` to a value that doesn't fail during bridging because of not enough balance left over for fees.

Use viem and wagmi where you can to calculate the fees for bridging.
