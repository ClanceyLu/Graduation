import React from 'react'
import PropTypes from 'prop-types'
import styles from './avator.less'

const propTypes = {
  avator: PropTypes.string.isRequired,
  size: PropTypes.string,
}
const defaultProps = {
  avator: 'http://git.3geyue.com/avatars/45?s=290',
  size: 'small',
}

class Avator extends React.Component {
  render() {
    const size = this.props.size === 'small' ? styles.small : styles.large
    return (
    <img className={`${styles.avator} ${size}`} src={this.props.avator} alt="avator" />
    )
  }
}

Avator.propTypes = propTypes
Avator.defaultProps = defaultProps

export default Avator
