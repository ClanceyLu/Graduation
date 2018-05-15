import React from 'react'
import styles from './authorSummary.less'
import PropTypes from 'prop-types'

const propTypes = {
  summary: PropTypes.string,
}
const defaultProps = {
  summary: '',
}

class AuthorSummary extends React.Component {
  render() {
    return (
      <div className={styles.authorSummary}>
        <p className={styles.title}>
          个人介绍
        </p>
        <p className={styles.summary}>
          {this.props.summary}
        </p>
      </div>
    )
  }
}
AuthorSummary.propTypes = propTypes
AuthorSummary.defaultProps = defaultProps

export default AuthorSummary
