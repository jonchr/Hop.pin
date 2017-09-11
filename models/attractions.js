module.exports = function(sequelize, DataTypes) {

	var Attractions = sequelize.define("Attractions", {
		placeId: {
			type: DataTypes.STRING,

		},

		attraction: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},

		state: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},

		lat: {
			type: DataTypes.STRING
		},

		long: {
			type: DataTypes.STRING
		}

	});

	return Attractions;
};