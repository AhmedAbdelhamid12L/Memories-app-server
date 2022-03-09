//******  connection using mongoose ******//

import mongoose from "mongoose";

const dbConnection = () =>
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((result) => {
      console.log("db Connected");
    })
    .catch((error) => {
      console.log("error");
    });

export default dbConnection;
