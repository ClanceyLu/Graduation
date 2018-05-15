import React from 'react'
import Cookie from 'js-cookie'
import { Link } from 'react-router-dom'
import styles from './useroptions.less'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions'
import { withRouter } from 'react-router-dom'

@connect(
  state => state.user,
  { logout }
)
@withRouter
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
      ],
    }
    this.logOut = this.logOut.bind(this)
  }

  options() {
    return this.state.list.map(i => (
      <li key={i.name}>
        <Link to={i.link}>{i.name}</Link>
      </li>
    ))
  }

  logOut() {
    localStorage.userInfo = ''
    Cookie.set('token', '')
    this.props.logout()
    this.props.history.push('/home')
  }

  user() {
    return (
      <li className={styles.user}>
        <div className={styles.avator}>
          <img src={this.props.avatar} alt="avator" />
          <div className={styles.menu}>
            <ul>
              <li>
                <Link to={`/profile/${this.props._id}`}>我的主页</Link>
              </li>
              <li>
                <Link to="/setting">设置</Link>
              </li>
              <li>
                <a onClick={this.logOut}>注销</a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    )
  }

  render() {
    const login = !!Cookie.get('token')
    return (
      <div className={styles.options}>
        <ul className={styles.nav}>
          {login ? this.user() : this.options()}
          <li key="/write">
            <Link to="/write">写文章</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default UserOptions
