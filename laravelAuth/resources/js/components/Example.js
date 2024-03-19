import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
export default class Example extends Component {
    constructor() {
        super()
        this.state = {
            posts: [] //response of API into post state
        }
    }
    loadPost() {
        axios.get('http://127.0.0.1:8000/api/posts').then((response) => {
            this.setState({
                posts: response.data
            })
        })
    }
    componentWillMount() {
        this.loadPost();
    }
    render() {
        let posts = this.state.posts.map((post) => {
            return (
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2"> Edit </Button>
                        <Button color="danger" size="sm" className="mr-2"> Delete </Button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="container">
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts}
                    </tbody>
 
                </Table>
            </div>
        );
    }
}
 
if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}