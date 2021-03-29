import { generateKeyPairSync, createSign } from 'crypto'
import ITransaction from '../../interfaces/transaction'
import Transaction from '../transaction'
import Chain from '../chain'

class Wallet {
  public publicKey: string
  public privateKey: string

  constructor() {
    const rsa = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    })

    this.publicKey = rsa.publicKey
    this.privateKey = rsa.privateKey
  }

  send(amount: number, payeePublicKey: string) {
    const trx: ITransaction = {
      amount: amount,
      payer: this.publicKey,
      payee: payeePublicKey
    }

    const transaction = new Transaction(trx)
    const sha256 = createSign('SHA256')
    sha256.update(transaction.toString).end()
    const signature = sha256.sign(this.privateKey)

    Chain.instance.add(transaction, this.publicKey, signature)
  }
}

export default Wallet