const Product = require('./model/product');

class FakeDb {
    constructor() {
        this.products = [
            {
                coverImage: './../../../assets/img/phone-cover.jpg',
                name: 'Phone XL',
                price: 799,
                description: 'A large phone with one of the best screens',
                // head1: 'name'
                heading: [
                    {
                        name: 'heading1',
                        description: 'heading1 description',
                    },
                    {
                        name: 'heading2',
                        description: 'heading2 description',
                    },
                    {
                        name: 'heading3',
                        description: 'heading3 description',
                    },
                ]
            },
            {
                coverImage: './../../../assets/img/phone-cover.jpg',
                name: 'Phone Mini',
                price: 699,
                description: 'A great phone with one of the best cameras',
                // head1: 'name'
                heading: [
                    {
                        name: 'heading1',
                        description: 'heading1 description',
                    },
                    {
                        name: 'heading2',
                        description: 'heading2 description',
                    },
                    {
                        name: 'heading3',
                        description: 'heading3 description',
                    },
                ]
            },
            {
                coverImage: './../../../assets/img/phone-cover.jpg',
                name: 'Phone Standard',
                price: 299,
                description: 'A standard phone',
                // head1: 'name'
                heading: [
                    {
                        name: 'heading1',
                        description: 'heading1 description',
                    },
                    {
                        name: 'heading2',
                        description: 'heading2 description',
                    },
                    {
                        name: 'heading3',
                        description: 'heading3 description',
                    },
                ]
            },
            {
                coverImage: './../../../assets/img/phone-cover.jpg',
                name: 'Phone Special',
                price: 999,
                description: 'A special phone',
                // head1: 'name'
                heading: [
                    {
                        name: 'heading1',
                        description: 'heading1 description',
                    },
                    {
                        name: 'heading2',
                        description: 'heading2 description',
                    },
                    {
                        name: 'heading3',
                        description: 'heading3 description',
                    },
                ]
            }
        ]
    }

    async initDb(){
        await this.cleanDb();
        this.pushProductsDb();
    }
    async cleanDb(){
        await Product.deleteMany({})
    }
    pushProductsDb(){
        this.products.forEach((product)=>{
            const newProduct = new Product(product)
            newProduct.save(function(err){
                if(!err){
                    console.log('saved!');
                }

            });
        }
        )
    }
    seeDb(){
        this.pushProductsDb();
    }
}

module.exports = FakeDb;