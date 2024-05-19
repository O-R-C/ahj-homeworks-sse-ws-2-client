import getElement from '@/js/getElement'
import styles from './Log.module.css'
import moment from 'moment/moment'

/**
 * Creates a log component with the given id and INFO.
 *
 * @param {Object} props - The properties for the log component.
 * @param {string} props.id - The id of the log.
 * @param {string} props.INFO - The information of the log.
 * @return {HTMLElement} The log component.
 */
export const Log = ({ id, INFO }) => {
  const log = getElement({
    tag: 'div',
    classes: styles.log,
  })

  const timeElement = getElement({
    tag: 'div',
    classes: styles.time,
    textContent: moment().format('HH:mm:ss DD.MM.YYYY'),
  })

  const idElement = getElement({
    tag: 'div',
    classes: styles.id,
    textContent: id,
  })

  const infoElement = getElement({
    tag: 'div',
    classes: styles.info,
    textContent: INFO,
  })

  log.append(timeElement, idElement, infoElement)

  return log
}

export default Log
