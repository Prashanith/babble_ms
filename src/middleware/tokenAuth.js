import jwt from "jsonwebtoken";

async function tokenAuth(request, response, next) {
  const authToken = String(request.headers["authorization"]).split()[1];
  console.log("Verifying");
  //   if (authToken) {

  //     jwt.verify();
  //   } else {

  //   }
  next();
}

export default tokenAuth;
