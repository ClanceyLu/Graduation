import React from 'react'
import { Link } from 'react-router-dom'
import styles from './login.less'
import formHelper from '../../components/form-helper'
import api from '../../api'
import Cookie from 'js-cookie'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'

@connect(
  state => state.user,
  { login }
)
@formHelper
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }
  componentDidMount() {
  }
  login() {
    console.log('login', this.props.state)
    api.user.login(this.props.state.email, this.props.state.password)
      .then(res => {
        Cookie.set('token', res.token)
        this.props.history.push('/home')
        this.props.login(res.user)
      })
  }
  render() {
    const pathname = this.props.location.pathname
    return (
      <div className={styles.login}>
        <div className={styles.box}>
          <div className={styles.title}>
            <Link to="/login" className={pathname === '/login' ? styles.active : null}>登录</Link>
            <span>·</span>
            <Link to="/register" className={pathname === '/register' ? styles.active : null}>注册</Link>
          </div>
          <div className={styles.from}>
            <div className={styles.user}>
              <i className="fas fa-user" />
              <input type="text" onChange={v => this.props.handleChange('email', v.target.value)} placeholder="邮箱" />
            </div>
            <div className={styles.password}>
              <i className="fas fa-key" />
              <input type="password" onChange={v => this.props.handleChange('password', v.target.value)} placeholder="密码" />
            </div>
          </div>
          <div className={styles.helper}>
            <Link to="">忘记密码</Link>
          </div>
          <div className={styles.button}>
            <button onClick={this.login}>登录</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
