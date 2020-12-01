import axios from '../../configs/axios'
import { useEffect, useState } from 'react'
import { Table } from 'antd'

export default function PersonComponent() {
	const [users, setUsers] = useState([])
	const fetchUsers = async () => {
		const httpResponse = await axios.get('/users')
		setUsers(httpResponse.data)
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	const columns = [
		{
			title: 'ผู้ใช้งาน',
			dataIndex: 'username',
			key: 'username',
		},
	]

	return <Table columns={columns} dataSource={users} rowKey='id' />
}
