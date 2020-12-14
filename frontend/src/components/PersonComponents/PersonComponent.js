import { PlusOutlined } from '@ant-design/icons'
import {
	Button,
	Form,
	Popconfirm,
	Row,
	Table,
	Tooltip,
	notification,
	Input,
	Select,
} from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { useEffect, useState } from 'react'
import axios from '../../configs/axios'

export default function PersonComponent() {
	const [dataSource, setDataSource] = useState()
	const [visible, setVisible] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [form] = Form.useForm()
	const { Option } = Select
	const path = '/persons'
	const rowKey = 'citizen_id'
	const notificationDuration = 2
	const notificationPlacement = 'bottomRight'

	const prefixDescription = {
		'001': 'นาย',
		'002': 'นาง',
		'003': 'นางสาว',
	}

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
			title: 'เลขประจำตัว',
			dataIndex: 'citizen_id',
			key: 'citizen_id',
			align: 'center',
			sorter: (a, b) => a.citizen_id.localeCompare(b.citizen_id),
			sortDirections: ['descend'],
		},
		{
			title: 'คำนำหน้าชื่อ',
			dataIndex: 'prefix',
			key: 'prefix',
			align: 'center',
			render: (value) => {
				return value ? <>{`${prefixDescription[value]}`}</> : null
			},
		},
		{
			title: 'ชื่อ',
			dataIndex: 'give_name',
			key: 'give_name',
			align: 'center',
		},
		{
			title: 'นามสกุล',
			dataIndex: 'family_name',
			key: 'family_name',
			align: 'center',
		},
		{
			title: 'ชื่อเล่น',
			dataIndex: 'nickname',
			key: 'nickname',
			align: 'center',
		},
		{
			title: 'โทรศัพท์มือถือ',
			dataIndex: 'mobile_phone',
			key: 'mobile_phone',
			align: 'center',
		},
		{
			title: 'อีเมล์',
			dataIndex: 'email',
			key: 'email',
			align: 'center',
		},
		{
			title: '',
			dataIndex: '',
			key: 'edit',
			align: 'center',
			render: (record) => (
				<>
					<Button
						onClick={() => {
							setIsEdit(true)
							showModal()
							form.setFieldsValue({
								...record,
							})
						}}
						className='warn-button'
					>
						Edit
					</Button>
				</>
			),
		},
		{
			title: '',
			dataIndex: '',
			key: 'delete',
			align: 'center',
			render: (record) => (
				<>
					<Popconfirm
						placement='left'
						title={() => {
							return `ยืนยันการลบข้อมูล ${prefixDescription[record.prefix]}${
								record.give_name
							} ${record.family_name}`
						}}
						onConfirm={() => {
							deleteRecord(record.citizen_id)
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
				title='บันทึกข้อมูลผู้เข้าอบรม'
				okText={isEdit ? 'Edit' : 'Create'}
				cancelText='Cancel'
				onOk={() => {
					form
						.validateFields()
						.then(() => {
							if (isEdit) {
								updateRecord(form.getFieldValue('citizen_id'))
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
						label='เลขประจำตัว'
						name='citizen_id'
						rules={[
							{ required: true, message: 'ต้องระบุเลขประจำตัว' },
							{
								pattern: /^[0-9]{13}$/,
								message: 'เลขประจำตัวต้องเป็นตัวเลขและมี 13หลัก เท่านั้น',
							},
						]}
					>
						<Input disabled={isEdit} />
					</Form.Item>
					<Form.Item
						label='คำนำหน้าชื่อ'
						name='prefix'
						rules={[{ required: true, message: 'ต้องระบุคำนำหน้าชื่อ' }]}
					>
						<Select>
							<Option value='001'>นาย</Option>
							<Option value='002'>นาง</Option>
							<Option value='003'>นางสาว</Option>
						</Select>
					</Form.Item>
					<Form.Item
						label='ชื่อ'
						name='give_name'
						rules={[{ required: true, message: 'ต้องระบุชื่อ' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='นามสกุล'
						name='family_name'
						rules={[{ required: true, message: 'ต้องระบุนามสกุล' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='ชื่อเล่น'
						name='nickname'
						rules={[{ required: true, message: 'ต้องระบุชื่อเล่น' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='โทรศัพท์มือถือ'
						name='mobile_phone'
						rules={[
							{ required: true, message: 'ต้องระบุโทรศัพท์มือถือ' },
							{
								pattern: /^[0-9]{10}$/,
								message: 'โทรศัพท์มือต้องเป็นตัวเลขและมี 10 หลัก',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label='อีเมล์'
						name='email'
						rules={[{ type: 'email', message: 'รูปแบบอีเมล์ไม่ถูกต้อง' }]}
					>
						<Input />
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
