import React from 'react'
import PropTypes from 'prop-types'
import styles from './myTextarea.less'

const propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  change: PropTypes.func,
}
const defaultProps = {
  placeholder: '',
  value: '',
  change: f => f,
}

class MyTextarea extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(v) {
    this.props.change(v.target.value)
  }
  render() {
    return (
      <textarea onChange={this.handleChange} value={this.props.value} className={styles.textarea} placeholder={this.props.placeholder} />
    )
  }
}

MyTextarea.propTypes = propTypes
MyTextarea.defaultProps = defaultProps

export default MyTextarea
