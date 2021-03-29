import Wallet from './core/wallet'
import Chain from './core/chain'

const satoshi = new Wallet()
const alice = new Wallet()
const bob = new Wallet()

satoshi.send(50, alice.publicKey)
alice.send(23, bob.publicKey)
bob.send(5, alice.publicKey)

console.log(JSON.stringify(Chain.instance, null, 2))
