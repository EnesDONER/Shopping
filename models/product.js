const products =[
    {id:151,categoryid:1,name:'scszc',price:2,description:'acdcds'},
    {id:152,categoryid:1,name:'dwzc',price:2,description:'cdvdcds'},
    {id:153,categoryid:2,name:'wadscszc',price:2,description:'fecdcds'},
    {id:154,categoryid:2,name:'wadscszc',price:2,description:'fecdcds'},
    {id:155,categoryid:3,name:'wadscszc',price:2,description:'fecdcds'},
    {id:156,categoryid:1,name:'wadscszc',price:2,description:'fecdcds'},

];

module.exports = class Product{
    constructor(id,name,price,description,categoryid){
        this.id =id;
        this.categoryid=categoryid,
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
    static DeleteById(id){
        const index = products.findIndex(i=>i.id==id);
        products.splice(index,1);
    }
    static getProductByCategoryId(categoryid){
        
        return  products.filter(i=>i.categoryid==categoryid);
        
    }
}

