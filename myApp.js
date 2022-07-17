require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// process.env.MONGO_URI is in the .env file. It was obtained by following the setup instructions here - https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/
mongoose.connect(process.env.MONGO_URI, {
// useNewUrlParser: true, 
    // useUnifiedTopology: true
  });

const personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    favoriteFoods: {
        type: [String]
    }
}, {
    timestamps: true //this is a second optional argument. In this case, we are using timestamps as true. This will cause mongoose to add two values, ‘created at’ and added at. When a document is created it will be given a ‘created at’ and ‘updated at’ property. Thereafter, whenever it’s updated, the ‘updated at’ property will be updated by mongoose. 
});

// Alternative syntax for the above:
// const personSchema = new Schema({
//   name: { type: String, required: true },
//   age: Number,
//   favoriteFoods: [String]
// });

// Creates the model called Person from the personSchema:
let Person = mongoose.model('Person', personSchema);

// module.exports = Person; -- If you wanted to export it for use in another file.

// Creates and Saves a Person
const createAndSavePerson = (done) => {
  let newPerson = new Person({name: "Jane Smith", age: 56, favoriteFoods: ["pizza", "apples"]});

  // data will be the data that gets saved (if successful)
  newPerson.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let arrayOfPeople = [{name: "Sally Smith", age: 78, favoriteFoods: ["raviolies", "tacos"]}, {name: "John Doe", age: 52, favoriteFoods: ["cereal", "bread"]}];

const createManyPeople = (arrayOfPeople, done) => {

    Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
