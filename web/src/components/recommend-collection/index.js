import React from 'react'
import styles from './recommendCollection.less'
import Collection from '../collection'
import api from '../../api'

class RecommendCollection extends React.Component {
  constructor() {
    super()
    this.state = {
      topics: [
        {
          name: 'test1',
          thumb: 'http://git.3geyue.com/avatars/45?s=290',
        },
        {
          name: 'test2',
          thumb: 'test2',
        },
        {
          name: 'test3',
          thumb: 'test3',
        },
        {
          name: 'test4',
          thumb: 'test4',
        },
        {
          name: 'taaaaest5',
          thumb: 'test5',
        },
        {
          name: '6',
          thumb: 'test6',
        },
        {
          name: 'test7',
          thumb: 'test7',
        },
      ]
    }
  }

  collections() {
    return this.state.topics.map(i => <Collection key={i.thumb} topic={i} />)
  }

  componentDidMount() {
    api.topic.getList()
      .then(res => {
        console.log('res', res)
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
