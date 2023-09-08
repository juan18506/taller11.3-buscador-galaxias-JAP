const SEARCH_ENDPOINT = 'https://images-api.nasa.gov/search?q='

document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('inputBuscar')
  
  document.getElementById('btnBuscar').addEventListener('click', () => {
    getData(search.value)
      .then(data => addToHtml(data))
  }) 
})

function getData(query) {
  return fetch(`${SEARCH_ENDPOINT}${query}`)
    .then(res => res.json())
    .then(data => data)
}

function addToHtml(data) {
  const ul = document.getElementById('contenedor')
  const { items } = data.collection

  items.forEach(item => {
    const { title, description_508, date_created } = item.data[0]
    const { href } = item.links[0]
    const date = new Date(Date.parse(date_created))

    ul.innerHTML += `
      <li>
        <img src="${href}" alt="${description_508}">
        <h3>${title}</h3>
        <p>${description_508}</p>
        <p>${date.getDay()}/${date.getMonth()}/${date.getFullYear()}</p>
      </li>
    `
  })
}