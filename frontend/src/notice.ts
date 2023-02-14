import axios from 'axios'
type InputType = HTMLInputElement | null

const createNotice = async (event: Event) => {
  event.preventDefault()

  const titleInput = document.getElementById('title') as InputType
  const descriptionInput = document.getElementById('description') as InputType

  if (titleInput && descriptionInput) {
    const title = titleInput.value
    const description = descriptionInput.value

    if (title) {
      const body = {
        title,
        description
      }

      const response = await axios.post('http://localhost:2018/api/v1/notice', body)
      if (response.status === 200) {
        alert(response.data.message)
      }
    } else {
      alert('Please fill all input')
    }
  }
}

const noticeForm = document.getElementsByTagName('form')[0]
noticeForm.addEventListener('submit', createNotice)

export default createNotice
