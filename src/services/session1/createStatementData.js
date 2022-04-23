import { PerformanceCalculator } from '../../model/PerformanceCalculator.js'

export function createStatementData(invoice, plays) {
  const createPerformanceCalculator = (perf, play) => {
    return new PerformanceCalculator(perf, play)
  }

  const enrichPerformance = (perf) => {
    const calculator = createPerformanceCalculator(perf, playFor(perf))
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

  const result = {}
  result.customer = invoice.customer
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result)
  result.totalVolumeCredits = totalVolumeCredits(result)
  return result
}