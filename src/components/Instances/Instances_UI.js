import BaseUI from '@/js/Classes/BaseUI'
import Widget from '../ui/Widget/Widget'
import getElement from '@/js/getElement'
import styles from './Instances.module.css'
import Instance from '../ui/Instance/Instance'

/**
 * Instances UI class - represents a instances component.
 *
 * @extends {BaseUI}
 * @class
 */
export default class Instances_UI extends BaseUI {
  /**
   * The element containing all instances.
   *
   * @type {HTMLElement}
   * @private
   */
  #instances

  #btnAddInstance

  /**
   * Creates an instance of Instances_UI class.
   *
   * @param {HTMLElement|string} element - Element to render the component in.
   */
  constructor(element) {
    super(element)

    this.#init()
  }

  /**
   * Initializes the component.
   * @private
   */
  #init() {
    this.#addElements()
  }

  /**
   * Adds all necessary elements to the component.
   * @private
   */
  #addElements() {
    this.#instances = this.app.querySelector(`div[class^="widget-body"]`)
    this.#btnAddInstance = this.app.querySelector(`button[class^="btn-add"]`)
  }

  /**
   * Creates the app element.
   *
   * @returns {HTMLElement} The app element.
   */
  createApp() {
    const app = Widget('Instances')
    app.classList.add(styles.instances)

    this.btnAddInstance = getElement({
      tag: 'button',
      classes: styles.btnAddInstance,
      textContent: 'Create new instance',
    })

    app.append(this.btnAddInstance)

    return app
  }

  /**
   * Adds a new instance to the component.
   *
   * @param {Object} instance - The instance object to add.
   */
  addInstance(instance) {
    const newInstance = Instance(instance)
    this.#instances.append(newInstance)
    newInstance.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  /**
   * Clears all instances from the component.
   * @private
   */
  #clearInstances() {
    this.#instances.innerHTML = ''
  }

  /**
   * Renders all instances in the component.
   *
   * @param {Object[]} instances - The instances to render.
   */
  renderInstances(instances) {
    this.#clearInstances()
    this.hideProcessing()

    instances.forEach((instance) => {
      this.addInstance(instance)
    })
  }

  /**
   * Toggles the status of an instance and updates its element.
   *
   * @param {Object} instance - The instance object to toggle the status of.
   * @return {void} This function does not return anything.
   */
  toggleStatusInstance(instance) {
    const instanceElement = this.#findInstance(instance.id)
    const instanceWithNewStatus = Instance(instance)
    this.#replaceInstances(instanceElement, instanceWithNewStatus)
  }

  /**
   * Removes an instance from the component.
   *
   * @param {Object} instance - The instance object to remove.
   * @return {void} This function does not return anything.
   */
  removeInstance(instance) {
    const instanceElement = this.#findInstance(instance.id)
    instanceElement.remove()
  }

  /**
   * Finds an instance in the component by its id.
   * @param {string} id - The id of the instance to find.
   * @returns {HTMLElement} - The instance element.
   * @private
   */
  #findInstance(id) {
    return this.#instances.querySelector(`[data-id="${id}"]`)
  }

  /**
   * Replaces an instance in the component with a new instance.
   * @param {HTMLElement} instance - The instance element to replace.
   * @param {HTMLElement} newInstance - The new instance element.
   * @private
   */
  #replaceInstances(instance, newInstance) {
    instance.replaceWith(newInstance)
  }

  /**
   * Shows the processing indicator.
   * @param {string} id - The id of the instance to show the processing indicator for.
   */
  showProcessing(id = '') {
    const element = id ? this.#findInstance(id) : this.#btnAddInstance
    element.classList.add(styles.processing)
  }

  /**
   * Hides the processing indicator.
   * @param {string} id - The id of the instance to hide the processing indicator for.
   */
  hideProcessing(id = '') {
    const element = id ? this.#findInstance(id) : this.#btnAddInstance
    element.classList.remove(styles.processing)
  }
}
