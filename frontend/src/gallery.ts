import axios from 'axios'

const fetchGallery = async () => {
  try {
    const response = await axios.get('http://localhost:2018/api/v1/gallery')
    if (response.status === 200) {
      const galleryImageContainer = document.querySelector('#gallery-image-container')
      const galleries = response.data.data
      let galleryHtml = ''
      for (let i = 0; i < galleries.length; i++) {
        galleryHtml += `<img src="http://localhost:2018/${galleries[i].image}" alt="${galleries[i].caption}" />`
      }

      if (galleryImageContainer) {
        galleryImageContainer.innerHTML = galleryHtml
      }
    }
  } catch (error) {}
}

const createGallery = async (event: Event) => {
  event.preventDefault()

  const captionInput = document.querySelector<HTMLInputElement>('#caption')
  const imageInput = document.querySelector<HTMLInputElement>('#image')

  if (captionInput && imageInput) {
    const formData = new FormData()
    formData.append('caption', captionInput.value)
    const image = imageInput.files
    if (image && image.length > 0) {
      formData.append('image', image ? image[0] : '')
      const response = await axios.post('http://localhost:2018/api/v1/gallery', formData)

      if (response.status === 200) {
        alert(response.data.message)
        document.querySelector('form')?.reset()
        fetchGallery()
      }
    } else {
      alert('Please select image')
    }
  }
}

const galleryForm = document.querySelector('form')
if (galleryForm) {
  galleryForm.addEventListener('submit', createGallery)
}

window.addEventListener('load', fetchGallery)
export default ''
