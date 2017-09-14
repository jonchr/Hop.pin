module.exports = function(sequelize, DataTypes) {

	var Attractions = sequelize.define("Attractions", {
		attraction: {
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
		},

		counter: {
			type: DataTypes.INTEGER,
			defaultValue: 1
			
		}

	});

	return Attractions;
};