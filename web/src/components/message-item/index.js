import React from 'react'
import styles from './messageItem.less'

class MessageItem extends React.Component {
  constructor(props) {
    super(props)
  }
  avator() {
    if (this.props.owner === 'mine') {
      return null
    }
    return (
      <div className={styles.avator}>
        <img src="http://git.3geyue.com/avatars/45?s=290" alt="avator" />
      </div>
    )
  }
  render() {
    const mine = this.props.owner === 'mine'
    return (
      <li className={styles.messageItem}>
        {this.avator()}
        <div className={`${styles.content} ${mine ? styles.mine : styles.other}`}>
          hello
        </div>
      </li>
    )
  }
}

export default MessageItem
