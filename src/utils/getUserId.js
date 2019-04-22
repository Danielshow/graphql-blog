import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth=true) => {
  const headers = request.request.headers.authorization
  if (!headers) {
    const token = headers.split(' ')[1]
    const decoded = jwt.verify(token, 'thisisasecret') 
    return decoded.userId
  }
  if (requireAuth) {
    throw new Error("Authentication Required")
  }

  return null
}

export default getUserId;
