module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
      
    });

    Customer.associate = function(model) {
        Customer.hasMany(model.Order);
    }
  
    return Customer;
  };
  