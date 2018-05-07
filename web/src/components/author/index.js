import React from 'react'
import styles from './author.less'

class Author extends React.Component {
  render() {
    return (
      <div className={styles.author}>
        <div className={styles.avator}>
          <img src="http://git.3geyue.com/avatars/45?s=290" alt="" />
        </div>
        <div className={styles.content}>
          <p className={styles.name}>clancey</p>
          <div className={styles.info}>
            <div>
              <p>233</p>
              <a>关注&nbsp; <i className="fas fa-angle-right" /></a>
            </div>
            <div>
              <p>233</p>
              <a>关注&nbsp; <i className="fas fa-angle-right" /></a>
            </div>
            <div>
              <p>233</p>
              <a>关注&nbsp; <i className="fas fa-angle-right" /></a>
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <button>发信息</button>
          <button>关注</button>
        </div>
      </div>
    )
  }
}

export default Author
