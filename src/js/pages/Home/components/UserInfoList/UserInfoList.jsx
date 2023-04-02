import React, { useState, useEffect } from "react";
import { Table, Input, Button, Divider, Form, Modal, Select } from "antd";
import EditUserModal from "../EditUserModal";
import { useHistory } from "react-router-dom";


const { Search } = Input;

const initialData = [
  {
    key: "0",
    username: "John Doe",
    age: 30,
    gender: "Male",
    usercode: "JD001",
  },
];

function UserInfoList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useHistory();

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "id",
      render: (text, record) => <a onClick={() => handleUserClick(record)}>{text}</a>,

    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "UserCode",
      dataIndex: "usercode",
    },
    {
      title: "Action",
      render: (text, record) => (
        <span>
          <a onClick={() => handleShowEditModal(record)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => handleDeleteUser(record)}>Delete</a>
        </span>
      ),
    },
  ];

  const handleUserClick = (record) => {
    history.push(`/bom/${record.id}`);
  }

  useEffect(() => {
    async function fetchAndSetUsers() {
      const data = await api_todos.fetchUsers({
        username: filter.username,
        pageSize,
        pageNumber,
      });
      console.log("init fetchData", data);
      if(data) {
        setUsers([...data]);
      }
    }
    fetchAndSetUsers();
  }, [filter]);

  const handleSearch = (value) => {
    setFilter({ ...filter, username: value });
  };

  const handleShowEditModal = (user) => {
    setEditingUser(user);
    setIsEditModalVisible(true);
  };

  const handleHideEditModal = () => {
    setEditingUser(null);
    setIsEditModalVisible(false);
  };

  const handleSaveUser = (user) => {};

  const handleCreateUser = () => {
    form
      .validateFields()
      .then((values) => {
        // Send a POST request to your API to create a new user
        console.log("values to create", values)
        api_todos.createUser(values).then(async () => {
          // Reset the form fields and close the modal
          form.resetFields();
          setIsModalVisible(false);
          // Reload the user list to show the new user
          const data = await api_todos.fetchUsers({
            username: filter.username,
            pageSize,
            pageNumber,
          });
          console.log("fetchsUsers datais ", data)
          if(data) {
            setUsers([...data]);
          }
        });
      })
      .catch((error) => {
        console.error("Failed to create user:", error);
      });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by username"
          style={{ width: 200 }}
          onSearch={handleSearch}
        />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Create User
        </Button>
      </div>
      <EditUserModal
        user={editingUser}
        visible={isEditModalVisible}
        onCancel={handleHideEditModal}
        onSave={handleSaveUser}
      />
      <Modal
        title="Create User"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleCreateUser}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item name="sex" label="Sex" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="M">Male</Select.Option>
              <Select.Option value="F">Female</Select.Option>
              <Select.Option value="O">Other</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        columns={columns}
        dataSource={users}
        pagination={{
          pageSize: pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          defaultPageSize: pageSize,
          pageSizeOptions: ["10"],
        }}
      />
    </div>
  );
}

export default UserInfoList;