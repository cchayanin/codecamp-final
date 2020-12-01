import axios from '../../configs/axios'
import { useEffect, useState } from 'react'
import { Table } from 'antd'

export default function PersonComponent() {
	const [persons, setPersons] = useState([])
	const fetchPersons = async () => {
		const httpResponse = await axios.get('/persons')
		setPersons(httpResponse.data)
	}

	useEffect(() => {
		fetchPersons()
	}, [])

	const columns = [
		{
			title: 'ชื่อ',
			dataIndex: 'give_name',
			key: 'give_name',
		},
		{
			title: 'นามสกุล',
			dataIndex: 'family_name',
			key: 'family_name',
		},
	]

	return <Table columns={columns} dataSource={persons} rowKey='citizen_id' />
}
