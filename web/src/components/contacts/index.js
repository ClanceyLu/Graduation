import React from 'react'
import styles from './contacts.less'
import PropTypes from 'prop-types'
import api from '../../api'

const propTypes = {
  contactsList: PropTypes.array,
  choose: PropTypes.func.isRequired,
}
const defaultProps = {
  contactsList: [],
  choose: f => f,
}

class Contacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
    this.contactsList = this.contactsList.bind(this)
  }
  componentDidMount() {
    this.props.contactsList.forEach(i => {
      api.user.get(i)
        .then(res => {
          this.setState({
            list: [...this.state.list, res],
          })
        })
        .catch(e => {
          console.log('err', e)
        })
    })
  }
  componentWillReceiveProps() {
    const list = []
    this.props.contactsList.forEach(i => {
      api.user.get(i)
        .then(res => {
          list.push(res)
          this.setState({
            list,
          })
        })
        .catch(e => {
          console.log('err', e)
        })
    })
  }
  contactsList() {
    return this.state.list.map(i => (
      <div onClick={e => this.props.choose(i._id)} key={i._id} className={styles.friend}>
        <div className={styles.avator}>
          <img src={i.avatar} alt="user" />
        </div>
        <div className={styles.name}>
          {i.name}
        </div>
      </div>
    ))
  }
  render() {
    return (
      <div className={styles.contacts}>
        <div className={styles.title}>
          <i className="fas fa-user-friends" />
          &nbsp;联系人
        </div>
        <div className={styles.list}>
          {this.contactsList()}
        </div>
      </div>
    )
  }
}
Contacts.propTypes = propTypes
Contacts.defaultProps = defaultProps

export default Contacts
