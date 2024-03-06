const getContacts = (token) => {
    return fetch(`http://localhost:3000/getContacts?t=${token}`, {
      method: 'GET',
    }).then((response) => response.json());
  };
  export default getContacts;