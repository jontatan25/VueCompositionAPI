import { Store } from 'pinia'

export interface PiniaStoreState {
  flashMessage: string
  event: null | unknown
}

export interface PiniaStoreActions {
  updateMessage(newMessage: string): void
  setEvent(newEvent: unknown): void
}

export type PiniaStore = Store<PiniaStoreState, PiniaStoreActions>
