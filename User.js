const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  age: {
    type: Number,
    min: 0,
    max: 100,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not a even number`,
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  hobbies: [String],
  address: addressSchema,
});

userSchema.methods.sayHi = function (name) {
  console.log(`Hi, My name is: ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  console.log(name);
  return this.where({ name: new RegExp(name, "i") });
};

userSchema.virtual("named Email").get(function () {
  return `${this.name} <${this.email}>`;
});
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  throw new Error("Fail Save");
});

userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});

module.exports = mongoose.model("User", userSchema);
