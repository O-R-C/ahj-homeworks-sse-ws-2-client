import createCustomEvent from '../createCustomEvent'

describe('createCustomEvent', () => {
  test('creates CustomEvent with correct event name and payload', () => {
    const eventName = 'testEvent'
    const eventPayload = { data: 'test' }

    const customEvent = createCustomEvent(eventName, eventPayload)

    expect(customEvent.type).toBe(eventName)
    expect(customEvent.detail.payload).toEqual(eventPayload)
  })
})
