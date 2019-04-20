module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      devoured : {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      }
    });

    Burger.associate = function(model) {
      Burger.hasMany(model.Order);
    }
  
    return Burger;
  };
  