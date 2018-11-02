export default function isAuthenticated() {
  let expiresAt = localStorage.getItem('expires_at')
  return new Date().getTime() < expiresAt
}