const connection = require('../utility/database');


module.exports = class Category{

    constructor(name){
        this.name=name;
    }
    static getAll(){
        return connection.execute('SELECT * FROM categories');
    }
    saveCategory(){
        return connection.execute('INSERT INTO categories (name) VALUES (?)',[this.name]);
    }
    static getById(id){
        return connection.execute('SELECT * FROM categories WHERE id='+id);
    }
    static update(category){
        return connection.execute('UPDATE categories SET categories.name=? WHERE categories.id=?',[category.name]);
    
    }
    static deleteById(id){
        return connection.execute('DELETE FROM categories WHERE id=?',[id])
    }
    static getCategoryByProductId(id){
        return connection.execute('SELECT categories.id ,categories.name as name FROM categories INNER JOIN  products ON products.categoryId =categories.id AND products.id ='+id);
    }
}
