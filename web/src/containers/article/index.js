import React from 'react'
import styles from './article.less'

class Article extends React.Component {
  render() {
    return (
      <div className={styles.article}>
        <h1>test</h1>
        <div className={styles.author}>
          <div className={styles.avator}>
            <img src="http://git.3geyue.com/avatars/45?s=290" alt="avator" />
          </div>
          <div className={styles.name}>Clancey</div>
        </div>
        <div className={styles.thumb}>
          <img src="http://git.3geyue.com/avatars/45?s=290" alt="avator" />
        </div>
        <div className={styles.content}>
          <p>fdshaofjaewfjkoej</p>
          <p>fdshaofjaewfjkoej</p>
          <p>fdshaofjaewfjkoej</p>
          <p>fdshaofjaewfjkoej</p>
          <p>fdshaofjaewfjkoej</p>
        </div>
        <div className={styles.favorite}>喜欢</div>
      </div>
    )
  }
}

export default Article
