const mongoose = require('mongoose');

const dbConnect = () => {
  const user = 'naidev';
  const pass = 'A7DAyaAdqc9rjkkh';
  const dbName = 'Contacts_diaryDB';

  const uri = `mongodb+srv://${user}:${pass}@cluster0.hrrynd4.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose
    .connect(uri)
    .then(() => console.log('conectado a MongoDB'))
    .catch((e) => console.log('error de conexión', e));
};
module.exports = dbConnect;