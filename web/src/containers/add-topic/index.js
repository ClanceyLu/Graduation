import React from 'react'
import styles from './addTopic.less'
import MyInput from '../../components/my-input'
import MyTextarea from '../../components/my-textarea'
import api from '../../api'

class AddTopic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: {
        name: '',
        summary: '',
        cover: '',
        creator: '',
      }
    }
    this.fileInput = null
    this.setFileRef = this.setFileRef.bind(this)
    this.fileChange = this.fileChange.bind(this)
    this.chooseCover = this.chooseCover.bind(this)
    this.titleChange = this.titleChange.bind(this)
    this.summaryChange = this.summaryChange.bind(this)
    this.save = this.save.bind(this)
  }
  componentDidMount() {
    const creator = JSON.parse(localStorage.userInfo) && JSON.parse(localStorage.userInfo)._id
    this.setState({
      topic: {
        ...this.state.topic,
        creator,
      }
    })
  }
  setFileRef(node) {
    this.fileInput = node
  }
  fileChange() {
    const file = this.fileInput.files[0]
    const data = new FormData()
    data.append('file', file)
    api.upload(data)
      .then(res => {
        const cover = 'http://127.0.0.1:9090/' + res
        this.setState({
          topic: {
            ...this.state.topic,
            cover,
          }
        })
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  chooseCover() {
    this.fileInput.click()
  }
  titleChange(v) {
    this.setState({
      topic: {
        ...this.state.topic,
        name: v,
      }
    })
  }
  summaryChange(v) {
    this.setState({
      topic: {
        ...this.state.topic,
        summary: v,
      }
    })
  }
  save() {
    api.topic.add(this.state.topic)
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  render() {
    const topic = this.state.topic
    return (
      <div className={styles.addTopic}>
        <div className={styles.item}>
          <div className={styles.key}>
            封面
          </div>
          <div className={styles.value}>
            <div className={styles.avator}>
              {topic.cover ? <img src={topic.cover} alt="avator" /> : null }
            </div>
            <input className={styles.file} onChange={this.fileChange} ref={this.setFileRef} type="file" />
            <button onClick={this.chooseCover}>上传封面</button>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.key}>
            名称
          </div>
          <div className={styles.value}>
            <MyInput placeholder="标题" change={this.titleChange} value={topic.name}/>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.key}>
            简介
          </div>
          <div className={styles.value}>
            <MyTextarea placeholder="简介" change={this.summaryChange} value={topic.summary}/>
          </div>
        </div>
        <div className={styles.button} onClick={this.save}>
          确认
        </div>
      </div>
    )
  }
}

export default AddTopic
