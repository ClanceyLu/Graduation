import React from 'react'
import { Link } from 'react-router-dom'
import styles from './register.less'

class Register extends React.Component {
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
              <input type="text" placeholder="昵称" />
            </div>
            <div className={styles.mid}>
              <i className="fas fa-envelope" />
              <input type="text" placeholder="邮箱" />
            </div>
            <div className={styles.mid}>
              <i className="fas fa-key" />
              <input type="password" placeholder="密码" />
            </div>
            <div className={styles.password}>
              <i className="fas fa-key" />
              <input type="password" placeholder="确认密码" />
            </div>
          </div>
          <div className={styles.button}>
            <button>登录</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
