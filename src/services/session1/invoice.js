/**
 * 請求書印刷の関数
 * @param {*} invoice 請求
 * @param {*} plays 演劇のデータ
 * @return {*}
 */
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD",
      minimumFractionDigits: 2 }).format;

  const getPlayType = (perf) => {
    return plays[perf.playID].type
  }

  const amountFor = (perf) => {
    let result = 0
    switch (getPlayType(perf)) {
      case "tragedy":
        result = 40000;
        if (perf.audience > 30) {
          result += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (perf.audience > 20) {
          result += 10000 + 500 * (perf.audience - 20);
        }
        result += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${getPlayType(perf)}`);
      }
    return result
  }

  for (let perf of invoice.performances) {
    const thisAmount = amountFor(perf)
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === getPlayType(perf)) volumeCredits += Math.floor(perf.audience / 5);

    // print line for this order
    result += `  ${getPlayType(perf)}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
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