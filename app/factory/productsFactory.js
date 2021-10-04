const ProdMongo = require("../db/prodMongo.js");
const prodMysql = require("../db/prodMysql.js");
const prodServerMemory = require("../db/prodServerMemory.js");

class ProductsRepository {
    repository;

    constructor(option) {
        switch(option) {
            case 0: 
                this.repository = prodServerMemory;
                break;
            case 1:
                this.repository = prodFs;
                break;
            case 2:
                this.repository = prodMysql;
                break;
            case 3: 
                this.repository = prodSqlite3;
                break;
            case 4: 
                this.repository = new ProdMongo({conex: 'local'});    
                break;
            case 5: 
                this.repository = new ProdMongo({conex: 'atlas'}) 
                break;  
            case 6: 
                this.repository = prodFirestore;
                break;     
        }
    }

    async create() {
        return this.repository.createTable();
    }

    async list() {
        return this.repository.list();
    }
    async listById(id) {
        return this.repository.listById(id);
    }
    async insert(items) {
        return this.repository.insert(items);
    }
    async deleteById(id) {
        return this.repository.deleteById(id);
    }
    
    async updateById(id, data) {
    return this.repository.updateById(id, data);
    }
}

module.exports = ProductsRepository;