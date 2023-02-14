import axios from 'axios'
import englishToBangla from './function/converter'
import { Teacher } from './main'
type InputType = HTMLInputElement | null

const createTeacher = (event: Event) => {
  event.preventDefault()

  const nameInput = document.querySelector<HTMLInputElement>('#name')
  const designationInput = document.getElementById('designation') as InputType
  const phoneInput = document.getElementById('phone') as InputType
  const pictureInput = document.getElementById('picture') as InputType

  if (nameInput && designationInput && phoneInput) {
    const name = nameInput.value
    const designation = designationInput.value
    const phone = phoneInput.value

    if (name && phone && designation) {
      const form = new FormData()
      form.append('name', name)
      form.append('designation', designation)
      form.append('phone', phone)

      if (pictureInput) {
        const files = pictureInput.files
        form.append('picture', files ? files[0] : '')
      }
      const response = axios.post('http://localhost:2018/api/v1/teacher', form)
      console.log(response)
    } else {
      alert('Please fill all input')
    }
  }
}

export const deleteTeacherById = (id: string) => {
  return async () => {
    try {
      const response = await axios.delete('http://localhost:2018/api/v1/teacher/' + id)
      if (response.status === 200) {
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const fetchTeacher = async () => {
  const teacherContainer = document.querySelector('.teacher-list-container')

  const teacherResponse = await axios.get<{ data: Teacher[] }>(
    'http://localhost:2018/api/v1/teacher'
  )

  if (teacherContainer && teacherResponse.status === 200) {
    const teachers = teacherResponse.data.data
    let teacherHtml = ''
    for (let i = 0; i < teachers.length; i++) {
      teacherHtml += `
        <div class="tr">${englishToBangla(i + 1)}</div>
        <div class="tr">${teachers[i].name}</div>
        <div class="tr">${teachers[i].designation}</div>
        <div class="tr">${englishToBangla(teachers[i].phone)}</div>
        <div class="tr flex items-center gap-x-4">
          <button class='none' onclick="deleteTeacherById('${teachers[i]._id}')">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class="w-5 h-5">
              <g>
                <path d="M15.84 22.25H8.16a3.05 3.05 0 0 1-3-2.86L4.25 5.55a.76.76 0 0 1 .2-.55.77.77 0 0 1 .55-.25h14a.75.75 0 0 1 .75.8l-.87 13.84a3.05 3.05 0 0 1-3.04 2.86zm-10-16 .77 13.05a1.55 1.55 0 0 0 1.55 1.45h7.68a1.56 1.56 0 0 0 1.55-1.45l.81-13z" fill="#000" data-original="#000000" class=""></path>
                <path d="M21 6.25H3a.75.75 0 0 1 0-1.5h18a.75.75 0 0 1 0 1.5z" fill="#000" data-original="#000000" class=""></path>
                <path d="M15 6.25H9a.76.76 0 0 1-.75-.75V3.7a2 2 0 0 1 1.95-1.95h3.6a2 2 0 0 1 1.95 2V5.5a.76.76 0 0 1-.75.75zm-5.25-1.5h4.5v-1a.45.45 0 0 0-.45-.45h-3.6a.45.45 0 0 0-.45.45zM15 18.25a.76.76 0 0 1-.75-.75v-8a.75.75 0 0 1 1.5 0v8a.76.76 0 0 1-.75.75zM9 18.25a.76.76 0 0 1-.75-.75v-8a.75.75 0 0 1 1.5 0v8a.76.76 0 0 1-.75.75zM12 18.25a.76.76 0 0 1-.75-.75v-8a.75.75 0 0 1 1.5 0v8a.76.76 0 0 1-.75.75z" fill="#000" data-original="#000000" class=""></path>
              </g>
            </svg>
          </button>

          <button class="none">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 503 503.125" style="enable-background:new 0 0 512 512" xml:space="preserve" class="w-4 h-4"><g><path d="M16.05 503.125a15.93 15.93 0 0 1-11.304-4.691 15.959 15.959 0 0 1-4.203-15.168L30.578 362.71a16.026 16.026 0 0 1 4.203-7.445L372.895 17.152c22.867-22.87 60.093-22.87 82.964 0l30.164 30.164c22.872 22.872 22.872 60.098 0 82.965L147.914 468.395a15.896 15.896 0 0 1-7.445 4.203L19.914 502.633a14.784 14.784 0 0 1-3.863.492zm44.481-128.383-22.527 90.41 90.41-22.527L463.41 107.648c10.39-10.39 10.39-27.328 0-37.718l-30.164-30.164c-10.41-10.41-27.351-10.391-37.719 0zm76.074 82.348h.215zm0 0" fill="#000000" data-original="#000000" class=""></path><path d="M422.688 187.008c-4.098 0-8.196-1.559-11.31-4.692L320.864 91.82c-6.254-6.254-6.254-16.386 0-22.636 6.25-6.25 16.383-6.25 22.633 0l90.52 90.52c6.25 6.25 6.25 16.382 0 22.632-3.16 3.113-7.254 4.672-11.329 4.672zM136.605 473.09c-4.097 0-8.19-1.559-11.304-4.695l-90.52-90.516c-6.25-6.254-6.25-16.387 0-22.637s16.383-6.25 22.637 0l90.516 90.52c6.25 6.25 6.25 16.383 0 22.633a15.956 15.956 0 0 1-11.329 4.695zm0 0" fill="#000000" data-original="#000000" class=""></path></g></svg>
          </button>
        </div>
        `
    }

    // render the output
    teacherContainer.innerHTML =
      `
      <div class="th">ক্রমিক</div>
      <div class="th">নাম</div>
      <div class="th">পদ</div>
      <div class="th">মোবাইল নং</div>
      <div class="th">অ্যাকশন</div>
    ` + teacherHtml
  }
}

const teacherForm = document.getElementsByTagName('form')[0]
teacherForm.addEventListener('submit', createTeacher)
window.addEventListener('load', fetchTeacher)
export default createTeacher
