module.exports = (sequelize, DataTypes) => {
	const Register = sequelize.define(
		'Register',
		{
			type_round: {
				type: DataTypes.STRING(4),
				primaryKey: true,
			},
			citizen_id: {
				type: DataTypes.STRING(13),
				primaryKey: true,
			},
			is_paid: {
				type: DataTypes.BOOLEAN,
			},
			is_sponsor: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			tableName: 'register',
		},
	)

	Register.associate = (models) => {
		Register.belongsTo(models.Course, {
			foreignKey: 'type_round',
		})
		Register.belongsTo(models.Person, {
			foreignKey: 'citizen_id',
		})
	}

	return Register
}
