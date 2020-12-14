import axios from '../../configs/axios'
import { useState, useEffect } from 'react'
import { Table } from 'antd'

export default function HomeDisplay() {
	const [registers, setRegisters] = useState([])
	const path = '/registers/home'
	const prefixDescription = {
		'001': 'นาย',
		'002': 'นาง',
		'003': 'นางสาว',
	}

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
			align: 'center',
			render: (record) => {
				return <div className='data-text'>{`${record.name}`}</div>
			},
		},
		{
			title: 'ชื่อผู้เข้าอบรม',
			dataIndex: 'Person',
			key: 'citizen_id',
			align: 'center',
			render: (record) => {
				return (
					<div className='data-text'>
						{`${prefixDescription[record.prefix]}${record.give_name} ${
							record.family_name
						}`}
					</div>
				)
			},
		},
		{
			title: 'ชื่อเล่น',
			dataIndex: 'Person',
			key: 'nickname',
			align: 'center',
			render: (record) => {
				return <div className='data-code'>{`${record.nickname}`}</div>
			},
		},
		{
			title: 'โทรศัพท์มือถือ',
			dataIndex: 'Person',
			key: 'mobile_phone',
			align: 'center',
			render: (record) => {
				return <div className='data-code'>{`${record.mobile_phone}`}</div>
			},
		},
		{
			title: 'อีเมล์',
			dataIndex: 'Person',
			key: 'email',
			align: 'center',
			render: (record) => {
				return record.email ? (
					<div className='data-text'>{`${record.email}`}</div>
				) : null
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
