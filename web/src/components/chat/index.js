import React from 'react'
import styles from './chat.less'
import MessageItem from '../message-item'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
  msgs: PropTypes.object,
}
const defaultProps = {
  from: '',
  to: '',
  send: f => f,
  msgs: {},
}

@withRouter
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
    }
    this.messageListRef = null
    this.setMessageList = this.setMessageList.bind(this)
    this.messageList = this.messageList.bind(this)
    this.messageHandle = this.messageHandle.bind(this)
    this.send = this.send.bind(this)
    this.keySend = this.keySend.bind(this)
  }
  messageList() {
    const list = this.props.msgs && this.props.msgs[this.props.match.params.user]
    return list && list.map(i => {
      if (i.mode === 1) {
        return <MessageItem key={i.time} owner="mine" message={i} />
      } else {
        return <MessageItem key={i.time} owner="ohter" message={i} />
      }
    })
  }
  setMessageList(node) {
    this.messageListRef = node
  }
  messageHandle(e) {
    this.setState({
      message: e.target.value,
    })
  }
  send() {
    this.props.send(this.state.message)
    this.setState({
      message: '',
    })
  }
  keySend(e) {
    if (e.key === 'Enter') {
      this.send()
    }
  }
  render() {
    const msg = this.props.msgs && this.props.msgs[this.props.match.params.user]
    const user = msg && msg[0] && msg[0].other.name
    return (
      <div className={styles.chat}>
        <div className={styles.title}>
          与 {user} 的对话
        </div>
        <ul className={styles.message} id="chat" ref={this.setMessageList}>
          {this.messageList()}
        </ul>
        <div className={styles.write}>
          <input  onKeyPress={this.keySend} onChange={this.messageHandle} value={this.state.message} placeholder="输入内容" />
          <p>使用return发送</p>
          <button onClick={this.send}>发送</button>
        </div>
      </div>
    )
  }
}

Chat.propTypes = propTypes
Chat.defaultProps = defaultProps

export default Chat
