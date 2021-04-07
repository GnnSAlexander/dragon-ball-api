const { model, Schema } = require("mongoose")

const serieSchema = new Schema({
  name: String,
  img: String,
  date_added: Date,
  date_modified: Date,
})

serieSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Serie = model("Serie", serieSchema)

module.exports = Serie
