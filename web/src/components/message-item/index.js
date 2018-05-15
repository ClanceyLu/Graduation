import React from 'react'
import styles from './messageItem.less'

class MessageItem extends React.Component {
  constructor(props) {
    super(props)
    this.avator = this.avator.bind(this)
  }
  avator() {
    if (this.props.owner === 'mine') {
      return null
    }
    return (
      <div className={styles.avator}>
        <img src={this.props.message.other.avatar} alt="avator" />
      </div>
    )
  }
  render() {
    const mine = this.props.owner === 'mine'
    return (
      <li className={styles.messageItem}>
        {this.avator()}
        <div className={`${styles.content} ${mine ? styles.mine : styles.other}`}>
          {this.props.message.content}
        </div>
      </li>
    )
  }
}

export default MessageItem
