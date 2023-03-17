import { defineStore } from 'pinia'

interface PiniaStoreState {
  flashMessage: string,
  event: null | Event
}
interface Event {
  title: string
  time: string
  date: string
  location: string
  description: string
}
export const usePiniaStore = defineStore('piniaStore', {
  state: (): PiniaStoreState => ({
    flashMessage: '',
    event: null
  }),
  actions: {
    updateMessage(newMessage: string) {
      this.flashMessage = newMessage
    },
    setEvent(newEvent: Event) {
      this.event = newEvent
    }
  }
})
