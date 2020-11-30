module.exports = (sequelize, DataTypes) => {
	const Register = sequelize.define(
		'Register',
		{
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

	return Register
}
