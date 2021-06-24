
export const baseRoute = (_,res) => {
    res.status(200).json({
        userRoutes: {
            login: {
                route: '/users/login',
                method: 'POST'
            },
            register: {
                route: '/users/register',
                method: 'POST'
            },
            getAllUser: {
                route: '/users/all',
                method: 'GET'
            },
            delete_AND_getUserById: {
                route: 'users/:id',
                method: 'DELETE and GET'
            },
            updateLoggedInUserField: {
                route: '/users/update',
                method: 'PUT'
            },
        },
        ProductRoutes: {
            createProduct_AND_getAllProducts: {
                route: '/products',
                method: 'POST and GET'
            },
            getProductById_AND_deleteProduct: {
                route: '/products/:id',
                method: 'GET and DELETE'
            },
        },
        cartRoutes: {
            addItemsToCart_AND_getAllCarts: {
                route: '/carts',
                method: 'POST and GET'
            },
            getCartById_AND_deleteCartById: {
                route: '/carts/:id',
                method: 'GET and DELETE'
            },
            removeProductFromCart: {
                route: '/carts/removeproductfromcart/:id',
                method: 'PUT'
            }
        }
    })
}