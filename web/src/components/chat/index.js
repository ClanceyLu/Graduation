import React from 'react'
import styles from './chat.less'
import MessageItem from '../message-item'

class Chat extends React.Component {
  render() {
    return (
      <div className={styles.chat}>
        <div className={styles.title}>
          与 Clancey 的对话
        </div>
        <ul className={styles.message}>
          <MessageItem owner="mine" />
          <MessageItem owner="othoer" />
        </ul>
        <div className={styles.write}>
          <textarea placeholder="输入内容" />
          <p>使用return发送</p>
          <button>发送</button>
        </div>
      </div>
    )
  }
}

export default Chat
