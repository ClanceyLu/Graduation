import React from 'react'
import styles from './recommendAuthor.less'
import Avator from '../avator'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import api from '../../api'

const propTypes = {
  users: PropTypes.array.isRequired,
}
const defaultProps = {
  users: [],
}

@connect(
  state => state.user
)
@withRouter
class RecommendAuthor extends React.Component {
  constructor(props) {
    super(props)
    this.toProfile = this.toProfile.bind(this)
  }
  toProfile(id) {
    this.props.history.push('/profile/' + id)
  }
  favorite(id) {
    api.fans.add(this.props._id, id)
      .catch(e => {
        console.log('err', e)
      })
    api.follow.add(id, this.props._id)
      .catch(e => {
        console.log('err', e)
      })
  }
  author(list) {
    return list.map(i => (
      <li className={styles.author} key={i._id}>
        <Avator avator={i.avatar} onClick={() => this.toProfile(i._id)}/>
        <div className={styles.info} onClick={() => this.toProfile(i._id)}>
          <p className={styles.name}>
            {i.name}
          </p>
          <p className={styles.description}>
            写了11M字，233喜欢
          </p>
        </div>
        <div className={styles.follow} onClick={() => this.favorite(i._id)}>
          + 关注
        </div>
      </li>
    ))
  }
  render() {
    return (
      <div className={styles.recommendAuthor}>
        <div className={styles.header}>
          推荐作者
        </div>
        <div className={styles.authorList}>
          <ul>
            {this.author(this.props.users)}
          </ul>
        </div>
        <div className={styles.footer}>
          查看全部&nbsp;
          <i className="fas fa-angle-right" />
        </div>
      </div>
    )
  }
}

RecommendAuthor.propTypes = propTypes
RecommendAuthor.defaultProps = defaultProps

export default RecommendAuthor
