module.exports = (sequelize, DataTypes) => {
	const Person = sequelize.define(
		'Person',
		{
			citizen_id: {
				type: DataTypes.STRING(13),
				primaryKey: true,
			},
			prefix: {
				type: DataTypes.STRING(3),
			},
			give_name: {
				type: DataTypes.STRING,
			},
			family_name: {
				type: DataTypes.STRING,
			},
			nickname: {
				type: DataTypes.STRING,
			},
			mobile_phone: {
				type: DataTypes.STRING(10),
			},
			email: {
				type: DataTypes.STRING(50),
			},
			birth_date: {
				type: DataTypes.DATEONLY,
			},
			nationality: {
				type: DataTypes.STRING(2),
			},
			building_number: {
				type: DataTypes.STRING(20),
			},
			floor_id: {
				type: DataTypes.STRING(3),
			},
			township_number: {
				type: DataTypes.STRING(2),
			},
			township_name: {
				type: DataTypes.STRING(100),
			},
			sub_lane: {
				type: DataTypes.STRING(100),
			},
			lane: {
				type: DataTypes.STRING(100),
			},
			street_name: {
				type: DataTypes.STRING(100),
			},
			sub_district: {
				type: DataTypes.STRING(8),
			},
			district: {
				type: DataTypes.STRING(4),
			},
			province: {
				type: DataTypes.STRING(2),
			},
			postcode: {
				type: DataTypes.STRING(5),
			},
		},
		{
			tableName: 'person',
		},
	)

	Person.associate = (models) => {
		Person.hasMany(models.Register, {
			foreignKey: 'citizen_id',
		})
	}

	return Person
}
