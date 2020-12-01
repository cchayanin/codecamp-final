import axios from '../../configs/axios'
import { useEffect, useState } from 'react'
import { Table } from 'antd'

export default function CourseComponent() {
	const [courses, setCourses] = useState([])
	const fetchCourses = async () => {
		const httpResponse = await axios.get('/courses')
		setCourses(httpResponse.data)
	}

	useEffect(() => {
		fetchCourses()
	}, [])

	const columns = [
		{
			title: 'รุ่น',
			dataIndex: 'type_round',
			key: 'type_round',
		},
		{
			title: 'ชื่อโครงการ',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'วันที่เริ่ม',
			dataIndex: 'start_date',
			key: 'start_date',
		},
		{
			title: 'วันที่จบ',
			dataIndex: 'end_date',
			key: 'end_date',
		},
	]

	return <Table columns={columns} dataSource={courses} rowKey='type_round' />
}
