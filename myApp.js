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
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. -- this will be passed in.
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    person.favoriteFoods.push(foodToAdd);

    // The file doesn't save automatically like it does with .create() when you use array methods like push (or manual JS methods), so you always need to save the update to the record:
    person.save((err, data) => {
      if(err) return console.log(err);
      done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // findOneAndUpdate uses ( conditions , update , options , callback ) as arguments.
// To return the updated document, you need to pass the options document { new: true } as the 3rd argument to findOneAndUpdate(). By default, these methods return the unmodified object.
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => {
      if(err) return console.log(err);
      done(null, data);
    })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
      if(err) return console.log(err);
      done(null, data);
    })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  // .remove() requires the condition and the callback.
  // The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected. 
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  // Searches the favoriteFoods arrays to find the foodToSearch.
  Person.find({favoriteFoods: foodToSearch})
  // sorts by the name field - 1 is for ascending order. can also sort by -1. 
  .sort({name: 1})
  // limits to two documents only
  .limit(2)
  // If you want to exclude a field, you can just do .select("-field_I_dont_want") (Note the - = it means minus this field. If you don't put a dash, then it would only include the age field)
  .select('-age')
  // Note that you have to use the callback in exec() when using method chaining like this.
  .exec((err, response) => {
    if(err) return console.log(err);
    done(null, response);
  }); 
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
