import React, { Component } from 'react';
import ReactTable from 'react-table'
import { CustomItems } from './components/Custom.js';
import './App.css';
import 'react-table/react-table.css';
import { postRequest } from './functions/Requests.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      requestData: null,
      tableData: null,
    };
  }

  componentDidMount(){
    postRequest(data => {
      this.setState({tableData: data.subjects,requestData: data, isLoading: false});
    });
  }

  generateData(data){
    var temp = [];
    for (var i = 0; i < data.subjects.length; i++){
      for (var j = 0; j < data.subjects[i].lessons.length; j++){
        temp.push({title: data.subjects[i].title, short: data.subjects[i].lessons[j].short, hours: data.subjects[i].lessons[j].hours});
      }
    }
    return temp;
  }

  render() {
    if (this.state.isLoading) return null;
    if (!this.state.isLoading){

      const columns = [{
        Header: 'Subject',
        accessor: 'title' // String-based value accessors!
      }, {
        Header: 'Data',
        accessor: 'lessons',
        Cell: props => <CustomItems data={props.value}/>
      }];

      return (
        <div className="App">
          <ReactTable
            className="-highlight -striped"
            data={this.state.tableData}
            columns={columns}
          />
        </div>
      );
    }
  }
}

export default App;
