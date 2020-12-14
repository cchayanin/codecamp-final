module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			username: {
				type: DataTypes.STRING(20),
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
			},
			name: {
				type: DataTypes.STRING,
			},
			is_admin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			tableName: 'user',
			timestamps: false,
		},
	)

	return User
}
