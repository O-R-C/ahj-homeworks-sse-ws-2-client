import firesEvent from '@/js/firesEvent'

/**
 * Server API class for interacting with the server via WebSocket
 *
 * @class
 */
export default class ServerApi {
  #ws
  #url

  /**
   * Constructor
   *
   * @param {string} url - WebSocket URL
   */
  constructor(url) {
    this.#url = url
  }

  /**
   * Initializes the WebSocket and sets up event listeners
   *
   * @return {void} No return value.
   */
  init() {
    this.#createWS()
    this.#addListeners()
  }

  /**
   * Creates the WebSocket object
   *
   * @private
   */
  #createWS() {
    this.#ws = new WebSocket(this.#url)
  }

  /**
   * Sets up event listeners for the WebSocket object
   *
   * @private
   */
  #addListeners() {
    this.#ws.addEventListener('open', this.#onOpen)
    this.#ws.addEventListener('close', this.#onClose)
    this.#ws.addEventListener('message', this.#onMessage)
  }

  /**
   * Handles the 'open' event of the WebSocket object
   *
   * @private
   */
  #onOpen = () => {
    firesEvent('connected', '')
  }

  /**
   * Handles the 'close' event of the WebSocket object
   *
   * @param {Event} event - The WebSocket 'close' event
   * @private
   */
  #onClose = () => {
    firesEvent('disconnected', '')
  }

  /**
   * Handles the 'message' event of the WebSocket object
   *
   * @param {MessageEvent} event - The WebSocket 'message' event
   * @private
   */
  #onMessage = ({ data }) => {
    const { event, payload } = JSON.parse(data)

    this.#eventHandlers[event] && this.#eventHandlers[event](payload)
    !this.#eventHandlers[event] && console.log('Unknown event:', event)
  }

  /**
   * Event handlers
   *
   * @private
   */
  #eventHandlers = {
    UsersList: (usersList) => this.#handleUsersList(usersList),
    Chat: (chat) => this.#handleChat(chat),
    Message: (message) => this.#handleMessage(message),
  }

  /**
   * Handles the 'UsersList' event
   *
   * @param {Array<string>} usersList - List of users
   * @private
   * @fires 'loadedUserList'
   */
  #handleUsersList = (usersList) => {
    firesEvent('loadedUserList', usersList)
  }

  /**
   * Handles the 'Chat' event
   *
   * @param {Object} chat - Chat message
   * @private
   * @fires 'loadedChat'
   */
  #handleChat = (chat) => {
    firesEvent('loadedChat', chat)
  }

  /**
   * Handles the 'Message' event
   *
   * @param {Object} message - Message
   * @private
   * @fires 'loadedMessage'
   */
  #handleMessage = (message) => {
    firesEvent('loadedMessage', message)
  }

  /**
   * Sends a message to the server
   *
   * @param {string} event - Event name
   * @param {Object} payload - Event payload
   * @private
   */
  send = (event, payload) => {
    this.#ws.send(JSON.stringify({ event, payload }))
  }
}
