import React from 'react'
import styles from './recommendAuthor.less'
import Avator from '../avator'

class RecommendAuthor extends React.Component {
  author(props) {
    return (
      <li className={styles.author}>
        <Avator />
        <div className={styles.info}>
          <p className={styles.name}>
            Clancey
          </p>
          <p className={styles.description}>
            写了11M字，233喜欢
          </p>
        </div>
        <div className={styles.follow}>
          + 关注
        </div>
      </li>
    )
  }
  render() {
    return (
      <div className={styles.recommendAuthor}>
        <div className={styles.header}>
          推荐作者
        </div>
        <div className={styles.authorList}>
          <ul>
            {this.author()}
          </ul>
        </div>
        <div className={styles.footer}>
          查看全部&nbsp;
          <i className="fas fa-angle-right" />
        </div>
      </div>
    )
  }
}

export default RecommendAuthor
