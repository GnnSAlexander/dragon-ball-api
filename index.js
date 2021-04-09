require("dotenv").config()
require("./mongodb")
const express = require("express")
const charactersRouter = require("./controllers/characters")
const planetsRouter = require("./controllers/planets")
const seriesRouter = require("./controllers/series")
const handleErrors = require("./middleware/handleErrors")
const unknownEndpoint = require("./middleware/notFound")

const app = express()

app.use(express.json())
const PORT = process.env.PORT || 3003

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/api/characters", charactersRouter)
app.use("/api/series", seriesRouter)
app.use("/api/planets", planetsRouter)

app.use(handleErrors)
app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
