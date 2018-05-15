import React from 'react'
import styles from './recommendCollection.less'
import Collection from '../collection'
import api from '../../api'

class RecommendCollection extends React.Component {
  constructor() {
    super()
    this.state = {
      topics: [],
    }
  }

  collections() {
    return this.state.topics.map(i => <Collection key={i._id} topic={i} />)
  }

  componentDidMount() {
    api.topic.getList()
      .then(res => {
        if (res.lenght > 7) {
          res = res.splie(6)
        }
        this.setState({
          topics: res,
        })
      })
  }

  render() {
    return (
      <div className={styles.recommendCollection}>
        {this.collections()}
        <div className={styles.more}>
          更多专题&nbsp;
          <i className="fas fa-angle-right" />
        </div>
      </div>
    )
  }
}

export default RecommendCollection
