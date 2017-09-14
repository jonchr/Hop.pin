module.exports = function(sequelize, DataTypes) {

	var Userlog = sequelize.define("Userlog", {

		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},

		AttractionId: {
			type: DataTypes.STRING,

		}

	});

	return Userlog;
};