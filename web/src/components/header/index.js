import React from 'react'
import styles from './header.less'
import Logo from '../logo'
import Nav from '../nav'
import UserOptions from '../useroptions'

class Header extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.container}>
          <Logo />
          <Nav />
          <UserOptions />
        </div>
      </div>
    )
  }
}

export default Header
