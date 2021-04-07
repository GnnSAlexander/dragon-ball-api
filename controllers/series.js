const seriesRouter = require("express").Router()

const Serie = require("../models/Series")

seriesRouter.get("/", async (req, res) => {
  const series = await Serie.find({})
  console.log(series)
  res.json(series)
})

seriesRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params

  try {
    const serie = await Serie.findById(id)

    res.json(serie)
  } catch (error) {
    next(error)
  }
})

seriesRouter.post("/", async (req, res, next) => {
  const body = req.body

  console.log(body)

  if (!body?.name) {
    res.status(400).send({ error: "name is required" })
  }

  const serie = new Serie({
    name: body.name,
    img: body.img || "",
    date_added: new Date(),
    date_modified: new Date(),
  })

  try {
    const serieSaved = await serie.save()

    res.json(serieSaved)
  } catch (error) {
    next(error)
  }
})

seriesRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params
  const body = req.body

  const newSerie = {
    name: body.name,
    img: body.img || "",
    date_modified: new Date(),
  }

  try {
    const serieUpdated = await Serie.findByIdAndUpdate(id, newSerie, {
      new: true,
    })

    res.json(serieUpdated)
  } catch (error) {
    next(error)
  }
})

seriesRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params

  try {
    await Serie.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = seriesRouter
