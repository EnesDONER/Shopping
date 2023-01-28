const connection = require('../utility/database');

module.exports = class Product{
    constructor(name,price,description,categoryid){
        this.categoryid=categoryid,
        this.name = name;
        this.price =price;
        this.description=description;
    }
    saveProduct(){
        return connection.execute('INSERT INTO products (name,categoryId,price,description) VALUES (?,?,?,?)',[this.name,this.categoryid,this.price,this.description]);
        
    }
    static getAll(){
        return connection.execute('SELECT * FROM products');
    }
    static getById(id){
        return connection.execute('SELECT * FROM products WHERE id='+id);
    }
    static Update(product){
        return connection.execute('UPDATE products SET products.categoryId=?,products.name=?,products.price=?,products.description=? WHERE products.id=?',
        [product.categoryid,product.name,product.price,product.description,product.id]);
        
    }
    static DeleteById(id){
        return connection.execute('DELETE FROM products WHERE id=?',[id])
    }
    static getProductByCategoryId(categoryId){
        
        return  products.filter(i=>i.categoryId==categoryId);
        
    }
    
}

