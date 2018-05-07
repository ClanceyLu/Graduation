import React from 'react'
import styles from './footer.less'

class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.footer}>
        <div className={styles.con}>
          <p>2018 &copy; ClanceyLu</p>
        </div>
      </footer>
    )
  }
}

export default Footer
