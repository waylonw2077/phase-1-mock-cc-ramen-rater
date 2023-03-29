document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/ramens/')
      .then(response => response.json())
      .then(ramenData => {
        ramenData.forEach(ramen => {
          const imgTag = document.createElement('img')
          imgTag.src = ramen.image
          imgTag.addEventListener('click', () => {
            fetch(`http://localhost:3000/ramens/${ramen.id}`)
              .then(response => response.json())
              .then(ramenDetail => {
                const detailDiv = document.querySelector('#ramen-detail')
                detailDiv.innerHTML = `
                  <h2>${ramenDetail.name}</h2>
                  <p><strong>Restaurant:</strong> ${ramenDetail.restaurant}</p>
                  <p><strong>Rating:</strong> ${ramenDetail.rating}</p>
                  <img src="${ramenDetail.image}" alt="${ramenDetail.name}">
                  <p><strong>Comment:</strong> ${ramenDetail.comment}</p>
                `
              })
          })
  
          const deleteButton = document.createElement('button')
          deleteButton.textContent = 'Delete'
          deleteButton.addEventListener('click', () => {
            fetch(`http://localhost:3000/ramens/${ramen.id}`, { method: 'DELETE' })
              .then(() => {
                imgTag.remove()
                const detailDiv = document.querySelector('#ramen-detail')
                if (detailDiv.querySelector('h2').textContent === ramen.name) {
                  detailDiv.innerHTML = ''
                }
              })
          })
  
          const ramenDiv = document.createElement('div')
          ramenDiv.appendChild(imgTag)
          ramenDiv.appendChild(deleteButton)
          document.querySelector('#ramen-menu').appendChild(ramenDiv)
        })
  
        const newRamenForm = document.querySelector('#new-ramen')
        newRamenForm.addEventListener('submit', event => {
          event.preventDefault()
  
          const formData = new FormData(event.target)
          const ramen = {
            id: ramenData.length + 1,
            name: formData.get('name'),
            restaurant: formData.get('restaurant'),
            image: formData.get('image'),
            rating: formData.get('rating'),
            comment: formData.get('comment')
          }
  
          const imgTag = document.createElement('img')
          imgTag.src = ramen.image
          imgTag.addEventListener('click', () => {
            const detailDiv = document.querySelector('#ramen-detail')
            detailDiv.innerHTML = `
              <h2>${ramen.name}</h2>
              <p><strong>Restaurant:</strong> ${ramen.restaurant}</p>
              <p><strong>Rating:</strong> ${ramen.rating}</p>
              <img src="${ramen.image}" alt="${ramen.name}">
              <p><strong>Comment:</strong> ${ramen.comment}</p>
            `
          })
  
          const deleteButton = document.createElement('button')
          deleteButton.textContent = 'Delete'
          deleteButton.addEventListener('click', () => {
            imgTag.remove()
            const detailDiv = document.querySelector('#ramen-detail')
            if (detailDiv.querySelector('h2').textContent === ramen.name) {
              detailDiv.innerHTML = ''
            }
          })
  
          const ramenDiv = document.createElement('div')
          ramenDiv.appendChild(imgTag)
          ramenDiv.appendChild(deleteButton)
          document.querySelector('#ramen-menu').appendChild(ramenDiv)
          newRamenForm.reset()
        })
      })
  })
  