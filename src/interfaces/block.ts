import Transaction from '../core/transaction'

export default interface IBlock {
  prev_hash: string|null
  transaction: Transaction
  timestamp: number
}

