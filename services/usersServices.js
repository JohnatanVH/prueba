const { faker } = require('@faker-js/faker');

class UsersServices {

  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        age: parseInt(faker.datatype.number()),
        phone: parseInt(faker.phone.number()),
      });

    }
  }

  create(data) {
    const user = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.users.push(user);
    return {
      message: 'created',
      user
    };
  }

  find(){
    return this.users;
  }

  findOne(id){
    return this.users.find(item => item.id === id);
  }

  update(id, data){

    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...data
    };
    return this.users[index];

  }

  delete(id){
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product not found');

    }
    this.users.splice(index, 1);
    return id;

  }


}

module.exports = UsersServices;
