import axios from 'axios'
import englishToBangla from './function/converter'

interface Notice {
  _id: string
  title: string
  description: string
  createdAt: string
}

export interface Teacher {
  _id: string
  name: string
  designation: string
  phone: string
  picture?: string
  createdAt: string
}

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = ``

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
window.addEventListener('load', async () => {
  const noticeContainer = document.querySelector('.notice-contianer')
  const teacherContainer = document.querySelector('.teacher-container')

  // fetch teachers from database
  const teacherResponse = await axios.get<{ data: Teacher[] }>(
    'http://localhost:2018/api/v1/teacher'
  )

  if (teacherContainer && teacherResponse.status === 200) {
    const teachers = teacherResponse.data.data
    let teacherHtml = ''
    for (let i = 0; i < teachers.length; i++) {
      teacherHtml += `
        <div class="teacher-card">
          <img class="w-20 h-20 rounded-full object-center" src='http://localhost:2018/${
            teachers[i].picture
          }' alt='${teachers[i].name}' />
          <div class="flex flex-col">
            <h3 class="text-xl">${teachers[i].name}</h3>
            <p class="text-lg">${englishToBangla(teachers[i].phone)}</p>
            <p>${teachers[i].designation}</p>
          </div>
        </div>
      `
    }

    // render the output
    teacherContainer.innerHTML = teacherHtml
  }

  // featch notices form database
  const noticeResponse = await axios.get<{ data: Notice[] }>('http://localhost:2018/api/v1/notice')
  if (noticeResponse.status === 200 && noticeContainer) {
    const notices = noticeResponse.data.data
    let noticeHtml = ''
    for (let i = 0; i < notices.length; i++) {
      noticeHtml += `
        <div class="notice-card">
          <div class="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-green-800 flex items-center justify-center">
            <span class="text-lg lg:text-3xl text-white">${englishToBangla(i + 1)}</span>
          </div>

          <div>
            <h3 class="text-base lg:text-xl">${notices[i].title}</h3>
            <p>১০ ডিসেম্বর, ২০২২</p>
          </div>
        </div>
      `
    }

    // render the output
    noticeContainer.innerHTML = noticeHtml
  }
})

export default ''
