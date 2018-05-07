import React from 'react'
import styles from './authorSummary.less'

class AuthorSummary extends React.Component {
  render() {
    return (
      <div className={styles.authorSummary}>
        <p className={styles.title}>
          个人介绍
        </p>
        <p className={styles.summary}>
          afdsjgodsajfdiaojfsdlagj
        </p>
      </div>
    )
  }
}

export default AuthorSummary
