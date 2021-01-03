export const getAccessTokenRefreshTimer = (expires) => {
  // NOTE: multiplying by 1000 b/c "expires" is a UNIX timestamp
  // NOTE: refreshing the token 2 min before it expires ( - 120000)
  return ((expires * 1000) - Date.now()) - 120000
}
