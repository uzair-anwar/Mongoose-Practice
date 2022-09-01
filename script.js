const mongoose = require("mongoose");
const User = require("./User");

//"mongodb+srv://uzairanwar:Uzair6702@cluster0.zqp92wv.mongodb.net/test",
mongoose.connect(
  "mongodb://localhost:27017/Test",
  () => {
    console.log("DB connected");
  },
  (e) => {
    console.log(e);
  }
);

run();

async function run() {
  try {
    const user = await User.findOne({ wher: "Uzi" });
    console.log(user);
    await user.save();
    //user.sayHi("us");
    // const user = await User.create({
    //   name: "Uzi",
    //   age: 10,
    //   email: "Test@gmail.com",
    //   hobbies: ["Reading", "Coding "],
    //   address: {
    //     street: "Hostel 17",
    //   },
    // });
    // console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}
