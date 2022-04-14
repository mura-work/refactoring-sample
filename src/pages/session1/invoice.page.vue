<template>
  <div class="invoice-content" id="invoice-template">
    <invoice-template :invoiceData="invoice" />
  </div>
</template>

<script>
import { getInvoice } from '../../services/session1/statement'
import InvoiceTemplate from '../../components/invoice-template.vue'

export default {
  components: { InvoiceTemplate },
  name: 'invoice-page',
  template: {
    InvoiceTemplate,
  },
  data: () => ({
    plays: {
      "hamlet": {"name": "Hamlet", "type": "tragedy"},
      "as-like": {"name": "As You Like It", "type": "comedy"},
      "othello": {"name": "Othello", "type": "tragedy"}
    },
    invoices: [
      {
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
    ],
    invoice: {},
  }),
  methods: {
    displayInvoice() {
      this.invoice = getInvoice(this.invoices, this.plays)
    },
  },
  mounted() {
    this.displayInvoice()
  }
}
</script>

<style lang="scss" scoped>
.invoice-content {
  width: 100%;
  // white-space: pre;
}
</style>