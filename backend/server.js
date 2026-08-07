const express = require('express');
const cors = require('cors');
const taskRoutes = require("./routes/tasks")
const errorHandle = require("./middleware/errorHandle")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks",taskRoutes)
app.use(errorHandle)


const PORT = 4000;

app.listen(PORT, () => {
    console.log("server is runnuning on port" + PORT);
      

});
 