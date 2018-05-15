import React from 'react'
import { Link } from 'react-router-dom'
import RecommendCollection from '../../components/recommend-collection'
import styles from './home.less'
import Article from '../../components/article'
import RecommendAuthor from '../../components/recommend-author'
import api from '../../api'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      users: [],
    }
  }
  componentDidMount() {
    api.article.getList()
      .then(res => {
        this.setState({
          articles: res
        })
      })
      .catch(e => {
        console.log('err', e)
      })
    api.user.getList()
      .then(res => {
        this.setState({
          users: res.slice(0, 5)
        })
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.main}>
          <RecommendCollection />
          {this.state.articles.map(i => (
            <Link key={i._id} to={`/article/${i._id}`}>
              <Article article={i} />
            </Link>
          ))}
        </div>
        <div className={styles.aside}>
          <RecommendAuthor users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default Home
