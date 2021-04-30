import invariant from 'tiny-invariant'
import validateAndParseAddress from '../utils/validateAndParseAddress'
import { ChainId } from '../constants'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId | number
  public readonly address: string

  public constructor(chainId: ChainId | number, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH9: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH9',
    'Wrapped Ether'
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH9',
    'Wrapped Ether'
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH9',
    'Wrapped Ether'
  ),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH9', 'Wrapped Ether'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, '0xd0A1E359811322d97991E03f863a0C30C2cF029C', 18, 'WETH9', 'Wrapped Ether'),
  [ChainId.MATIC]: new Token(ChainId.MATIC, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 18, 'WETH9', 'Wrapped Matic'),
  [ChainId.MUMBAI]: new Token(
    ChainId.MUMBAI,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WETH9',
    'Wrapped Matic'
  ),
  [ChainId.HARMONY]: new Token(
    ChainId.HARMONY,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WETH9',
    'Wrapped ONE'
  ),
  [ChainId.HARMONY_B]: new Token(
    ChainId.HARMONY_B,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WETH9',
    'Wrapped ONE'
  ),
  [ChainId.OETH]: new Token(ChainId.OETH, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', 18, 'WETH9', 'Wrapped OETH'),
  [ChainId.BSC]: new Token(ChainId.BSC, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', 18, 'WETH9', 'Wrapped BNB'),
  [ChainId.CHAPEL]: new Token(ChainId.CHAPEL, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', 18, 'WETH9', 'Wrapped BNB'),
  [ChainId.XDAI]: new Token(ChainId.XDAI, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', 18, 'WETH9', 'Wrapped XDAI')
}
