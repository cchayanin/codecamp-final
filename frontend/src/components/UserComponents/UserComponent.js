import axios from '../../configs/axios'
import { useEffect, useState } from 'react'
import {
	Button,
	Input,
	notification,
	Popconfirm,
	Row,
	Table,
	Tooltip,
	Modal,
	Form,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export default function PersonComponent() {
	const [dataSource, setDataSource] = useState()
	const [visible, setVisible] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [form] = Form.useForm()
	const path = '/users'
	const rowKey = 'id'
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
			title: 'ผู้ใช้งาน',
			dataIndex: 'username',
			key: 'username',
			align: 'center',
			sorter: (a, b) => a.type_round.localeCompare(b.type_round),
			sortDirections: ['descend'],
		},
		{
			title: 'ชื่อผู้ใช้งาน',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
		},
		{
			title: '',
			dataIndex: '',
			key: 'edit',
			align: 'center',
			width: '15%',
			render: (record) => (
				<>
					<Button
						onClick={() => {
							setIsEdit(true)
							showModal()
							form.setFieldsValue(record)
						}}
						danger
					>
						Edit
					</Button>
				</>
			),
		},
		{
			title: '',
			dataIndex: '',
			key: 'edit',
			align: 'center',
			width: '15%',
			render: (record) => (
				<>
					<Popconfirm
						placement='left'
						title={'Hello'}
						onConfirm={() => {
							deleteRecord(record.id)
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
				title='Create new'
				okText='Create'
				cancelText='Cancel'
				onOk={() => {
					form
						.validateFields()
						.then(() => {
							if (isEdit) {
								updateRecord(form.getFieldValue('id'))
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
						name='username'
						label='Username'
						rules={[
							{ required: true, message: 'ต้องระบุ Username' },
							{
								pattern: /^[a-z]{6,12}$/,
								message:
									'ต้องเป็นตัวอักษรภาษาอังกฤษตัวพิมพ์เล็กระหว่าง 6 ถึง 12 ตัวอักษร',
							},
						]}
					>
						<Input disabled={isEdit} />
					</Form.Item>
					<Form.Item
						name='password'
						label='Password'
						rules={[
							{ required: true, message: 'ต้องระบุ Password' },
							{
								min: 6,
								max: 12,
								message: 'Password ต้องอยู่ระหว่าง 6 ถึง 12 ตัวอักษร',
							},
						]}
					>
						<Input.Password disabled={isEdit} />
					</Form.Item>
					<Form.Item
						name='confirm'
						label='Confirm Password'
						hasFeedback
						dependencies={['password']}
						rules={[
							{
								required: true,
								message: 'ต้องระบุรหัสยืนยัน Password',
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve()
									}
									return Promise.reject('Confirm Password ต้องตรงกับ Password')
								},
							}),
						]}
					>
						<Input.Password disabled={isEdit} />
					</Form.Item>
					<Form.Item name='name' label='ชื่อ'>
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
