const Joi            = require('joi');
const { v4: uuidv4 } = require('uuid');

const { printLog } = require('../utils');

module.exports = (app, db, sequelize) => {
  const bookRegisterValidation = Joi.object({
    title:              Joi.string().required(),
    publishing_company: Joi.string().required(),
    picture:            Joi.string().required(),
    authors:            Joi.array().items(Joi.string()),
  });

  const bookUpdateValidation = Joi.object({
    title:              Joi.string(),
    publishing_company: Joi.string(),
    picture:            Joi.string(),
    authors:            Joi.array().items(Joi.string()),
  });

  async function index(req, res){
    try{
      const result = await db.findAll();

      printLog('Books', 'Route: Index', `Qtd: ${ result.length }`, 'Status: true');

      return res.status(200).json({ status: true, result });
    }catch(err){
      printLog('Books', 'Route: Index', 'Status: false', err.message);

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async function create(req, res){
    const id = uuidv4();
    const { title, publishing_company, picture, authors } = req.body;
    let sequelizeTransaction = '';
    
    try{
      sequelizeTransaction = await sequelize.transaction();
      await bookRegisterValidation.validateAsync({ title, publishing_company, picture, authors });

      const result = await db.create({ id, title, publishing_company, picture, authors }, { sequelizeTransaction });

      await sequelizeTransaction.commit();

      printLog('Books', 'Route: Create', `ID: ${ result.id }`, `Title: ${ result.title }`, 'Status: true');

      return res.status(201).json({ status: true, result });
    }catch(err){
      await sequelizeTransaction.rollback();
      
      printLog('Books', 'Route: Create', 'Status: false', err.message);

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async function update(req, res){
    const { id } = req.params;
    let sequelizeTransaction = '';
    
    try{
      sequelizeTransaction = await sequelize.transaction();

      await bookUpdateValidation.validateAsync({ ...req.body });
      
      await db.update({ ...req.body }, { where: { id }}, { sequelizeTransaction });

      await sequelizeTransaction.commit(); 

      printLog('Books', 'Route: Update', `ID: ${ id }`, 'Status: true');

      return res.status(200).json({ status: true });
    }catch(err){
      printLog('Books', 'Route: Update', 'Status: false', err.message);

      await sequelizeTransaction.rollback();

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  async function remove(req, res){
    const { id } = req.params;
    let sequelizeTransaction = '';
    
    try{
      sequelizeTransaction = await sequelize.transaction();

      const ifExists = await db.findByPk(id);
      if(!ifExists){
        throw new Error('Book doesn\'t exists');
      }

      await db.destroy({ where: { id }}, { sequelizeTransaction });
      
      await sequelizeTransaction.commit();

      printLog('Books', 'Route: Remove', `ID: ${ id }`,'Status: true');

      return res.status(200).json({ status: true });
    }catch(err){
      printLog('Books', 'Route: Remove', 'Status: false', err.message);

      await sequelizeTransaction.rollback();

      return res.status(500).json({ status: false, message: err.message });
    }
  }

  app.post('/book',       create);
  app.get('/books',       index);
  app.put('/book/:id',    update);
  app.delete('/book/:id', remove);
}
