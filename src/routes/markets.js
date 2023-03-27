import { Router } from "express";

const router = Router();

const marketList = [
    {
        id: 1,
        store: 'Waroeng',
        miles: 3.4
    }, 
    {
        id: 2,
        store: 'Wallmart',
        miles: 2.1
    },
    {
        id: 3,
        store: 'GammaMart',
        miles: 0.4
    },
    {
        id: 4,
        store: 'Rhodes Mard',
        miles: 1.2
    },
    {
        id: 5,
        store: 'GammaMart',
        miles: 3.8
    }
]

router.use((req, res, next) => {
    if(req.session.user) next();
    else res.sendStatus(401);
})

router.get('/', (req, res) => {
    const { miles } = req.query;
    const parsedMiles = parseFloat(miles);
    console.log(parsedMiles)
    if(!isNaN(parsedMiles)){
        const filtered = marketList.filter((i) => i.miles <= parsedMiles);
        res.send(filtered);
    }else res.send(marketList);
})


export default router;