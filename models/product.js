const products =[
    {id:151,name:'scszc',price:2,description:'acdcds'},
    {id:152,name:'dwzc',price:2,description:'cdvdcds'},
    {id:153,name:'wadscszc',price:2,description:'fecdcds'},
];

module.exports = class Product{
    constructor(id,name,price,description){
        this.id =id;
        this.name = name;
        this.price =price;
        this.description=description;
    }
    saveProduct(){
        products.push(this);
    }
    static getAll(){
        return products;
    }
    static getById(id){
        const product= products.find(i=>i.id ==id);
        return product;
    }
    static Update(product){
        const index = products.findIndex(i=>i.id===product.id);
        products[index].name = product.name;
        products[index].price = product.price;
        products[index].description = product.description;
       

    }
}

