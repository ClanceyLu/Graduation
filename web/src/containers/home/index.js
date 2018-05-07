import React from 'react'
import RecommendCollection from '../../components/recommend-collection'
import styles from './home.less'
import Article from '../../components/article'
import RecommendAuthor from '../../components/recommend-author'

class Home extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.main}>
          <RecommendCollection />
          <Article />
        </div>
        <div className={styles.aside}>
          <RecommendAuthor />
        </div>
      </div>
    )
  }
}

export default Home
