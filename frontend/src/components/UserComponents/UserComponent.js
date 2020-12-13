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
			title: 'ผู้ใช้งาน',
			dataIndex: 'username',
			key: 'username',
			sorter: (a, b) => a.type_round.localeCompare(b.type_round),
			sortDirections: ['descend'],
		},
		{
			title: 'ชื่อ',
			dataIndex: 'name',
			key: 'name',
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
							form.setFieldsValue(record)
						}}
						danger
					>
						Edit
					</Button>
					<Popconfirm
						placement='left'
						title={'Hello'}
						onConfirm={() => {
							deleteRecord(record.id)
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
				onOk={(record) => {
					if (isEdit) {
						updateRecord(form.getFieldValue('id'))
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
						name='username'
						label='Username'
						rules={[{ required: true }]}
					>
						<Input disabled={isEdit} />
					</Form.Item>
					<Form.Item
						name='password'
						label='Password'
						rules={[{ required: true }]}
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
