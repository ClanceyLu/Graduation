import React from 'react'
import styles from './logo.less'
import logo from './logo.png'

const Logo = () => (
  <div className={ styles.logo }>
    <h1>Clancey's blog</h1>
    <img src={ logo } alt="ClanceyLu" />
  </div>
)

export default Logo
