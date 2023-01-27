const connection = require('../utility/database');

module.exports = class Product{
    constructor(name,price,description,categoryid){
        this.categoryid=categoryid,
        this.name = name;
        this.price =price;
        this.description=description;
    }
    saveProduct(){
        return connection.execute('INSERT INTO products (name,price,description) VALUES (?,?,?)',[this.name,this.price,this.description]);
        
    }
    static getAll(){
        return connection.execute('SELECT * FROM products');
    }
    static getById(id){
        return connection.execute('SELECT * FROM products WHERE id='+id);
    }
    static Update(product){
        return connection.execute('ALTER TABLE products{values:} * FROM products WHERE id='+id);
        
    }
    static DeleteById(id){
        const index = products.findIndex(i=>i.id==id);
        products.splice(index,1);
    }
    static getProductByCategoryId(categoryid){
        
        return  products.filter(i=>i.categoryid==categoryid);
        
    }
}

