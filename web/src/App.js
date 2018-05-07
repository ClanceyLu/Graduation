import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom'
import styles from './App.less'
import Header from './components/header'
import Footer from './components/footer'
import Home from './containers/home'
import Login from './containers/login'
import Register from './containers/register'
import Article from './containers/article'
import Message from './containers/message'
import MoreTopic from './containers/more-topic'
import Profile from './containers/profile'
import Topic from './containers/topic'
import Write from './containers/write'
import Subscription from './containers/subscription'

@withRouter
class App extends Component {
  render() {
    const pathname = this.props.location.pathname
    return (
      <div className={styles.body}>
        {pathname === '/login' || pathname === '/register' ? null : <Header />}
        <div className={styles.container}>
          <Switch>
            {this.props.location.pathname === '/' ? <Redirect to="/home" /> : null}
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/article" component={Article} />
            <Route path="/message" component={Message} />
            <Route path="/topics" component={MoreTopic} />
            <Route path="/topic" component={Topic} />
            <Route path="/profile" component={Profile} />
            <Route path="/write" component={Write} />
            <Route path="/subscription" component={Subscription} />
          </Switch>
        </div>
        {pathname === '/login' || pathname === '/register' || pathname === '/message' ? null : <Footer />}
      </div>
    );
  }
}

export default App;
