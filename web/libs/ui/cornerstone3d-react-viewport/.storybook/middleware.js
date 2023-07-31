const headerMiddleware = router => {
  router.use(function (req, res, next) {
    // res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    // res.header('Cross-Origin-Opener-Policy', 'same-site');
    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    console.log(res.getHeaders())
    next()
  })
}

module.exports = headerMiddleware
