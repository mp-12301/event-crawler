import axios from 'axios'
import { load } from 'cheerio'

const queries = [
  {
    url: 'https://www.auchan.pt/',
    keyword: 'GRÁTIS'
  },
  {
    url: 'https://www.auchan.pt/pt/limpeza-da-casa-e-roupa/limpeza-e-tratamento-de-roupa/detergente-maquina-roupa/detergente-liquido-e-capsulas/detergente-persil-roupa-maquina-liquido-universal-70-doses/3223452.html',
    keyword: '%'
  }
]

for (const query of queries) {
  fetchData(query.url).then((res) => {
    parseData(query.url, query.keyword, res)
  })
}

async function fetchData (url) {
  console.log('Crawling data...')
  const response = await axios(url).catch((err) => console.log(err))

  if (response.status !== 200) {
    console.log('Error occurred while fetching data')
    return
  }
  return response
}

function parseData (url, keyword, res) {
  const html = res.data
  const $ = load(html)

  const results = $(`:contains("${keyword}")`)
  const length = results.length
  const lastResult = results?.[length - 1]?.children?.[0]

  if (lastResult?.type === 'text') {
    console.log(`********** KEYWORD PRESENT - ${url} **********`)
    console.log(lastResult.data)
  } else {
    console.log('Nothing for ' + keyword + ' at ' + url)
  }
}

setInterval(() => {}, 1 << 30)
