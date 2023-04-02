import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Table } from "antd";

class BomPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      bomData: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log("bomPage id is ", id)

    // Example data:
    const exampleBomData = [
      {
        id: 1,
        category: 'Electronics',
        type: 'Resistor',
        size: '0603',
        apply_time: '2023-04-01 10:00:00',
        duration: '1 day',
        price: 0.02,
        quantity: 100,
      },
      {
        id: 2,
        category: 'Electronics',
        type: 'Capacitor',
        size: '0805',
        apply_time: '2023-04-01 10:00:00',
        duration: '1 day',
        price: 0.03,
        quantity: 50,
      },
      // Add more example data here...
    ];

    this.setState({
      bomData: exampleBomData,
    });
    
    // Fetch BOM data for the specified user ID
    // fetch(`/api/bom/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({
    //       loading: false,
    //       bomData: data,
    //     });
    //   })
    //   .catch((error) => console.error(error));
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { loading, bomData } = this.state;
    const { id } = this.props.match.params;

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

    return (
      <div>
        <h1>BOM for User ID {id}</h1>
        <button onClick={this.handleBack}>Back to User List</button>
        <Table
          loading={loading}
          columns={columns}
          dataSource={bomData}
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  }
}

export default withRouter(BomPage);
