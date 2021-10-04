const { cartDb } = require("../config/cart.js");

async function getDataCartController(req, res) {
    cartDb.getCart().then((list) => {
      res.json(list);
    });
  }
  
  async function getDataCartByIdController(req, res) {
    const { id } = req.params;
    res.json(cartDb.getCartId(id));
  }
  
  async function postDataCartController(req, res) {
    if (isAuth) {
      const data = req.body;
      cartDb.postCart(data);
    } else {
      res.send(
        `"error" : 'does not have permissions', "description": route = '${req.url}' method = '${req.method}' not authorized`
      );
    }
  }
  
  async function deleteDataCartController(req, res) {
    if (isAuth) {
      const { id } = req.params;
      res.json(cartDb.deleteCartItem(id));
    } else {
      res.send(
        `"error" : 'does not have permissions', "description": route = '${req.url}' method = '${req.method}' not authorized`
      );
    }
  }

module.exports = {
    getDataCartController,
    getDataCartByIdController,
    postDataCartController,
    deleteDataCartController
}