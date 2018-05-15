import React from 'react'
import styles from './userList.less'
import Avator from '../avator'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

const propTypes = {
  users: PropTypes.array.isRequired,
}
const defaultProps = {
  users: [],
}

@withRouter
class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.toProfile = this.toProfile.bind(this)
  }
  toProfile(id) {
    this.props.history.push('/profile/' + id)
  }
  author(list) {
    return list.map(i => (
      <li className={styles.author} key={i._id} onClick={() => this.toProfile(i._id)}>
        <Avator avator={i.avatar} />
        <div className={styles.info}>
          <p className={styles.name}>
            {i.name}
          </p>
          <p className={styles.description}>
            写了11M字，233喜欢
          </p>
        </div>
      </li>
    ))
  }
  render() {
    return (
      <div className={styles.userList}>
        <ul className={styles.authorList}>
          {this.author(this.props.users)}
        </ul>
      </div>
    )
  }
}

UserList.propTyps = propTypes
UserList.defaultProps = defaultProps

export default UserList
