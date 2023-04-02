import { Modal, Form, Input, Select, InputNumber } from 'antd';;
import React, { useEffect } from 'react';

const { Option } = Select;

function EditUserModal({ visible, onCancel, user, onSave }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({ ...user, ...values });
    });
  };

  return (
    <Modal
      open={visible}
      title="Edit User"
      onCancel={onCancel}
      onOk={handleSave}
      forceRender 
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter a username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please enter an age" }]}
        >
          <InputNumber min={1} max={120} />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select a gender" }]}
        >
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditUserModal;
