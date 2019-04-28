import jwt from 'jsonwebtoken'

const token = (id) => {
  return jwt.sign({userId: id}, 'thisisasecret', { expiresIn: '7 days' })
}

export default token;
