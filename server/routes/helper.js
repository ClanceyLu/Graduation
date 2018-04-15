module.exports = {
  response(res, code, msg, data) {
    return res.json({
      code,
      msg,
      data,
    })
  },
  successResponse(res, data) {
    return response(res, code = 0, msg = 'suc', data)
  },
  errorResponse(res, msg) {
    return response(res, code = 1, msg, data = '')
  }
}
