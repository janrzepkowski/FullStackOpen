const mongoose = require("mongoose");
require("dotenv").config();

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phonebookSchema);

const person = new Person({
  name: name,
  number: number,
});

if (process.argv.length === 5) {
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
