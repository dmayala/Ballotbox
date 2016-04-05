import cookie from 'react-cookie';

export default {
  
  async addPoll(details) {
    try {
      let bearer = cookie.load('jwt');
      let res = await fetch('/api/polls', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearer}`
        },
        body: JSON.stringify(details)
      });

      let poll = await res.json();
      return poll;
    } catch (err) {
      throw new Error(err);
    }
  }
}
