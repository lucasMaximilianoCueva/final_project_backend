const ProductsRepository = require("../factory/productsFactory.js");
const { isAuth } = require("../middlewares/auth.js");
const logger = require("../helpers/pino.js");

const productsRepository = new ProductsRepository(Number(process.env.DB));

async function getDataController(req, res) {
  productsRepository
    .list()
    .then((items) => {
      let response = [];

      if (typeof req.query.sale != "undefined") {
        items.filter(function (item) {
          if (item.sale.toString() == req.query.sale) {
            // offers
            response.push(item);
          }
        });
      }
      if (typeof req.query.title != "undefined") {
        //title
        items.filter(function (item) {
          if (item.title.toLowerCase() == req.query.title) {
            response.push(item);
          }
        });
      }
      if (typeof req.query.code != "undefined") {
        //code
        items.filter(function (item) {
          if (item.code.toString() == req.query.code) {
            response.push(item);
          }
        });
      }
      if (typeof req.query.price != "undefined") {
        //price A
        items.filter(function (item) {
          if (item.price.toString() === req.query.price) {
            response.push(item);
          }
        });
      }
      if (typeof req.query.stock != "undefined") {
        //stock
        items.filter(function (item) {
          if (item.stock.toString() == req.query.stock) {
            response.push(item);
          }
        });
      }
      if (Object.keys(req.query).length === 0) {
        response = items;
      }
      res.json(response);
    })
    .catch(function (err) {
      throw err; // or handle it
    });
}

async function getDataByIdController(req, res) {
  const { id } = req.params;
  try {
    if (id === "") {
      return res
        .status(404)
        .json({ msg: "product not found", error });
    }
    const prodById = await productsRepository.listById(id).then((list) => {
      return list[0]._id;
    })

    if (!prodById) {
      return res.status(404).json({ msg: "product not found" });
    }
    return productsRepository.listById(prodById).then((list) => {
      res.json(list);
    });
  } catch (error) {
    logger.error(error);
    res.json('product not found')
  }
}

async function postDataController(req, res) {
  if (isAuth) {
    const data = req.body;
    productsRepository.insert(data).then(() => {
      res.json(data);
    });
  } else {
    logger.warn('does not have permissions', req.url, req.method);
    res.send(
      `"error" : 'does not have permissions', "description": route = '${req.url}' method = '${req.method}' not authorized`
    );
  }
}

async function putDataController(req, res) {
  if (isAuth) {
    const data = req.body;
    const { id } = req.params;
    productsRepository.updateById(id, data).then(() => {
      res.json(`product with id ${id} updated`);
    });
  } else {
    logger.warn('does not have permissions', req.url, req.method)
    res.send(
      `"error" : 'does not have permissions', "description": route = '${req.url}' method = '${req.method}' not authorized`
    );
  }
}

async function deleteDataController(req, res) {
  if (isAuth) {
    const { id } = req.params;
    productsRepository.deleteById(id).then(() => {
      res.json(`product with id ${id} deleted`);
    });
  } else {
    logger.warn('does not have permissions', req.url, req.method)
    res.send(
      `"error" : 'does not have permissions', "description": route = '${req.url}' method = '${req.method}' not authorized`
    );
  }
}

module.exports = {
  getDataController,
  getDataByIdController,
  postDataController,
  putDataController,
  deleteDataController,
};
