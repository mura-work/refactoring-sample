import { amountFor } from '../../../src/services/session1/invoice'

describe('confirm performance amount', () => {
  const play = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
  }
  const perf = {
    "playID": "hamlet",
    "audience": 55
  }
  it('test hamlet', () => {
    const amount = amountFor(play[perf.playID], perf)
    expect(amount).toStrictEqual(65000)
  })
})