import axios from 'axios'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
}

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/jontatan25/VueCompositionAPI',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  }
}
