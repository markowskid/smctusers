const jwt=require('jsonwebtoken');
const passport=require('passport');
const Strategy=require('passport-local').Strategy;

const autoCatch=require('./lib/auto-catch')

const jwtSecret=process.env.JWT_SECRET||'1qaz2wsx'
const adminPassword=process.env.ADMIN_PASSWORD||'1qaz2wsx'
const jwtOpts={algorithm: 'HS256', expiresIn: '30d'}

passport.use(adminstrategy())
const authenticate=passport.authenticate('local',{session:false})

async function login(req,res,next) {
    const token=await sign({username: req.user.username})
    res.cookie('jwt',token,{httpOnly: true})
    res.json({success: true, token: token})
}

async function sign(payload) {
    const token=await jwt.sign(payload,jwtSecret,jwtOpts)
    return token;
}

async function ensureAdmin(req,res,next) {
    const jwtString=req.headers.authorization||req.cookies.jwt
    const payload=await verify(jwtString)
    if (payload.username=='admin') return next();

    const err=new Error('Unauthorized')
    err.statusCode=401
    next(err)
}

async function verify(jwtString='') {
    jwtString=jwtString.replace(/^Bearer /i, '')

    try {
        const payload=await jwt.verify(jwtString,jwtSecret)
        return payload
    } catch (err) {
        err.statusCode=401
        throw err
    }
}