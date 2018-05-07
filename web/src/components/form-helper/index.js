import React from 'react'

const formHelper = (Comp) => (
  class WrapperComp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(key, val) {
      this.setState({
        [key]: val,
      })
    }

    render() {
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props} />
    }
  }
)

export default formHelper
