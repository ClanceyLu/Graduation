import React from 'react'
import { Link } from 'react-router-dom'
import styles from './useroptions.less'

class UserOptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          name: '登录',
          link: '/login',
        },
        {
          name: '注册',
          link: '/register',
        },
        {
          name: '写文章',
          link: '/write',
        }
      ],
    }
  }

  options() {
    return this.state.list.map(i => (
      <li key={i.name}>
        <Link to={i.link}>{i.name}</Link>
      </li>
    ))
  }

  render() {
    return (
      <div className={styles.options}>
        <ul>
          {this.options()}
        </ul>
      </div>
    )
  }
}

export default UserOptions
