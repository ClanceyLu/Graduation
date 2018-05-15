import React from 'react'
import styles from './message.less'
import Contacts from '../../components/contacts'
import Chat from '../../components/chat'
import io from 'socket.io-client'
import api from '../../api'
import { connect } from 'react-redux'
import { msgList } from '../../redux/actions'
import _ from 'lodash'

const socket = io('ws://127.0.0.1:9090')
@connect(
  state => state.chat,
  {msgList}
)
class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msgs: {},
      to: '5adede66c459c87742b11392',
      contactsList: [],
    }
    this.sendMsg = this.sendMsg.bind(this)
    this.chooseUser = this.chooseUser.bind(this)
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.userInfo) && JSON.parse(localStorage.userInfo)._id
    this.setState({
      from: user,
    })
    socket.on('connect', () => {
      const data = {
        user,
        socketId: socket.id,
      }
      document.querySelector('#chat').scrollTo(0, document.querySelector('#chat').scrollHeight)
      socket.emit('register', data)
      socket.on('resvMsg', data => {
        const msgs = _.groupBy(data, i => i.other._id)
        const contactsList = Object.keys(msgs)
        this.setState({
          msgs,
          contactsList,
        })
        this.props.msgList(msgs)
        //this.messageListRef.scrollTo(dom.scrollLeft, 100)
        document.querySelector('#chat').scrollTo(0, document.querySelector('#chat').scrollHeight)
      })
      socket.on('err', e => {
        console.log('err', e)
      })
    })
    api.chat.getList(user)
      .then(res => {
        const msgs = _.groupBy(res, i => i.other._id)
        const contactsList = Object.keys(msgs)
        if (this.props.match.params.user === 'a') {
          this.props.history.push('/message/' + contactsList[0])
        }
        this.setState({
          msgs,
          contactsList,
          to: this.props.match.params.user,
        })
        this.props.msgList(msgs)
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  sendMsg(message) {
    const user = JSON.parse(localStorage.userInfo) && JSON.parse(localStorage.userInfo)._id
    const data = {
      message,
      from: user,
      to: this.state.to,
    }
    socket.emit('sendMsg', data)
  }
  chooseUser(id) {
    this.props.history.push('/message/' + id)
  }
  render() {
    return(
      <div className={styles.message}>
        <div className={styles.contacts}>
          <Contacts choose={this.chooseUser} contactsList={this.state.contactsList}/>
        </div>
        <div className={styles.chat}>
          <Chat send={this.sendMsg} msgs={this.state.msgs} to={this.state.to} from={this.state.from} />
        </div>
      </div>
    )
  }
}

export default Message
