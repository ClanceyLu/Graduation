import React from 'react'
import styles from './nav.less'
import { Link } from 'react-router-dom'

class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      navList: [
        {
          name: '首页',
          link: '/home',
        },
        {
          name: '关注',
          link: '/subscription',
        },
        {
          name: '消息',
          link: '/message',
        }
      ]
    }
  }

  menu() {
    return this.state.navList.map(i => (
      <li key={i.name}>
        <Link to={i.link}>{i.name}</Link>
      </li>
    ))
  }

  render() {
    return (
      <nav className={styles.nav}>
        <ul>
          {this.menu()}
        </ul>
      </nav>
    )
  }
}

export default Nav
