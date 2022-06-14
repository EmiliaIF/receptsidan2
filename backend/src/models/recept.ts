import { Schema, model } from "mongoose";
const { stringify } = require("nodemon/lib/utils");

export interface Recept {
  title: String;

  description: String;

  imageUrl: String;

  timeInMins: Number;

  category: string;

  ingredients: [{ name: string; amount: number; unit: string }];

  instructions: [{ instruction: string; order: number }];

  ratings: [number];

  comments?: [{ comment: string; name: string; createdAt: Date }];
}

const ReceptSchema = new Schema<Recept>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  timeInMins: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [
      {
        name: String,
        amount: Number,
        unit: String,
      },
    ],
    required: true,
  },

  instructions: {
    type: [
      {
        instruction: String,
        order: Number,
      },
    ],

    required: true,
  },

  comments: {
    type: [
      {
        comment: String,
        name: String,
        createdAt: Date,
      },
    ],
    required: false,
  },

  ratings: {
    type: [Number],
    required: false,
  },
});

const Recept = model("Recept", ReceptSchema);
export default Recept;
