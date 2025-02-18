import express from 'express';
import { verifyUser } from '../middlewares/user.js';
import { Request, Response } from 'express';
import { Order, OrderItem } from '../models/Orders.js';

const router = express.Router();

router.post('/', verifyUser, async(req: Request, res: Response) => {

    try {
        let orderItems = await OrderItem.insertMany(req.body.items);
        const orderItemsIDs = orderItems.map((orderItem)=> orderItem._id );
    
        await Order.create({
            user: req.body.email,
            orderItems: orderItemsIDs,
            address: req.body.address
        });

        res.status(200).json({"status":"success"});
        
    } catch (error) {
        console.log('Error placing order for items', error.message);
        res.status(500).json({"message":""})
        
    }
    
})

export default router;