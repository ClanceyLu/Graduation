import React from 'react'
import styles from './myInput.less'
import PropTypes from 'prop-types'

const propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  change: PropTypes.func,
}
const defaultProps = {
  type: 'text',
  placeholder: '',
  value: '',
  change: f => f,
}

class MyInput extends React.Component {
  constructor(props) {
    super(props)
    this.changeHandle = this.changeHandle.bind(this)
  }
  changeHandle(e) {
    this.props.change(e.target.value)
  }
  render() {
    return (
      <input
        className={styles.input}
        type={this.props.type}
        placeholder={this.props.placeholder}
        onChange={this.changeHandle}
        value={this.props.value} />
    )
  }
}

MyInput.propTypes = propTypes
MyInput.defaultProps = defaultProps

export default MyInput
