module.exports = function(sequelize, DataTypes) {

	var Users = sequelize.define("Users", {

		userId: {
			type: DataTypes.INTEGER,
			autoIncrement: true

		},

		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		}

	});

	return Users;
}