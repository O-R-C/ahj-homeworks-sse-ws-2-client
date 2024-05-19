import getElement from '@/js/getElement'
import styles from './Widget.module.css'

/**
 * Creates a widget component with a header and body.
 *
 * @param {string} headerText - The text to be displayed in the widget header.
 * @return {HTMLElement} The widget component.
 */
export const Widget = (headerText) => {
  const widget = getElement({
    tag: 'div',
    classes: styles.widget,
  })

  const widgetHeader = getElement({
    tag: 'h3',
    classes: styles.widgetHeader,
    textContent: headerText,
  })

  const widgetBody = getElement({
    tag: 'div',
    classes: styles.widgetBody,
  })

  widget.append(widgetHeader, widgetBody)

  return widget
}

export default Widget
