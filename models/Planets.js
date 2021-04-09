const { model, Schema } = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const planetSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  img: String,
  date_added: Date,
  date_modified: Date,
})

planetSchema.plugin(uniqueValidator)

planetSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Planet = model("Planet", planetSchema)

module.exports = Planet
