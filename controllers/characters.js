const charactersRouter = require("express").Router()

const Character = require("../models/Characters")
const Serie = require("../models/Series")

const _character = require("../utils/_character")

charactersRouter.get("/", async (req, res) => {
  const characters = await Character.find({})
    .populate("series", {
      name: 1,
      img: 1,
    })
    .populate("planet", {
      name: 1,
      img: 1,
    })
  res.json(characters)
})

charactersRouter.post("/", async (req, res, next) => {
  const body = req.body

  if (!body.name) {
    res.status(400).send({ error: "name is required" })
  }

  const series = body.series || []

  const newCharacter = new Character({
    name: body.name,
    img: body.img || "",
    planet: body.planet,
    series: series.split(","),
    species: body.species,
    date: new Date(),
  })

  try {
    const character = await newCharacter.save()
    res.json(character)
  } catch (error) {
    next(error)
  }
})

charactersRouter.get("/:id", async (req, res) => {
  const { id } = req.params

  const character = await Character.findById(id)
    .populate("series", {
      name: 1,
      img: 1,
    })
    .populate("planet", {
      name: 1,
      img: 1,
    })

  if (!character) return res.status(400).end()

  res.json(character)
})

charactersRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params

  const newCharacter = _character.generateCharacter(req)

  try {
    const characterUpdated = await Character.findByIdAndUpdate(
      id,
      newCharacter,
      { new: true }
    )
    res.json(characterUpdated)
  } catch (error) {
    next(error)
  }
})

charactersRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params

  try {
    await Character.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = charactersRouter
