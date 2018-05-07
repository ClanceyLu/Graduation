import React from 'react'
import styles from './message.less'
import Contacts from '../../components/contacts'
import Chat from '../../components/chat'

class Message extends React.Component {
  render() {
    return(
      <div className={styles.message}>
        <div className={styles.contacts}>
          <Contacts />
        </div>
        <div className={styles.chat}>
          <Chat />
        </div>
      </div>
    )
  }
}

export default Message
