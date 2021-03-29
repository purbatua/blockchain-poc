import { createHash, createVerify } from 'crypto'
import IBlock from "../../interfaces/block"
import ITransaction from "../../interfaces/transaction"
import Block from "../block"
import Transaction from "../transaction"

class Chain {
  // Singleton pattern
  public static instance = new Chain()

  chain: Block[]

  constructor() {
    const trx: ITransaction = {
      amount: 100,
      payer: 'genesis',
      payee: 'satoshi'
    }
    const block: IBlock = {
      prev_hash: null,
      transaction: new Transaction(trx),
      timestamp: new Date().getTime()
    }
    const genesis = new Block(block)
    this.chain = [genesis]
  }

  get last() {
    return this.chain[this.chain.length - 1]
  }

  /**
   * Simple proof of work
   * Find hash with 4 leading zeros
   * @param nonce arbitrary number
   * @returns {number} solution for block
   */
  mine(nonce: number): number {
    let solution = 1
    console.log('⛏️ mining...')

    while(true) {
      const md5 = createHash('MD5')
      md5.update((nonce + solution).toString()).end()
      const attempt = md5.digest('hex')

      if (attempt.substr(0,4) === '0000') {
        console.log(`Solved: ${solution}`)
        return solution
      }

      solution += 1
    }
  }

  /**
   * Add new block to chain
   * @param trx transaction class
   * @param senderPublicKey sender public key
   * @param signature private key to verify the public key
   */
  add(trx: Transaction, senderPublicKey: string, signature: Buffer) {
    const verifier = createVerify('SHA256')
    verifier.update(trx.toString)
    const isValid = verifier.verify(senderPublicKey, signature)

    if (isValid) {
      const block: IBlock = {
        prev_hash: this.last.hash,
        transaction: trx,
        timestamp: new Date().getTime()
      }
      const newBlock = new Block(block)
      this.mine(newBlock.nonce)
      this.chain.push(newBlock)
    }
  }
}

export default Chain