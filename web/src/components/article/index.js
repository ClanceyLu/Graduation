import React from 'react'
import styles from './article.less'
import Avator from '../avator'

class Article extends React.Component {
  render() {
    return (
      <div className={styles.article}>
        <div className={styles.author}>
          <Avator avator="http://git.3geyue.com/avatars/45?s=290" size="small" />
          <div className={styles.username} >
            Clancey
          </div>
          <div className={styles.time}>
            04.19 12:21
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.text}>
            <h2 className={styles.title}>
              Title
            </h2>
            <p className={styles.summery}>
              summery
            </p>
          </div>
          <div className={styles.thumb}>
            <img src="http://git.3geyue.com/avatars/45?s=290" alt="" />
          </div>
        </div>
        <div className={styles.info}>
          <span className={styles.view}><i className="fas fa-eye" /> 123</span>
          <span className={styles.comment}><i className="fas fa-comment-alt" /> 321</span>
          <span className={styles.favorite}><i className="fas fa-heart" /> 231</span>
        </div>
      </div>
    )
  }
}

export default Article
