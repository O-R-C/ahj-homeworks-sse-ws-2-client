import firesEvent from '../firesEvent'
import createCustomEvent from '../createCustomEvent'

describe('firesEvent', () => {
  test('fires event with correct name and payload', () => {
    const eventName = 'testEvent'
    const eventPayload = { data: 'test' }
    const element = document.createElement('div')

    const dispatchSpy = jest.spyOn(element, 'dispatchEvent')

    firesEvent(eventName, eventPayload, element)

    expect(dispatchSpy).toHaveBeenCalledWith(createCustomEvent(eventName, eventPayload))
  })

  test('event is dispatched on the provided element', () => {
    const eventName = 'testEvent'
    const eventPayload = { data: 'test' }
    const element = document.createElement('div')

    const dispatchSpy = jest.spyOn(element, 'dispatchEvent')

    firesEvent(eventName, eventPayload, element)

    expect(dispatchSpy).toHaveBeenCalled()
  })

  test('default element is document when no element is provided', () => {
    const eventName = 'testEvent'
    const eventPayload = { data: 'test' }

    const dispatchSpy = jest.spyOn(document, 'dispatchEvent')

    firesEvent(eventName, eventPayload)

    expect(dispatchSpy).toHaveBeenCalled()
  })
})
