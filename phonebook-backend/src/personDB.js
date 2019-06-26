const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});



const Person = mongoose.model('Person', personSchema);






const getAllPersons = (url) => {
    mongoose.connect(url, {useNewUrlParser: true});
    Person.find({}).then( res => {
        res.forEach(per => {
            console.log(per);
        })
        mongoose.connection.close();
    });
}

const addPerson = (url, name, number) => {
    const person = new Person({
        name: name,
        number: number
    });
    mongoose.connect(url, {useNewUrlParser: true});
    person.save().then(res => {
        console.log(res);
        console.log('Person saved!');
        mongoose.connection.close();
    });
};



module.exports = {
    getAllPersons: getAllPersons,
    addPerson: addPerson
}


