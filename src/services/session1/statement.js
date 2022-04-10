import { createStatementData } from './createStatementData'

/**
 * 請求書フォーマットの取得
 * @param {*} number
 * @return {*}
 */
function getStatementFormat(number) {
  return new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD",
      minimumFractionDigits: 2 }).format(number / 100);
}

function renderHtml (data) {
  let result = `<div><h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${getStatementFormat(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${getStatementFormat(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  result += `</div>`;
  return result;
}

/**
 * 請求書ロジックの呼び出し
 * @param {*} invoice
 * @param {*} plays
 * @return {*}
 */
function statement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays))
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