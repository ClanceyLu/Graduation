import React from 'react'
import MyInput from '../../components/my-input'
import MyTextarea from '../../components/my-textarea'
import styles from './setting.less'
import api from '../../api'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'

@connect(
  state => state.user,
  { login }
)
class Setting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
    this.fileInput = null
    this.handleChange = this.handleChange.bind(this)
    this.setFileRef = this.setFileRef.bind(this)
    this.chooseAvator = this.chooseAvator.bind(this)
    this.fileChange = this.fileChange.bind(this)
    this.save = this.save.bind(this)
    this.introductionChange = this.introductionChange.bind(this)
  }
  componentDidMount() {
    const id = JSON.parse(localStorage.userInfo)._id
    api.user.get(id)
      .then(res => {
        this.setState({
          user: res,
        })
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  handleChange(v) {
    this.setState({
      user: {
        ...this.state.user,
        name: v,
      }
    })
  }
  introductionChange(v) {
    this.setState({
      user: {
        ...this.state.user,
        introduction: v,
      }
    })
  }
  setFileRef(node) {
    this.fileInput = node
  }
  chooseAvator() {
    this.fileInput.click()
  }
  fileChange() {
    const file = this.fileInput.files[0]
    const data = new FormData()
    data.append('file', file)
    api.upload(data)
      .then(res => {
        console.log(res)
        const avator = 'http://127.0.0.1:9090/' + res
        this.setState({
          user: {
            ...this.state.user,
            avatar: avator
          }
        })
        const data = {
          ...this.state.user,
          avatar: avator,
        }
        this.props.login(data)
        window.localStorage.userInfo = JSON.stringify(data)
        api.user.edit(data)
          .then(res => {
          })
          .catch(e => {
            console.log('err', e)
          })
      })
  }
  save() {
    api.user.edit(this.state.user)
      .then(res => {
        this.props.history.push('/profile/' + this.state.user._id)
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  render() {
    const user = this.state.user
    return (
      <div className={styles.setting}>
        <div className={styles.item}>
          <div className={styles.key}>
            昵称
          </div>
          <div className={styles.value}>
            <div className={styles.avator}>
              <img src={user.avatar} alt="avator" />
            </div>
            <input className={styles.file} onChange={this.fileChange} ref={this.setFileRef} type="file" />
            <button onClick={this.chooseAvator}>更改头像</button>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.key}>
            昵称
          </div>
          <div className={styles.value}>
            <MyInput placeholder="昵称" change={this.handleChange} value={user.name}/>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.key}>
            简介
          </div>
          <div className={styles.value}>
            <MyTextarea placeholder="介绍" change={this.introductionChange} value={user.introduction && user.introduction}/>
          </div>
        </div>
        <div className={styles.button} onClick={this.save}>
          确认
        </div>
      </div>
    )
  }
}

export default Setting
