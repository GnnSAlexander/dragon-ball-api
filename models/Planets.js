const { model, Schema } = require("mongoose")

const planetSchema = new Schema({
  name: String,
  img: String,
  date_added: Date,
  date_modified: Date,
})

planetSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Planet = model("Planet", planetSchema)

module.exports = Planet
