module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define("Order", {});

    Order.associate = function (model) {
        Order.belongsTo(model.Customer, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    Order.associate = function (model) {
        Order.belongsTo(model.Burger, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Order;
};
