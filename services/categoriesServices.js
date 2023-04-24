const { faker } = require('@faker-js/faker');

class CategoriesServices {

  constructor(){
    this.categories = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
      });

    }
  }

  create(data) {
    const category = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.categories.push(category);
    return {
      message: 'created',
      data
    };
  }

  find(){
    return this.categories;
  }

  findOne(id){
    return this.categories.find(item => item.id === id);
  }

  update(id, data){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Category not found');
    }
    const user = this.categories[index];
    this.categories[index] = {
      ...user,
      ...data
    };
    return this.categories[index];
  }

  delete(id){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Category not found');
    }
    this.categories.splice(index, 1);
    return id;

  }


}

module.exports = CategoriesServices;
