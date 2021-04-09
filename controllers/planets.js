const planetsRouter = require("express").Router()

const Planet = require("../models/Planets")

planetsRouter.get("/", async (req, res) => {
  const planets = await Planet.find({})

  res.json(planets)
})

planetsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params

  try {
    const planet = await Planet.findById(id)

    res.json(planet)
  } catch (error) {
    next(error)
  }
})

planetsRouter.post("/", async (req, res, next) => {
  const body = req.body

  console.log(body)

  if (!body?.name) {
    res.status(400).send({ error: "name is required" })
  }

  const planet = new Planet({
    name: body.name,
    img: body.img || "",
    date_added: new Date(),
    date_modified: new Date(),
  })

  try {
    const planetSaved = await planet.save()

    res.json(planetSaved)
  } catch (error) {
    next(error)
  }
})

planetsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params

  try {
    await Planet.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = planetsRouter
