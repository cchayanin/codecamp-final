import axios from '../../configs/axios'
import { useState, useEffect } from 'react'
import { Table } from 'antd'

export default function HomeDisplay() {
	const [registers, setRegisters] = useState([])
	const path = '/registers'

	const fetchRegisters = async () => {
		const httpResponse = await axios.get(path)

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
			title: 'ชื่อโครงการอบรม',
			dataIndex: 'Course',
			key: 'type_round',
			width: '20%',
			align: 'center',
			render: (record) => {
				return <div className='data-text'>{`${record.name}`}</div>
			},
		},
		{
			title: 'ชื่อผู้เข้าอบรม',
			dataIndex: 'Person',
			key: 'citizen_id',
			width: '20%',
			align: 'center',
			render: (record) => {
				return (
					<div className='data-text'>{`${record.prefix}${record.give_name} ${record.family_name}`}</div>
				)
			},
		},
		{
			title: 'ชื่อผู้เล่น',
			dataIndex: 'Person',
			key: 'nickname',
			width: '20%',
			align: 'center',
			render: (record) => {
				return <div className='data-code'>{`${record.nickname}`}</div>
			},
		},
		{
			title: 'โทรศัพท์มือถือ',
			dataIndex: 'Person',
			key: 'mobile_phone',
			width: '15%',
			align: 'center',
			render: (record) => {
				return <div className='data-code'>{`${record.mobile_phone}`}</div>
			},
		},
		{
			title: 'อีเมล์',
			dataIndex: 'Person',
			key: 'email',
			width: '20%',
			align: 'center',
			render: (record) => {
				return <div className='data-text'>{`${record.email}`}</div>
			},
		},
	]

	return (
		<Table
			className='table-striped-rows'
			columns={columns}
			dataSource={registers}
			rowKey='id'
			bordered
		/>
	)
}
