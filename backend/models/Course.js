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
			timestamps: false,
		},
	)

	Course.associate = (models) => {
		Course.hasMany(models.Register, {
			foreignKey: 'type_round',
			onDelete: 'RESTRICT',
		})
	}

	return Course
}
