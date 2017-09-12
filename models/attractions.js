module.exports = function(sequelize, DataTypes) {

	var Attractions = sequelize.define("Attractions", {
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
		
		route: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		lat: {
			type: DataTypes.FLOAT
		},

		lng: {
			type: DataTypes.FLOAT
		}

	});

	return Attractions;
};