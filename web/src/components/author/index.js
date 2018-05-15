import React from 'react'
import styles from './author.less'
import api from '../../api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

@connect(
  state => state.user
)
@withRouter
class Author extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      fansCount: 0,
      followCount: 0,
      articleCount: 0,
    }
    this.toMessage = this.toMessage.bind(this)
    this.favorite = this.favorite.bind(this)
  }
  componentDidMount() {
    const id = this.props.userId
    api.user.get(id)
      .then(res => {
        this.setState({
          user: {...res},
        })
      })
      .catch(e => {
        console.log('err', e)
      })
    api.fans.getList(id)
      .then(res => {
        this.setState({
          fansCount: res.fans.length,
        })
      })
      .catch(e => {
        console.log('err', e)
      })
    api.follow.getList(id)
      .then(res => {
        this.setState({
          followCount: res.follow.length,
        })
      })
      .catch(e => {
        console.log('err', e)
      })
    api.article.getUserList(id)
      .then(res => {
        this.setState({
          articleCount: res.length,
        })
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  toMessage() {
    this.props.history.push('/message/' + this.state.user._id)
  }
  favorite() {
    api.fans.add(this.props._id, this.state.user._id)
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log('err', e)
      })
    api.follow.add(this.state.user._id, this.props._id)
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  button() {
    return (
      <div className={styles.button}>
        <button onClick={this.toMessage}>发信息</button>
        <button onClick={this.favorite}>关注</button>
      </div>
    )
  }
  render() {
    const user = this.state.user
    const fansCount = this.state.fansCount
    const followCount = this.state.followCount
    const articleCount = this.state.articleCount
    return (
      <div className={styles.author}>
        <div className={styles.avator}>
          <img src={user.avatar} alt={user.name} />
        </div>
        <div className={styles.content}>
          <p className={styles.name}>{user.name}</p>
          <div className={styles.info}>
            <div>
              <p>{followCount}</p>
              <a>关注&nbsp; <i className="fas fa-angle-right" /></a>
            </div>
            <div>
              <p>{fansCount}</p>
              <a>粉丝&nbsp; <i className="fas fa-angle-right" /></a>
            </div>
            <div>
              <p>{articleCount}</p>
              <a>文章&nbsp; <i className="fas fa-angle-right" /></a>
            </div>
          </div>
        </div>
        {this.props._id === user._id ? null : this.button()}
      </div>
    )
  }
}

export default Author
