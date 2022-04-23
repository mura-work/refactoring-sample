export function createStatementData(invoice, plays) {
  const enrichPerformance = (perf) => {
    const calculator = new PerformanceCalculator(perf, playFor(perf))
    const result = Object.assign({}, perf)
    result.play = calculator.play
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits
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

  class PerformanceCalculator {
    constructor(perf, play) {
      this.performance = perf
      this.play = play
    }

    /**
     * type別の金額計算
     * @param {*} perf
     * @return {*}
     */
    get amount() {
      let result = 0
      switch (this.play.type) {
        case "tragedy":
          result = 40000;
          if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
          }
          break;
        case "comedy":
          result = 30000;
          if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
          }
          result += 300 * this.performance.audience;
          break;
        default:
          throw new Error(`unknown type: ${this.play.name}`);
        }
      return result
    }

    /**
     * ボリューム特典ポイントの集計
     * @param {*} perf
     * @return {*}
     */
    get volumeCreditsFor() {
      let result = 0;
      result += Math.max(this.performance.audience - 30, 0);
      if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
      return result
    }
  }

  const result = {}
  result.customer = invoice.customer
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result)
  result.totalVolumeCredits = totalVolumeCredits(result)
  return result
}