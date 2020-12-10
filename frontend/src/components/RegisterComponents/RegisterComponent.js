import { PlusOutlined } from '@ant-design/icons'
import {
	Form,
	notification,
	Input,
	Table,
	Tooltip,
	Button,
	Row,
	Checkbox,
	Popconfirm,
} from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { useEffect, useState } from 'react'
import axios from '../../configs/axios'

export default function RegisterComponent() {
	const [dataSource, setDataSource] = useState()
	const [visible, setVisible] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [form] = Form.useForm()
	const path = '/registers'
	// const rowKey = 'citizen_id'

	const fetchData = async () => {
		const response = await axios.get(path)
		setDataSource(response.data)
	}

	const createRecord = async () => {
		await axios.post(path, form.getFieldsValue())
		form.resetFields()
		fetchData()
	}

	const updateRecord = async (id, citizen_id) => {
		await axios.patch(`${path}/${id}/${citizen_id}`, form.getFieldsValue())
		form.resetFields()
		fetchData()
	}

	const deleteRecord = async (id, citizen_id) => {
		await axios.delete(`${path}/${id}/${citizen_id}`)
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
		},
		{
			title: 'ผู้เข้ารับการอบรม',
			dataIndex: 'citizen_id',
			key: 'citizen_id',
		},
		{
			title: 'ค่าธรรมเนียม',
			dataIndex: 'is_paid',
			key: 'is_paid',
			render: (is_paid) => {
				return (
					<>
						<Checkbox checked={is_paid}></Checkbox>
					</>
				)
			},
		},
		{
			title: 'ผู้สนับสนุน',
			dataIndex: 'is_sponsor',
			key: 'is_sponsor',
			render: (is_sponsor) => {
				return (
					<>
						<Checkbox checked={is_sponsor}></Checkbox>
					</>
				)
			},
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
							deleteRecord(record.type_round, record.citizen_id)
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
						updateRecord(
							form.getFieldValue('type_round'),
							form.getFieldValue('citizen_id'),
						)
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
					<Form.Item label='รุ่นที่' name='type_round'>
						<Input />
					</Form.Item>
					<Form.Item label='ผู้เข้ารับการอบรม' name='citizen_id'>
						<Input />
					</Form.Item>
					<Form.Item
						label='ค่าธรรมเนียม'
						name='is_paid'
						valuePropName='checked'
					>
						<Checkbox></Checkbox>
					</Form.Item>
					<Form.Item
						label='ผู้สนับสนุน'
						name='is_sponsor'
						valuePropName='checked'
					>
						<Checkbox></Checkbox>
					</Form.Item>
				</Form>
			</Modal>
			<Table
				columns={columns}
				dataSource={dataSource}
				rowKey={(data) => {
					return data.type_round + data.citizen_id
				}}
				bordered
			/>
		</>
	)
}
