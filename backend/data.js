import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name: 'Mohamed',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true
        },
        {
            name: 'Bilal',
            email: 'bilal@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false
        }
    ],
    products:[
        {
            name:'Nike Slim Shirts 1',
            category: 'Shirts',
            image:'/images/product-1.jpeg',
            price:117,
            countInStock: 10,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description: 'hight quality product'
        },
        {
            name:'Pantalon 1',
            category: 'Shirts',
            image:'/images/product-2.jpeg',
            price:117,
            countInStock: 20,
            brand:'Nike',
            rating:3.2,
            numReviews:10,
            description: 'hight quality product'
        },
        {
            name:'Nike Slim Shirts 2',
            category: 'Shirts',
            image:'/images/product-1.jpeg',
            price:117,
            countInStock: 30,
            brand:'Nike',
            rating:4.0,
            numReviews:10,
            description: 'hight quality product'
        },
        {
            name:'Nike Slim Shirts 3',
            category: 'Shirts',
            image:'/images/product-2.jpeg',
            price:117,
            countInStock: 0,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description: 'hight quality product'
        }, 
        {
            name:'Nike Slim Shirts 4',
            category: 'Shirts',
            image:'/images/product-1.jpeg',
            price:117,
            countInStock: 10,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description: 'hight quality product'
        },
        {
            name:'Nike Slim Shirts 5',
            category: 'Shirts',
            image:'/images/product-2.jpeg',
            price:117,
            countInStock: 8,
            brand:'Nike',
            rating:5.0,
            numReviews:10,
            description: 'hight quality product'
        }
    ]
}

export default data;