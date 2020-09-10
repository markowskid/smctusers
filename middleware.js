function cors(req,res,next) {
    const origin=req.headers.origin

    res.setHeader('Access-Control-Allow-origin', origin||'*')
    res.setHeader('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS.XMODIFY')
    res.setHeader('Access-Control-Allow-Credentials','true')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept')

    next()
}

function handleError(err, req, res, next) {
    console.error(err);
    if (res.headersSent) return next(err);

    const statusCode=err.statusCode||500
    const errorMessage=STATUS_CODES[statusCode]||'Internal Error'
    res.status(statusCode).json({error: errorMessage})
}