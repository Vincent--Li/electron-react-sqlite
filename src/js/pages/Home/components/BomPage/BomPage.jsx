import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Typography } from "antd";

const { Title } = Typography;

const columns = [
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Apply Time",
    dataIndex: "apply_time",
    key: "apply_time",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
];

const BomPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [bomData, setBomData] = useState([]);

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const fetchBomData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/bom/${id}`);
        const data = await response.json();
        setBomData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBomData();
  }, [id]);

  return (
    <>
      <Title level={2}>Bill of Materials for User ID: {id}</Title>
      <button onClick={handleBack}>Back to User List</button>
      <Table
        columns={columns}
        dataSource={bomData}
        loading={loading}
        rowKey="id"
      />
    </>
  );
};

export default BomPage;
