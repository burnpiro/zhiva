const headerMiddleware = router => {
  router.use(function (req, res, next) {
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    res.header('Cross-Origin-Opener-Policy', 'cross-origin');
    next()
  })
}

module.exports = headerMiddleware
