/**
 * Creates a CustomEvent with the given name and payload
 *
 * @param {string} event - Event name
 * @param {Object} payload - Event payload
 * @event
 */
export const createCustomEvent = (event, payload) => {
  return new CustomEvent(event, {
    detail: {
      payload,
    },
  })
}

export default createCustomEvent
