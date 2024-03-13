const getContacts = (token) => {
    return fetch(`http://localhost:3000/getContacts?t=${token}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
   
  };
  export default getContacts;