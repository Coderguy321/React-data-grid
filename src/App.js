import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, { method: "GET" })
      .then(response => response.json())
      .then(posts => {
        this.setState({ posts: posts });
      });
  }

  onDelete = props => {
    const index = this.state.posts.findIndex(
      post => post.id === props.original.id
    );

    console.log(index);
    const newPosts = this.state.posts.filter(function(value) {
      return value.index !== index + 1;
    });

    this.setState({
      posts: newPosts
    });
  };
  render() {
    const columns = [
      {
        Header: "USER ID",
        accessor: "userId",
        width: 100
      },
      {
        Header: "ID",
        accessor: "id",
        style: {
          textAlign: "center"
        },
        width: 150,
        maxwidth: 160,
        minwidth: 100
      },
      {
        Header: "BODY",
        accessor: "body",
        sortable: false,
        filterable: false
      },
      {
        Header: "Actions",
        Cell: props => {
          return (
            <button
              onClick={() => this.onDelete(props)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              DELETE
            </button>
          );
        }
      }
    ];
    return (
      <ReactTable
        columns={columns}
        data={this.state.posts}
        filterable
        defaultPageSize={12}
        showPaginationTop
        // showPagination={false}
      />
    );
  }
}

export default App;
