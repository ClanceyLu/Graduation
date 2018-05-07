import React from 'react'
import ReactQuill from 'react-quill'
import styles from './write.less'

class Write extends React.Component {
  render() {
    return (
      <div className={styles.write}>
        <div className={styles.title}>
          标题
          <input />
        </div>
        <div className={styles.summary}>
          简介
          <textarea />
        </div>
        <div className={styles.thumb}>
          封面
          <input type="file" />
        </div>
        <ReactQuill />
      </div>
    )
  }
}

export default Write

const A = (a) => (b) => (a + b)
console.log(A(1)(2))
