import { PlusOutlined } from '@ant-design/icons'
import {
	Form,
	notification,
	Table,
	Tooltip,
	Button,
	Row,
	Checkbox,
	Popconfirm,
	Select,
} from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { useEffect, useState } from 'react'
import axios from '../../configs/axios'

export default function RegisterComponent() {
	const [dataSource, setDataSource] = useState()
	const [course, setCourse] = useState([])
	const [person, setPerson] = useState([])
	const [visible, setVisible] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [form] = Form.useForm()
	const { Option } = Select
	const path = '/registers'
	const notificationDuration = 2
	const notificationPlacement = 'bottomRight'

	const prefixDescription = {
		'001': 'นาย',
		'002': 'นาง',
		'003': 'นางสาว',
	}

	const fetchCourse = async () => {
		const response = await axios.get('/courses')
		const data = response.data

		const options = data.map((value) => ({
			key: value.type_round,
			value: value.type_round,
			name: value.name,
		}))
		setCourse(options)
	}

	const fetchPerson = async () => {
		const response = await axios.get('/persons')
		const data = response.data

		const options = data.map((value) => ({
			key: value.citizen_id,
			value: value.citizen_id,
			name: `${prefixDescription[value.prefix]}${value.give_name} ${
				value.family_name
			}`,
		}))
		setPerson(options)
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
					placement: 'bottomRight',
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

	const updateRecord = async (id, citizen_id) => {
		await axios
			.patch(`${path}/${id}/${citizen_id}`, form.getFieldsValue())
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

	const deleteRecord = async (id, citizen_id) => {
		await axios
			.delete(`${path}/${id}/${citizen_id}`)
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
			title: 'โครงการอบรม',
			dataIndex: 'Course',
			key: 'type_round',
			align: 'center',
			sorter: (a, b) => a.type_round.localeCompare(b.type_round),
			sortDirections: ['descend'],
			render: (record) => {
				return <span>{`${record.name}`}</span>
			},
		},
		{
			title: 'ผู้เข้าอบรม',
			dataIndex: 'Person',
			key: 'citizen_id',
			align: 'center',
			render: (record) => {
				return <span>{`${record.give_name} ${record.family_name}`}</span>
			},
		},
		{
			title: 'ค่าธรรมเนียม',
			dataIndex: 'is_paid',
			key: 'is_paid',
			align: 'center',
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
			align: 'center',
			render: (is_sponsor) => {
				return (
					<>
						<Checkbox checked={is_sponsor}></Checkbox>
					</>
				)
			},
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
							return `ยืนยันการลบข้อมูลการลงทะเบียน`
						}}
						onConfirm={() => {
							deleteRecord(record.type_round, record.citizen_id)
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
				title='บันทึกข้อมูลการลงทะเบียน'
				okText={isEdit ? 'Edit' : 'Create'}
				cancelText='Cancel'
				onOk={() => {
					form
						.validateFields()
						.then(() => {
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
						label='รหัสโครงการ'
						name='type_round'
						rules={[{ required: true, message: 'ต้องระบุรหัสโครงการ' }]}
					>
						<Select disabled={isEdit} onClick={fetchCourse}>
							{course.map((value) => (
								<Option key={value.key} value={value.value}>
									{value.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						label='ผู้เข้าอบรม'
						name='citizen_id'
						rules={[{ required: true, message: 'ต้องระบุผู้เข้าอบรม' }]}
					>
						<Select disabled={isEdit} onClick={fetchPerson}>
							{person.map((value) => (
								<Option key={value.key} value={value.value}>
									{value.name}
								</Option>
							))}
						</Select>
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
				className='table-striped-rows'
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
