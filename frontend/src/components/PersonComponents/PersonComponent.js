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
			title: 'หมายเลขประจำตัวประชาชน',
			dataIndex: 'citizen_id',
			key: 'citizen_id',
			sorter: (a, b) => a.citizen_id.localeCompare(b.citizen_id),
		},
		{
			title: 'คำนำหน้าชื่อ',
			dataIndex: 'prefix',
			key: 'prefix',
		},
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
		{
			title: 'หมายเลขโทรศัพท์มือถือ',
			dataIndex: 'mobile_phone',
			key: 'mobile_phone',
		},
		{
			title: 'อีเมล์',
			dataIndex: 'email',
			key: 'email',
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
							deleteRecord(record.citizen_id)
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
						updateRecord(form.getFieldValue('citizen_id'))
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
						label='หมายเลขประจำตัวประชาชน'
						name='citizen_id'
						rules={[{ required: true }]}
					>
						<Input disabled={isEdit} />
					</Form.Item>
					<Form.Item label='คำนำหน้าชื่อ' name='prefix'>
						<Select>
							<Option value='นาย'>นาย</Option>
							<Option value='นาง'>นาง</Option>
							<Option value='นางสาว'>นางสาว</Option>
						</Select>
					</Form.Item>
					<Form.Item label='ชื่อ' name='give_name'>
						<Input />
					</Form.Item>
					<Form.Item label='นามสกุล' name='family_name'>
						<Input />
					</Form.Item>
					<Form.Item label='หมายเลขโทรศัพท์มือถือ' name='mobile_phone'>
						<Input />
					</Form.Item>
					<Form.Item label='อีเมล์' name='email'>
						<Input />
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
