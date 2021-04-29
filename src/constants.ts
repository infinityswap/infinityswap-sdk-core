import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | string | number

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  MUMBAI = 80001,
  MATIC = 137,
  XDAI = 100,
  HARMONY = 1666600000,
  HARMONY_B = 1666700000,
  OETH = 10,
  BSC = 56,
  CHAPEL = 97,
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const MaxUint256 = JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
