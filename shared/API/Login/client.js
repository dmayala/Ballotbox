export default {
  async login(userinfo) {
    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify(userinfo)
      });

      let jwt = await res.json();
      return jwt;
    } catch (err) {
      throw new error(err);
    }
  } 
}
