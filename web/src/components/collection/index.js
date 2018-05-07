import React from 'react'
import PropTypes from 'prop-types'
import styles from './collection.less'

const propTypes = {
  topic: PropTypes.object.isRequired,
}

const defaultProps = {
  topic: {},
}

class Collection extends React.Component {
  render() {
    const topic = this.props.topic
    return (
      <div className={styles.collection}>
        <div className={styles.thumb}>
          <img src={topic.thumb} alt={topic.name} />
        </div>
        <div className={styles.title}>
          {topic.name}
        </div>
      </div>
    )
  }
}

Collection.propTypes = propTypes
Collection.defaultProps = defaultProps

export default Collection
