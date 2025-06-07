async function mongooseLoader(mongoose) {
  mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);

  mongoose.connection
    .once("open", () => console.log("DB Connection Succeeded"))
    .on("error", () => console.log("DB Connection Failed"));
}

export default mongooseLoader;
