import React from 'react'
import Comment from '../../components/comment'
import MyTextarea from '../../components/my-textarea'
import api from '../../api'
import styles from './article.less'

class Article extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      article: {},
      comment: {},
    }
    this.content = null
    this.setContentRef = this.setContentRef.bind(this)
    this.commentHandle = this.commentHandle.bind(this)
    this.send = this.send.bind(this)
    this.getArticle = this.getArticle.bind(this)
    this.toProfile = this.toProfile.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.id
    const user = JSON.parse(localStorage.userInfo) && JSON.parse(localStorage.userInfo)._id
    this.setState({
      comment: {
        ...this.state.comment,
        user,
      }
    })
    this.getArticle(id)
  }
  getArticle(id) {
    api.article.get(id)
      .then(res => {
        this.setState({
          article: res
        })
        this.content.innerHTML = res.content
        api.article.read(id)
          .catch(e => {
            console.log('err', e)
          })
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  setContentRef(node) {
    this.content = node
  }
  commentHandle(v) {
    this.setState({
      comment: {
        ...this.state.comment,
        content: v,
      }
    })
  }
  send() {
    api.article.comment(this.state.article._id, this.state.comment)
      .then(res => {
        this.setState({
          comment: {
            ...this.state.comment,
            content: '',
          }
        })
        this.getArticle(this.state.article._id)
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  toProfile() {
    console.log(this.props)
    this.props.history.push('/profile/' + this.state.article.user._id)
  }
  render() {
    const article = this.state.article
    const comment = this.state.comment
    return (
      <div className={styles.article}>
        <h1>{article.title}</h1>
        <div className={styles.author} onClick={this.toProfile}>
          <div className={styles.avator}>
            <img src={article.user && article.user.avatar} alt="avator" />
          </div>
          <div className={styles.name}>{article.user && article.user.name}</div>
        </div>
        <div className={styles.thumb}>
          <img src={article.cover} alt="avator" />
        </div>
        <div className={styles.content} ref={this.setContentRef}>
          {article.content}
        </div>
        <div className={styles.favorite}>喜欢</div>
        <hr />
        <div className={styles.comment}>
          {article.comments && article.comments.map(i => (
            <Comment key={i.created_at} comment={i} />
          ))}
        </div>
        <div className={styles.reply}>
          <MyTextarea placeholder="填写评论" value={comment.content} change={this.commentHandle} />
          <button className={styles.send} onClick={this.send}>发送</button>
        </div>
      </div>
    )
  }
}

export default Article
