import React from 'react';
import ReactDOM from 'react-dom';
import EditableCell from './components/EditableCell';
import './index.css';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {},
      tempDataSource: [
        {
          key: 1,
          name: 'John Brown',
          age: 32,
          tel: '0571-22098909',
          phone: 18889898989,
          address: 'New York No. 1 Lake Park',
        }, {
          key: 2,
          name: 'Jim Green',
          tel: '0571-22098333',
          phone: 18889898888,
          age: 42,
          address: 'London No. 1 Lake Park',
        }, {
          key: 3,
          name: 'Joe Black',
          age: 32,
          tel: '0575-22098909',
          phone: 18900010002,
          address: 'Sidney No. 1 Lake Park',
        }, {
          key: 4,
          name: 'Jim Red',
          age: 18,
          tel: '0575-22098909',
          phone: 18900010002,
          address: 'London No. 2 Lake Park',
        }, {
          key: 5,
          name: 'Jake White',
          age: 18,
          tel: '0575-22098909',
          phone: 18900010002,
          address: 'Dublin No. 2 Lake Park',
        }
      ],
      columns: [
        {
          title: 'Fach',
          dataIndex: 'title',
          render: (text, record) => (
            <EditableCell
              value={text}
              onChange={this.onCellChange(record.key, 'title')}
            />
          ),
        },
        {
          title: 'benötigte Gruppen',
          dataIndex: 'groups_required',
          render: (text, record) => (
            <EditableCell
              value={text}
              onChange={this.onCellChange(record.key, 'groups_required')}
            />
          ),
        },
        {
          title: 'min Stunden pro Gruppe',
          dataIndex: 'min_hours_per_group',
          render: (text, record) => (
            <EditableCell
              value={text}
              onChange={this.onCellChange(record.key, 'min_hours_per_group')}
            />
          ),
        }
      ]
    }

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      return obj;
    };

  }
  componentDidMount = () => {
    this.fetchData();
  }
  updateData = (data) => {
    this.getData({url: 'http://10.51.50.27/AUT_SFF/update_subjects.php', data: data}, (dataSource) => {
      console.log(dataSource);
      this.fetchData();
    });
  }
  fetchData = () => {
    this.getData({url: 'http://10.51.50.27/AUT_SFF/get_subjects.php'}, (dataSource) => {
      console.log(dataSource);
      this.setState({ dataSource });
    });
  }
  getData = (obj, func) => {
    fetch(obj.url, {
        method: 'POST',
        body: JSON.stringify(obj.data),
      }
    )
    .then((response) => response.json())
    .then((responseJson) => {
      func(responseJson);
    })
    .catch((error) => {
      func(responseJson);
      console.error(error);
    });
  }
  onCellChange = (key, dataIndex) => {
    return (value) => {
      const temp = this.state.dataSource.subjects;
      const target = temp.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
      }
      const dataSource = this.state.dataSource;
      dataSource.subjects = temp;
      this.setState({ dataSource });
      this.updateData(this.state.dataSource);
      console.log(this.state.dataSource);
    };
  }
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  handleAdd = () => {
    const { dataSource } = this.state;
    const count = ''+(dataSource.subjects.length+1);
    const tempData = this.state.dataSource;
    const newData = {
      id: count,
      title: "",
      groups_required: "",
      min_hours_per_group: "",
      lessons: []
    };
    tempData.subjects.push(newData);
    this.setState({
      dataSource: tempData
    });
    console.log(this.state.dataSource);
  }
  render() {
    const { columns, dataSource } = this.state;
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered rowKey={'id'} dataSource={dataSource.subjects} columns={columns} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));