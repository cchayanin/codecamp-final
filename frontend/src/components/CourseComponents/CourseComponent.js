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
	const notificationDuration = 2
	const notificationPlacement = 'bottomRight'

	const fetchData = async () => {
		const response = await axios.get(path)
		setDataSource(response.data)
	}

	const createRecord = async () => {
		await axios
			.post(path, form.getFieldsValue())
			.then(() => {
				notification.success({
					message: 'ข้อมูลถูกเพิ่มเรียบร้อยแล้ว',
					duration: notificationDuration,
					placement: notificationPlacement,
				})
			})
			.catch((error) => {
				notification.error({
					message: 'การเพิ่มข้อมูลผิดพลาด',
					duration: notificationDuration,
					placement: notificationPlacement,
				})
			})
		form.resetFields()
		fetchData()
	}

	const updateRecord = async (id) => {
		await axios
			.patch(`${path}/${id}`, form.getFieldsValue())
			.then(() => {
				notification.success({
					message: 'ข้อมูลถูกแก้ไขเรียบร้อยแล้ว',
					duration: notificationDuration,
					placement: notificationPlacement,
				})
			})
			.catch((error) => {
				notification.error({
					message: 'การแก้ไขข้อมูลผิดพลาด',
					duration: notificationDuration,
					placement: notificationPlacement,
				})
			})
		form.resetFields()
		fetchData()
	}

	const deleteRecord = async (id) => {
		await axios
			.delete(`${path}/${id}`)
			.then(() => {
				notification.success({
					message: 'ข้อมูลถูกลบเรียบร้อยแล้ว',
					duration: notificationDuration,
					placement: notificationPlacement,
				})
			})
			.catch((error) => {
				notification.error({
					message: 'การลบข้อมูลผิดพลาด',
					duration: notificationDuration,
					placement: notificationPlacement,
				})
			})
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

	const columns = [
		{
			title: 'รหัสโครงการ',
			dataIndex: 'type_round',
			key: 'type_round',
			align: 'center',
			sorter: (a, b) => a.type_round.localeCompare(b.type_round),
			sortDirections: ['descend'],
		},
		{
			title: 'ชื่อโครงการอบรม',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (value) => {
				return value ? <div className='data-text'>{`${value}`}</div> : null
			},
		},
		{
			title: 'วันที่เริ่ม',
			dataIndex: 'start_date',
			key: 'start_date',
			align: 'center',
		},
		{
			title: 'วันที่สิ้นสุด',
			dataIndex: 'end_date',
			key: 'end_date',
			align: 'center',
		},
		{
			title: 'แก้ไข',
			dataIndex: '',
			key: 'edit',
			align: 'center',
			width: '15%',
			render: (record) => (
				<>
					<Button
						className='warn-button'
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
				</>
			),
		},
		{
			title: 'ลบ',
			dataIndex: '',
			key: 'delete',
			align: 'center',
			width: '15%',
			render: (record) => (
				<>
					<Popconfirm
						placement='left'
						title={() => {
							return `ยืนยันการลบข้อมูล ${record.name}`
						}}
						onConfirm={() => {
							deleteRecord(record.type_round)
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
						size='large'
						icon={<PlusOutlined />}
						onClick={showModal}
					></Button>
				</Tooltip>
			</Row>
			<Modal
				visible={visible}
				forceRender={true}
				title='บันทึกข้อมูลการอบรม'
				okText={isEdit ? 'Edit' : 'Create'}
				cancelText='Cancel'
				onOk={() => {
					form
						.validateFields()
						.then(() => {
							if (isEdit) {
								updateRecord(form.getFieldValue('type_round'))
							} else {
								createRecord()
							}

							setIsEdit(false)
							form.resetFields()
							hideModal()
						})
						.catch((info) => {})
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
						label='รหัสโครงการ'
						rules={[
							{ required: true, message: 'ต้องระบุรหัสโครงการ' },
							{ len: 4, message: 'รหัสโครงการต้องเท่ากับ 4 ตัวอักษร' },
						]}
					>
						<Input disabled={isEdit} />
					</Form.Item>
					<Form.Item
						name='name'
						label='ชื่อโครงการอบรม'
						rules={[{ required: true, message: 'ต้องระบุชื่อโครงการอบรม' }]}
					>
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
				className='table-striped-rows'
				columns={columns}
				dataSource={dataSource}
				rowKey={rowKey}
				bordered
			/>
		</>
	)
}
