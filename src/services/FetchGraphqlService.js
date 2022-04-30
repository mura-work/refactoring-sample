const mockData = {
  "data": {
    "books": [
      {
        "id": "1",
        "title": "本 1",
        "body": "内容：面白い"
      },
      {
        "id": "2",
        "title": "本 2",
        "body": "内容：普通"
      },
      {
        "id": "3",
        "title": "本 3",
        "body": "内容：つまらない"
      }
    ]
  }
}

export async function getBooks() {
  const mock = true
  if (mock) {
    return mockData["data"]["books"]
  }
  // fetch
}