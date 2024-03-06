const loginData = (login) => {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
  
      body: JSON.stringify(login),
      headers: { 'Content-type': 'application/json' },
    }).then((response) => response.json());
  };
  export default loginData;