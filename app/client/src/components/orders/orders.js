import React from 'react';
import './orders.scss';

function Orders ( item ) {  

    console.log(item.item)
    return (
            <div className="orders">
                <ul className="list-group">
                    <li className="list-group-item list-group-item-info">Order ID: {item.item._id}</li>
                    <li className="list-group-item list-group-item-success">State order: {item.item.stateOrder}</li>
                    <li className="list-group-item list-group-item-secondary">Product: {item.item.items[0].title}</li>
                    <li className="list-group-item list-group-item-secondary">ID: {item.item.items[0]._id}</li>
                    <li className="list-group-item list-group-item-secondary">Price: {item.item.items[0].price}</li>
                    <li className="list-group-item list-group-item-secondary">Quantity: {item.item.items[0].quantity}</li>
                    <li className="list-group-item list-group-item-secondary">Date: {item.item.date}</li>
                </ul>
            </div>
    )}

export default Orders;