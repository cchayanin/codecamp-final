import { PlusOutlined } from '@ant-design/icons'
import {
	Button,
	Row,
	Tooltip,
	Form,
	Modal,
	notification,
	Popconfirm,
	Table,
	Input,
	DatePicker,
} from 'antd'
import { useEffect, useState } from 'react'
import axios from '../../configs/axios'
import moment from 'moment'

export default function CourseComponent() {
	const [dataSource, setDataSource] = useState()
	const [visible, setVisible] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [form] = Form.useForm()
	const path = '/courses'
	const rowKey = 'type_round'
	const dateFormat = 'YYYY/MM/DD'

	const fetchData = async () => {
		const response = await axios.get(path)
		setDataSource(response.data)
	}

	const createRecord = async () => {
		await axios.post(path, form.getFieldsValue())
		form.resetFields()
		fetchData()
	}

	const updateRecord = async (id) => {
		await axios.patch(`${path}/${id}`, form.getFieldsValue())
		form.resetFields()
		fetchData()
	}

	const deleteRecord = async (id) => {
		await axios.delete(`${path}/${id}`)
		form.resetFields()
		fetchData()
	}

	useEffect(() => {
		fetchData()
	}, [])

	const showModal = () => {
		setVisible(true)
	}
	const hideModal = () => {
		setVisible(false)
	}

	const openNotification = () => {
		notification.open({
			message: 'Notification',
			description: 'Description',
			duration: 1.5,
			placement: 'bottomRight',
		})
	}

	const columns = [
		{
			title: 'รุ่นที่',
			dataIndex: 'type_round',
			key: 'type_round',
			sorter: (a, b) => a.type_round.localeCompare(b.type_round),
			sortDirections: ['descend'],
		},
		{
			title: 'ชื่อโครงการอบรม',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'วันที่เริ่ม',
			dataIndex: 'start_date',
			key: 'start_date',
		},
		{
			title: 'วันที่สิ้นสุด',
			dataIndex: 'end_date',
			key: 'end_date',
		},
		{
			title: '',
			dataIndex: '',
			key: 'edit',
			render: (record) => (
				<>
					<Button
						onClick={() => {
							setIsEdit(true)
							showModal()
							form.setFieldsValue({
								...record,
								start_date: moment(record.start_date).isValid()
									? moment(record.start_date)
									: null,
								end_date: moment(record.end_date).isValid()
									? moment(record.end_date)
									: null,
							})
						}}
						danger
					>
						Edit
					</Button>
					<Popconfirm
						placement='left'
						title={'Hello'}
						onConfirm={() => {
							deleteRecord(record.type_round)
							openNotification()
						}}
						okText='ตกลง'
						cancelText='ยกเลิก'
					>
						<Button danger>Delete</Button>
					</Popconfirm>
				</>
			),
		},
	]

	return (
		<>
			<Row justify='end'>
				<Tooltip placement='left' title='เพิ่มข้อมูล'>
					<Button
						type='primary'
						shape='circle'
						icon={<PlusOutlined />}
						onClick={showModal}
					></Button>
				</Tooltip>
			</Row>
			<Modal
				visible={visible}
				forceRender={true}
				title='Create new'
				okText='Create'
				cancelText='Cancel'
				onOk={(record) => {
					if (isEdit) {
						updateRecord(form.getFieldValue('type_round'))
					} else {
						createRecord()
					}

					setIsEdit(false)
					form.resetFields()
					hideModal()
				}}
				onCancel={() => {
					setIsEdit(false)
					form.resetFields()
					hideModal()
				}}
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						name='type_round'
						label='รุ่นที่'
						rules={[{ required: true }]}
					>
						<Input disabled={isEdit} />
					</Form.Item>
					<Form.Item name='name' label='ชื่อโครงการอบรม'>
						<Input />
					</Form.Item>
					<Form.Item name='start_date' label='วันที่เริ่มต้น'>
						<DatePicker format={dateFormat} />
					</Form.Item>
					<Form.Item name='end_date' label='วันที่สิ้นสุด'>
						<DatePicker format={dateFormat} />
					</Form.Item>
				</Form>
			</Modal>
			<Table
				columns={columns}
				dataSource={dataSource}
				rowKey={rowKey}
				bordered
			/>
		</>
	)
}
