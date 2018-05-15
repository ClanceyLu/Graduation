import React from 'react'
import ReactQuill from 'react-quill'
import styles from './write.less'
import MyInput from '../../components/my-input'
import MyTextarea from '../../components/my-textarea'
import api from '../../api'

class Write extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {
        user: '',
        summary: '',
        cover: '',
        title: '',
      }
    }
    this.fileInput = null
    this.setFileRef = this.setFileRef.bind(this)
    this.chooseCover = this.chooseCover.bind(this)
    this.submit = this.submit.bind(this)
    this.titleChange = this.titleChange.bind(this)
    this.summaryChange = this.summaryChange.bind(this)
    this.fileChange = this.fileChange.bind(this)
    this.contentChange = this.contentChange.bind(this)
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.userInfo) && JSON.parse(localStorage.userInfo)._id
    this.setState({
      article: {
        ...this.state.article,
        user,
      }
    })
  }
  setFileRef(node) {
    this.fileInput = node
  }
  chooseCover() {
    this.fileInput.click()
  }
  fileChange() {
    const file = this.fileInput.files[0]
    const data = new FormData()
    data.append('file', file)
    api.upload(data)
      .then(res => {
        const cover = 'http://127.0.0.1:9090/' + res
        this.setState({
          article: {
            ...this.state.article,
            cover,
          }
        })
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  titleChange(v) {
    this.setState({
      article: {
        ...this.state.article,
        title: v,
      }
    })
  }
  summaryChange(v) {
    this.setState({
      article: {
        ...this.state.article,
        summary: v,
      }
    })
  }
  contentChange(v) {
    this.setState({
      article: {
        ...this.state.article,
        content: v,
      }
    })
  }
  submit() {
    api.article.add(this.state.article)
      .then(res => {
        this.props.history.push('/home')
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  render() {
    const article = this.state.article
    return (
      <div className={styles.write}>
        <div className={styles.item}>
          <p>标题</p>
          <MyInput type="text" placeholder="标题" value={article.title} change={this.titleChange} />
        </div>
        <div className={styles.item}>
          <p>简介</p>
          <MyTextarea placeholder="简介" value={article.summary} change={this.summaryChange} />
        </div>
        <div className={styles.item}>
          <p>封面</p>
          <div className={styles.cover}>
            {article.cover ? <img src={article.cover} alt="cover" /> : null}
            <input type="file" onChange={this.fileChange} ref={this.setFileRef} />
          </div>
          <div className={styles.button} onClick={this.chooseCover}>
            上传封面
          </div>
        </div>
        <ReactQuill onChange={this.contentChange} />
        <div className={styles.button} onClick={this.submit}>
          发表文章
        </div>
      </div>
    )
  }
}

export default Write
