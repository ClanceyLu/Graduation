import React from 'react'
import styles from './profile.less'
import Author from '../../components/author'
import AuthorSummary from '../../components/author-summary'
import Article from '../../components/article'

class Profile extends React.Component {
  render() {
    return (
      <div className={styles.profile}>
        <div className={styles.main}>
          <Author />
          <hr />
          <Article />
        </div>
        <div className={styles.slide}>
          <AuthorSummary />
        </div>
      </div>
    )
  }
}

export default Profile
