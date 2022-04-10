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

export function statement(invoice, plays) {
  const enrichPerformance = (perf) => {
    const result = Object.assign({}, perf)
    result.play = playFor(result)
    result.amount = amountFor(result)
    result.volumeCredits = volumeCreditsFor(result)
    return result
  }

  /**
   * type別の金額計算
   * @param {*} perf
   * @return {*}
   */
  const amountFor = (perf) => {
    let result = 0
    switch (perf.play.type) {
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
        throw new Error(`unknown type: ${perf.play.name}`);
      }
    return result
  }

  /**
   * ボリューム特典ポイントの集計
   * @param {*} perf
   * @return {*}
   */
  const volumeCreditsFor = (perf) => {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if ("comedy" === perf.play.type) result += Math.floor(perf.audience / 5);
    return result
  }

  /**
   * ボリューム特典ポイント集計のループを切り出す
   * @return {*}
   */
  const totalVolumeCredits = (data) => {
    let volumeCredits = 0;
    for (let perf of data.performances) {
      volumeCredits += perf.volumeCredits
    }
    return volumeCredits
  }

  /**
   * 合計金額集計のループを切り出す
   * @return {*}
   */
  const totalAmount = (data) => {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }
    return result
  }

  /**
   * 劇タイプの取得
   * @param {*} perf
   * @return {*}
   */
  const playFor = (perf) => {
    return plays[perf.playID]
  }

  const createStatementData = (invoice) => {
    const statementData = {}
    statementData.customer = invoice.customer
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData)
    statementData.totalVolumeCredits = totalVolumeCredits(statementData)
    console.log(statementData)
    return statementData
  }

  return renderPlainText(createStatementData(invoice))
}

/**
 * 請求書印刷の関数
 * @param {*} invoice 請求
 * @param {*} plays 演劇のデータ
 * @return {*}
 */
function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let perf of data.performances) {
    console.log()
    result += `  ${perf.play.name}: ${getStatementFormat(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${getStatementFormat(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
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