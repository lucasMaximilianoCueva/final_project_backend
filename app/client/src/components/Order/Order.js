import React, { useState, useEffect } from 'react';
import pino from 'pino'
import Orders from '../orders/orders';

const logger = pino({
  prettyPrint: { colorize: true }
});

function Order() {
    const [dataUser, setDataUser] = useState([]);
    const [orderUser, setOrderUser] = useState([]);
    const [emailUser, setEmailUser] = useState([]);

    useEffect(() => {
        fetch("/user/order")
            .then(res => res.json())
            .then(res => setOrderUser(res))
            .catch(err => {
                logger.info(`error: ${err}`);
            });
      }, []);  
      useEffect(() => {
        fetch("/user/order")
            .then(res => res.json())
            .then(res => setEmailUser(res))
            .catch(err => {
                logger.info(`error: ${err}`);
            });
      }, []);  

    useEffect(() => {
        fetch("/user")
            .then(res => res.json())
            .then(res => setDataUser(res))
            .catch(err => {
                logger.info(`error: ${err}`);
            });
      }, []);  

      console.log(emailUser.length) //recorrer el array
      console.log(`data.name ${dataUser.email}`)

    return (
        <div>
            <h1 style={{color: "black"}}>Orders</h1>
    {emailUser === dataUser.email ? (
        <ul>
            {orderUser.map((item) => (
                  <li key={item._id} style={{display: "inline-block", marginLeft: 10}}>
                    <Orders item={item} />
                  </li>
                ))}
        </ul>
    ) : (<h2>No orders</h2>)}
        </div>
    )  
        }

export default Order
