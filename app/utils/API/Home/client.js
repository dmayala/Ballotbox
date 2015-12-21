import 'babel/polyfill';
import 'whatwg-fetch';

const endpoint = '/signup';

export default {
  
  async signup(userInfo) {
    try {
      let res = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      let user = await res.json();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
