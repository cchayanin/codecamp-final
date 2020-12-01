import axios from '../../configs/axios'
import { useState, useEffect } from 'react'
import { Table } from 'antd'

export default function RegisterComponent() {
	const [registers, setRegisters] = useState([])
	const fetchRegisters = async () => {
		const httpResponse = await axios.get('/registers')

		//* concat composite to id
		httpResponse.data.map(
			(register) =>
				(register['id'] = register.type_round + register.citizen_id),
		)
		setRegisters(httpResponse.data)
	}

	useEffect(() => {
		fetchRegisters()
	}, [])

	const columns = [
		{
			title: 'รุ่น',
			dataIndex: 'type_round',
			key: 'type_round',
		},
		{
			title: 'ชื่อ',
			dataIndex: 'citizen_id',
			key: 'citizen_id',
		},
	]

	return <Table columns={columns} dataSource={registers} rowKey='id' />
}
