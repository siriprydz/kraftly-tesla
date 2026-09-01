export const firstName = (user) => {
  return user.trim().split(/\s+/)[0]
}
