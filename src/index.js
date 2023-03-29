// write your code here
const ramenMenu = document.querySelector('#ramen-menu')
fetch('http:localhost:3000/ramens')
.then(response => response.json)
.then((data=> {
data.forEach(ramen => {
    const img = document.createElement('img')
})
}))