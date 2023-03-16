import { defineStore } from 'pinia'

export const usePiniaStore = defineStore('piniaStore', {
  state: () => ({
    flashMessage: '',
    event: null
  }),
  actions: {
    updateMessage(newMessage) {
      this.flashMessage = newMessage
    },
    setEvent(newEvent) {
      this.event = newEvent
    }
  }
})
