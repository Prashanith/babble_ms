import { Mongoose } from "mongoose";
import { secrets } from "../utils/envUtils";

async function mongooseLoader(mongoose:Mongoose) {
  mongoose.connect(secrets.MONGOOSE_CONNECTION_STRING);

  mongoose.connection
    .once("open", () => console.log("DB Connection Succeeded"))
    .on("error", () => console.log("DB Connection Failed"));
}

export default mongooseLoader;
