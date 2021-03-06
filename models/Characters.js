const { model, Schema } = require("mongoose")

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  img: String,
  planet: {
    type: Schema.Types.ObjectId,
    ref: "Planet",
  },
  series: [
    {
      type: Schema.Types.ObjectId,
      ref: "Serie",
    },
  ],
  species: String,
  date_added: Date,
  date_modified: Date,
})

characterSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Character = model("Character", characterSchema)

module.exports = Character
