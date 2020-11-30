module.exports = (sequelize, DataTypes) => {
	const Register = sequelize.define(
		'Register',
		{
			paid: {
				type: DataTypes.BOOLEAN,
			},
			sponsor: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			tableName: 'register',
		},
	)

	return Register
}
