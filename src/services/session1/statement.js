import { createStatementData } from './createStatementData'

/**
 * 請求書ロジックの呼び出し
 * @param {*} invoice
 * @param {*} plays
 * @return {*}
 */
function statement(invoice, plays) {
  return createStatementData(invoice, plays)
}

/**
 * 請求書の発行
 * @export
 * @param {*} invoices 請求情報
 * @param {*} plays 演劇のデータ
 * @return {*} string
 */
export function getInvoice(invoices, plays) {
  const result = invoices.reduce((_, item) => {
    return statement(item, plays)
  }, '')
  return result
}