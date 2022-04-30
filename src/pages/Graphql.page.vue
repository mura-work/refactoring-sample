<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="books"
    />
  </div>
</template>

<script>
// import { getBooks } from '../services/FetchGraphqlService'
import gql from "graphql-tag"

const GET_MOVIES = gql`
  query getBooks {
    books {
      id
      title
      body
    }
  }
`

export default {
  name: 'graphql',
  data: () => ({
    books: [],
    headers: [
      {
        text: 'ID',
        value: 'id',
      },
      {
        text: 'タイトル',
        value: 'title',
      },
      {
        text: '内容',
        value: 'body',
      },
    ],
  }),
  apollo: {
    books: {
      query: GET_MOVIES
    }
  },
  async mounted() {
    // this.books = await getBooks()
  }
}
</script>