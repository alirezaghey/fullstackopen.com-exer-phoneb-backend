const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});



const Person = mongoose.model('Person', personSchema);






const getAllPersons = (url) => {
    mongoose.connect(url, {useNewUrlParser: true});
    return Person.find({}).then( res => {
        res.forEach(per => {
            console.log(per);
        })
        mongoose.connection.close();
        return res;
    });
}

const getPersonByID = (url, id) => {
    mongoose.connect(url, {useNewUrlParser: true});
    return Person.findById(id).then(res => {
        console.log(res);
        mongoose.connection.close();
        return res;
    });
}

const getPersonsCount = (url) => {
    mongoose.connect(url, {useNewUrlParser: true});
    return Person.estimatedDocumentCount({}).then( res => {
        console.log(res);
        mongoose.connection.close();
        return res;
    })
}

const addPerson = (url, name, number) => {
    const person = new Person({
        name: name,
        number: number
    });
    mongoose.connect(url, {useNewUrlParser: true});
    return person.save().then(res => {
        console.log(res);
        console.log('Person saved!');
        mongoose.connection.close();
        return res;
    });
};

const updatePerson = (url, id, number) => {
    mongoose.connect(url, {useNewUrlParser: true, useFindAndModify: false});
    return Person.findByIdAndUpdate(id, {number: number}, {new: true}).then(res => {
        console.log(res);
        mongoose.connection.close();
        return res;
    })
}



module.exports = {
    getAllPersons: getAllPersons,
    addPerson: addPerson,
    updatePerson: updatePerson,
    getPersonsCount: getPersonsCount,
    getPersonByID: getPersonByID
}


