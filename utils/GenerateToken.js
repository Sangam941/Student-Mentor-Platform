import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const secret = process.env.JWT_SECRET
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d'

    return jwt.sign({id: user.user_id, role: user.role}, secret, {
        expiresIn: expiresIn
    })
}

export default generateToken;

