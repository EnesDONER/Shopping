const categories = [
{id:1,name:'Bilgisayar'},
{id:2,name:'Telefon'},
{id:3,name:'Akıllı saat'},

];

module.exports = class Category{

    constructor(name){
        this.id=8;
        this.name=name;
    }
    static getAll(){
        return categories;
    }
    saveCategory(){
        categories.push(this);
    }
    static getById(id){
        return categories.find(i=>i.id==id);
    }
    static update(category){
        const index = categories.findIndex(i=>i.id==category.id);
        categories[index].name=category.name;

    
    }
    deleteById(id){
        const index = categories.findIndex(i=>i.id==id);
        categories.splice(index,1);
    }
    
}
