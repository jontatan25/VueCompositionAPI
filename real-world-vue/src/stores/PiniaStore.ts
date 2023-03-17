import { defineStore } from 'pinia'

interface PiniaStoreState {
  flashMessage: string,
  event: null | unknown
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
    setEvent(newEvent: unknown) {
      this.event = newEvent
    }
  }
})
