import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log("API running on port", port);
  console.log("\nSwagger running on URL http://localhost:3000/swagger");
});
