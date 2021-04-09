const generateCharacter = (req) => {
  const body = req.body

  let newCharacter = {
    date_modified: new Date(),
  }

  if (body.name) {
    newCharacter.name = body.name
  }

  if (body.img) {
    newCharacter.img = body.img
  }

  if (body.planet) {
    newCharacter.planet = body.planet
  }

  if (body.series) {
    const series = body.series || []
    newCharacter.series = series.split(",")
  }

  if (body.species) {
    newCharacter.species = body.species
  }

  return newCharacter
}

module.exports = { generateCharacter }
