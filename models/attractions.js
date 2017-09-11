module.exports = function(sequelize, DataTypes) {

	var Attractions = sequelize.define("Attractions", {
		placeId: {
			type: DataTypes.INTEGER,
			autoIncrement: true

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

		latlong: {
			type: DataTypes.STRING,

		}

	});

	Attractions.associate = function(models) {

		Attractions.belongsTo(models.Users, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Attractions;
};