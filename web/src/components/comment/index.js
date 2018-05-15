import React from 'react'
import styles from './comment.less'
import api from '../../api'

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
    this.reply = this.reply.bind(this)
  }
  componentDidMount() {
    api.user.get(this.props.comment.user)
      .then(res => {
        this.setState({
          user: res,
        })
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  reply(re) {
    return (
      <div className={styles.reply}>
        <span className={styles.from}>{re.user}</span>
        :
        <span className={styles.to}>this.state.user.name</span>
        <span className={styles.text}>{re.content}</span>
        <p className={styles.tool}>
          123,231
          <span className={styles.re}>
            <i className="fas fa-reply-all" />&nbsp;
            回复
          </span>
        </p>
      </div>
    )
  }
  render() {
    const comment = this.props.comment
    const user = this.state.user
    return (
      <div className={styles.comment}>
        <div className={styles.user}>
          <div className={styles.avator}>
            <img src={user.avatar} alt="avator" />
          </div>
          <div className={styles.name}>
            Clancey
          </div>
        </div>
        <div className={styles.content}>
          {comment.content}
        </div>
        <div className={styles.options}>
          <span className={styles.suport}>
            <i className="fas fa-thumbs-up" />&nbsp;
            赞
          </span>
          <span className={styles.reply}>
            <i className="fas fa-reply-all" />&nbsp;
            回复
          </span>
        </div>
        {comment.reply && comment.reply.map(i => (
          this.re(i)
        ))}
      </div>
    )
  }
}

export default Comment
