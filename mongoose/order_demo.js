var OrderModel=require('./model/order.js');


// OrderModel.find({}, (err, docs)=>{
//     console.log(docs)
// })

OrderModel.aggregate([
    {
        $lookup:
        {
            from:'order_item',
            localField:'order_id',
            foreignField:'order_id',
            as:'items'
        }
    }
], function(err, docs){
    console.log(docs)
})