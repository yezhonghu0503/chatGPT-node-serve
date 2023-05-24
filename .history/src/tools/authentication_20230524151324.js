import jwt from 'jsonwebtoken'
// 鉴权中间件，用于验证 token 是否有效
export function verifyToken(req, res, next) {
    const token = req.headers.authorization
    if (!token) {
        // 如果没有 token，返回 401 错误
        return res.status(401).send('Access denied. No token provided.')
    }
    if (req.path === '/api/login') {
        // 如果是登录接口，直接放行
        next();
    }

    try {
        // 验证 token 是否有效
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded
        next()
    } catch (ex) {
        // 如果 token 无效，返回 400 错误
        res.status(400).send('Invalid token.')
    }
}