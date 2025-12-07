import app from "./app"
import config from "./config.ts";


const port = config.port;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
