import jwt from 'jsonwebtoken'

const getUserId = (request) => {
  const headers = request.request.headers.authorization
  if (!headers) {
    throw new Error("Authentication Required")
  }

  const token = headers.split(' ')[1]
  const decoded = jwt.verify(token, 'thisisasecret')
  
  return decoded.userId
}

export default getUserId;
