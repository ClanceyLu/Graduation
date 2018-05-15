import React from 'react'
import { Link } from 'react-router-dom'
import styles from './profile.less'
import Author from '../../components/author'
import AuthorSummary from '../../components/author-summary'
import Article from '../../components/article'
import api from '../../api'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      articles: [],
    }
    this.articleList = this.articleList.bind(this)
  }
  componentDidMount() {
    const user = this.props.match.params.user
    api.user.get(user)
      .then(res => {
        this.setState({
          user: res,
        })
      })
      .catch(e => {
        console.log('err', e)
      })
    api.article.getUserList(user)
      .then(res => {
        this.setState({
          articles: res,
        })
      })
      .catch(e => {
        console.log('err', e)
      })
  }
  articleList() {
    return (
      this.state.articles.map(i => (
        <Link key={i.title} to={`/article/${i._id}`}>
          <Article article={i} />
        </Link>
      ))
    )
  }
  render() {
    const id = this.props.match.params.user
    return (
      <div className={styles.profile}>
        <div className={styles.main}>
          <Author userId={id} />
          <hr />
          {this.articleList()}
        </div>
        <div className={styles.slide}>
          <AuthorSummary summary={this.state.user.introduction} />
        </div>
      </div>
    )
  }
}

export default Profile
