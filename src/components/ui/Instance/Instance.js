import getElement from '@/js/getElement'
import styles from './Instance.module.css'

export const Instance = ({ id, status }) => {
  const instance = getElement({
    tag: 'div',
    classes: styles.instance,
  })

  const idElement = getElement({
    tag: 'div',
    classes: styles.id,
    textContent: id,
  })

  const statusElement = getElement({
    tag: 'div',
    classes: [styles.status],
  })

  const actionsElement = getElement({
    tag: 'div',
    classes: styles.actions,
  })

  const controls = getElement({
    tag: 'div',
    classes: styles.controls,
  })

  const startBtn = getElement({
    tag: 'button',
    classes: styles.btnStart,
  })

  const stopBtn = getElement({
    tag: 'button',
    classes: styles.btnStop,
  })

  const removeBtn = getElement({
    tag: 'button',
    classes: styles.btnRemove,
  })

  if (isStarted(status)) {
    statusElement.classList.add(styles.running)
    startBtn.hidden = true
  } else {
    stopBtn.hidden = true
  }

  controls.append(startBtn, stopBtn, removeBtn)
  actionsElement.append(controls)

  instance.append(idElement, statusElement, actionsElement)

  return instance
}

const isStarted = (status) => status === 'started'

export default Instance
