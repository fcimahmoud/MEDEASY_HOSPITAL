const mongoose = require ("mongoose");


const connectionDB = async () => {
  return await mongoose
    .connect(process.env.DB_URL_CLOUD)
    .then((res) => console.log('Db connection success'))
    .catch((err) => console.log('DB connection Fail', err))
}

module.exports = {
  connectionDB
}
