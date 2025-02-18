import express, { NextFunction } from 'express';
import Product from '../models/Product.js';
import { verifyAuthorizedRole, verifyUser } from '../middlewares/user.js';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/', verifyUser, async(req: Request, res: Response) => {
    let list = await Product.find();
    res.status(200).json(list);
})

router.post('/', verifyUser, verifyAuthorizedRole, async (req: Request, res: Response) => {
    try {
        const data = req.body;

        await Product.create({ 
            name: data.name, 
            description: data.description, 
            price: data.price,
            stockQuantity: 0 
        });

        res.status(201).json({status:'success'});
        
    } catch (error) {
        console.log('Error adding new item', error.message);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
    
})


router.put('/:id', verifyUser, verifyAuthorizedRole, findItem, async (req: Request,res: Response) => {

    try {
        let item = req["item"];

        item = Object.assign(item, req.body)
        await item.save();
        
        res.status(200).json({status:'success'});
        
    } catch (error) {
        console.log('Error updating item', error.message);
        res.status(500).json({status: 'error', message: 'Internal server error' });
    }
    
})

router.delete('/:id', verifyUser, verifyAuthorizedRole, findItem, async (req: Request, res: Response) => {
    try {
        let item = req["item"];
        await item.deleteOne();
        res.status(200).json({status:'success'});
        
    } catch (error) {
        console.log('Error removing item', error.message);
        res.status(500).json({status: 'error', message: 'Internal server error' });
    }
})

router.patch('/:id', verifyUser, verifyAuthorizedRole, findItem, async (req: Request, res: Response) => {
    try {
        let item = req['item'] || {};
        if( !item ) throw new Error('No item found');

        let updatedQty = req.body.quantity;
        
        item.stockQuantity = item.stockQuantity + parseInt(updatedQty);
        await item.save();

        res.status(200).json({status:'success'});
        
    } catch (error) {
        console.log('Error updating item inventory', error.message);
        res.status(500).json({status: 'error', message: 'Internal server error' });
    }
}) 

async function findItem(req: Request, res: Response, next: NextFunction){
    try {
        let itemID = req.params.id;
        let item = await Product.findById( itemID );

        if( !item ){
            res.status(404).json({status: 'error', message:"Item not found!"})
        }
        
        req.body = req.body;
        req["item"] = item;
        next();
        
    } catch (error) {
        console.log('Error finding item in database', error.message);
        res.status(500).json({status: 'error', message: 'Internal server error' });
    }
}

export default router;