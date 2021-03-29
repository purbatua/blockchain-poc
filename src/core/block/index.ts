import { createHash } from 'crypto'
import IBlock from '../../interfaces/block'

class Block {
  public nonce = Math.round(Math.random() * 999999999)

  constructor(public block: IBlock) {
    block.timestamp = Date.now()
  }

  get hash() {
    const str = JSON.stringify(this.block)
    const sha256 = createHash('SHA256')
    sha256.update(str).end()
    return sha256.digest('hex')
  }
}

export default Block