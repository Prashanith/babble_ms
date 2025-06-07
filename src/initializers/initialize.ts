import mongooseLoader from "./db";
import loadServer from "./server";

async function initialize(app: Express, mongoose) {
  await mongooseLoader(mongoose);
  loadServer(app);
}

export default initialize;
