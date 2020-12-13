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
			render: (record) => {
				return <span>{`${record.name}`}</span>
			},
		},
		{
			title: 'ผู้เข้ารับการอบรม',
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
			title: '',
			dataIndex: '',
			key: 'edit',
			align: 'center',
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
			title: '',
			dataIndex: '',
			key: 'delete',
			align: 'center',
			render: (record) => (
				<>
					<Popconfirm
						placement='left'
						title={'Hello'}
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
						<Input disabled={isEdit} />
					</Form.Item>
					<Form.Item label='ผู้เข้ารับการอบรม' name='citizen_id'>
						<Input disabled={isEdit} />
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
