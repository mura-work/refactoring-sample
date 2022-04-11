<template>
  <div>
    <h1>Statement for {{invoiceData.customer}}</h1>
    <table>
      <tr>
        <th>play</th>
        <th>seats</th>
        <th>cost</th>
      </tr>
      <tr v-for="(perf, index) in invoiceData.performances" :key="index">
        <td>{{perf.play.name}}</td>
        <td>{{perf.audience}}</td>
        <td>{{getStatementFormat(perf.amount)}}</td>
      </tr>
    </table>
    <p>
      Amount owed is <em>{{getStatementFormat(invoiceData.totalAmount)}}</em>
    </p>
    <p>
      You earned <em>{{invoiceData.totalVolumeCredits}}</em> credits
    </p>
  </div>
</template>

<script>
export default {
  name: 'invoice-template',
  props: {
    invoiceData: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getStatementFormat(number) {
      return new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD",
          minimumFractionDigits: 2 }).format(number / 100)
    }
  }
}
</script>