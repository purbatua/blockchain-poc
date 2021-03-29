import ITransaction from '../../interfaces/transaction'

class Transaction {
  constructor(public trx: ITransaction) { }

  get toString(): string {
    return JSON.stringify(this.trx)
  }
}

export default Transaction