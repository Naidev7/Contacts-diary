const callToApi = (registrer) => {
    return fetch('http://localhost:3000/registrer', {
      method: 'POST',
  
      body: JSON.stringify(registrer),
      headers: { 'Content-type': 'application/json' },
    }).then((response) => response.json());
  };
  export default callToApi;