import axios from 'axios'

const login = async (event: Event) => {
  event.preventDefault()

  const phoneInput = document.querySelector<HTMLInputElement>('#phone')
  const passwordInput = document.querySelector<HTMLInputElement>('#password')

  if (phoneInput && passwordInput) {
    const response = await axios.post('http://localhost:2018/api/v1/auth', {
      phone: phoneInput.value,
      password: passwordInput.value
    })

    if (response.status === 200) {
      location.href = '/admin/dashboard.html'
    }
  }
}

const loginForm = document.getElementsByTagName('form')[0]
console.log(loginForm)
loginForm.addEventListener('submit', login)

export default ''
