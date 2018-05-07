import React from 'react'
import styles from './contacts.less'

class Contacts extends React.Component {
  render() {
    return (
      <div className={styles.contacts}>
        <div className={styles.title}>
          <i className="fas fa-user-friends" />
          &nbsp;联系人
        </div>
        <div className={styles.list}>
          <div className={styles.friend}>
            <div className={styles.avator}>
              <img src="http://git.3geyue.com/avatars/45?s=290" alt="user" />
            </div>
            <div className={styles.name}>
              Clancey
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Contacts
