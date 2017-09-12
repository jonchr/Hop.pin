module.exports = function(sequelize, DataTypes) {

	var Userlog = sequelize.define("Users", {

		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},

		placeId: {
			type: DataTypes.STRING,

		}

	});

	return Users;
};