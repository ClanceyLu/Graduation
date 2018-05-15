const express = require('express')
const fs = require('fs')
const formidable = require('formidable')
const md5 = require('md5')

const helper = require('./helper')

const Router = express.Router()

Router.post('/', (req, res) => {
  const form = new formidable.IncomingForm()
  form.encodeing = 'utf-8'
  form.uploadDir = 'upload/'
  form.keepExtensions = true

  console.log('aaa')
  form.parse(req, (err, fields, files) => {
    if (err) {
      helper.errorResponse(res, err)
      return
    }
    let extName = ''
    switch (files.file.type) {
      case 'image/pjpeg':
        extName = 'jpg'
        break
      case 'image/jpeg':
        extName = 'jpg'
        break
      case 'image/png':
        extName = 'png'
        break
      case 'image/x-png':
        extName = 'png'
        break
      default:
        extName = ''
    }
    if (extName.length === 0) {
      helper.errorResponse(res, '不支持该类型文件')
    }
    const fileName = `${md5(Math.random())}.${extName}`
    const path = form.uploadDir + fileName
    fs.renameSync(files.file.path, path)
    helper.successResponse(res, path)
  })
})

module.exports = Router
