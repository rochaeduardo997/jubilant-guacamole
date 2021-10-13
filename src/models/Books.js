const { Model, DataTypes } = require('sequelize');

class Books extends Model{
  static init(sequelize){
    super.init({
      id:                 { type: DataTypes.UUID, primaryKey: true },
      title:              { type: DataTypes.STRING },
      publishing_company: { type: DataTypes.STRING },
      picture:            { type: DataTypes.STRING },
      authors:            { type: DataTypes.ARRAY(DataTypes.STRING)}
    },{
      sequelize,
      tableName: 'tbl_books'
    });
  }
}

module.exports = Books;