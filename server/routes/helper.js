module.exports = {
  response(res, code, msg, data) {
    return res.json({
      code,
      msg,
      data,
    })
  },
  successResponse(res, data) {
    const code = 0
    const msg = 'suc'
    return this.response(res, code, msg, data)
  },
  errorResponse(res, msg) {
    const code = 1
    const data = ''
    return this.response(res, code, msg, data)
  },
  paramsError(res) {
    this.errorResponse(res, '参数错误')
  },
}
