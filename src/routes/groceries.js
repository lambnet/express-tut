import { Router } from "express";

const router = Router();

const groceryList = [
    {
        item: 'egg',
        quantity: 4
    },
    {
        item: 'tea',
        quantity: 10
    },
    {
        item: 'caffee',
        quantity: 2
    }
]

router.use((req, res, next) => {
    if(req.session.user) next();
    else res.sendStatus(401);
})

router.route('/')
    .get((req, res) => {
        res.cookie('visited', true, {
            maxAge: 60000,
        })
        res.send(groceryList);
    })
    .post((req, res) => {
        console.log(req.body);
        groceryList.push(req.body);
        res.send(201);
    })

router.get('/:item', (req, res) => {
    const { item } = req.params;
    const groceryItem = groceryList.find((i) => i.item === item);
    console.log(req.cookies);
    res.send(groceryItem);
});

router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session;
    if(!cart){
        res.send('No cart session');
    }else{
        res.send(cart);
    }
});

router.post('/shopping/cart/item', (req, res) => {
    const { item, quantity } = req.body;
    const cartItem = {item, quantity};
    const { cart } = req.session;

    if(cart){
        req.session.cart.items.push(cartItem);
    }else{
        req.session.cart = {
            items: [cartItem]
        }
    }
    res.sendStatus(201);
});

export default router;