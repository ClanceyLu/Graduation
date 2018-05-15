import React from 'react'
import styles from './article.less'
import Avator from '../avator'
import PropTypes from 'prop-types'

const propTypes = {
  article: PropTypes.object.isRequired,
}
const defaultProps = {
  article: {
    user: {},
    comments: [],
  },
}

class Article extends React.Component {
  render() {
    const article = this.props.article || null
    return (
      <div className={styles.article}>
        <div className={styles.author}>
          <Avator avator={article.user && article.user.avatar} size="small" />
          <div className={styles.username} >
            {article.user && article.user.name}
          </div>
          <div className={styles.time}>
            {article.created_at}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.text}>
            <h2 className={styles.title}>
              {article.title}
            </h2>
            <p className={styles.summery}>
              {article.summary}
            </p>
          </div>
          <div className={styles.thumb}>
            <img src={article.cover} alt="cover" />
          </div>
        </div>
        <div className={styles.info}>
          <span className={styles.view}><i className="fas fa-eye" /> {article.read_count}</span>
          <span className={styles.comment}><i className="fas fa-comment-alt" /> {article.comments.length}</span>
          <span className={styles.favorite}><i className="fas fa-heart" /> {article.favorite_count}</span>
        </div>
      </div>
    )
  }
}
Article.propTypes = propTypes
Article.defaultProps = defaultProps

export default Article
