import { statement } from '../../../src/services/session1/invoice'

describe('confirm performance amount', () => {
  const plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
  }
  const invoice = {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  }

  it('test hamlet', () => {
    const amount = statement(invoice, plays)
    expect(amount).toStrictEqual(``)
  })
})