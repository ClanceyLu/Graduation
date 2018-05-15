import React from 'react'
import { Link } from 'react-router-dom'
import styles from './register.less'
import formHelper from '../../components/form-helper'
import api from '../../api'

@formHelper
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }
  register() {
    const user = this.props.state
    api.user.register(user.email, user.password, user.confirmPwd, user.name)
      .then(res => {
        this.props.history.push('/login')
      })
      .catch(e => {
        console.log('err', e)
      })

  }
  render() {
    const pathname = this.props.location.pathname
    return (
      <div className={styles.register}>
        <div className={styles.box}>
          <div className={styles.title}>
            <Link to="/login" className={pathname === '/login' ? styles.active : null}>登录</Link>
            <span>·</span>
            <Link to="/register" className={pathname === '/register' ? styles.active : null}>注册</Link>
          </div>
          <div className={styles.from}>
            <div className={styles.user}>
              <i className="fas fa-user" />
              <input
                type="text"
                placeholder="昵称"
                onChange={v => this.props.handleChange('name', v.target.value)} />
            </div>
            <div className={styles.mid}>
              <i className="fas fa-envelope" />
              <input
                type="text"
                placeholder="邮箱"
                onChange={v => this.props.handleChange('email', v.target.value)} />
            </div>
            <div className={styles.mid}>
              <i className="fas fa-key" />
              <input
                type="password"
                placeholder="密码"
                onChange={v => this.props.handleChange('password', v.target.value)} />
            </div>
            <div className={styles.password}>
              <i className="fas fa-key" />
              <input
                type="password"
                placeholder="确认密码"
                onChange={v => this.props.handleChange('confirmPwd', v.target.value)} />
            </div>
          </div>
          <div className={styles.button}>
            <button onClick={this.register}>注册并登录</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
