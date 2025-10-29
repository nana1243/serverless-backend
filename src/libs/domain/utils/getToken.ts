const getToken = (cookieHeader) => {
  // const cookieHeader = event.headers['Cookie'] || event.headers['cookie'] || '';
  const cookies = cookieHeader.split(';').map(c => c.trim().split('='));
  const refreshTokenPair = cookies.find(pair => pair[0] === 'token');
  return  refreshTokenPair ? refreshTokenPair[1] : '';
}


export default getToken;