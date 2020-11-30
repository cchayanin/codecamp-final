module.exports = (sequelize, DataTypes) => {
	const Course = sequelize.define(
		'Course',
		{
			type_round: {
				type: DataTypes.STRING(4),
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
			},
			start_date: {
				type: DataTypes.DATEONLY,
			},
			end_date: {
				type: DataTypes.DATEONLY,
			},
		},
		{
			tableName: 'course',
		},
	)

	Course.associate = (models) => {
		Course.belongsToMany(models.Person, {
			through: models.Register,
		})
	}

	return Course
}
