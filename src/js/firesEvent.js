import createCustomEvent from './createCustomEvent'

/**
 * Fires an event
 *
 * @param {string} event - Event name
 * @param {Object} payload - Event payload
 */
export const firesEvent = (event, payload, element = document) => {
  element.dispatchEvent(createCustomEvent(event, payload))
}

export default firesEvent
