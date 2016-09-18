import { BLOCK_UI, UN_BLOCK_UI } from '../constants/actions'

export function blockUi(message) {
  return {
    type: BLOCK_UI,
    message
  }
}

export function unBlockUi() {
  return {
    type: UN_BLOCK_UI
  }
}
