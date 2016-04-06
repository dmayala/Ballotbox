import cookie from 'react-cookie';

const endpoint = '/api/polls';

export default {
  async getPolls() {
    try {
      let bearer = cookie.load('jwt');
      let res = await fetch(`${endpoint}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        }
      });

      let polls = await res.json();
      return polls;
    } catch (err) {
      throw new Error(err);
    }
  }
}
