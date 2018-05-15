import React from 'react'
import api from '../../api'
import UserList from '../../components/user-list'

class Subscription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fans: [],
    }
  }
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.userInfo)
    const id = userInfo && userInfo._id
    api.follow.getList(id)
      .then(res => {
        console.log(res)
        this.setState({
          fans: res.follow,
        })
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  render() {
    return (
      <div>
        <UserList users={this.state.fans} />
      </div>
    )
  }
}

export default Subscription
