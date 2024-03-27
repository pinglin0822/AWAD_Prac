import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
export default class Example extends Component {
    constructor() {
        super()
        this.state = {
            posts: [], //response of API into post state
            newPostModal: false,
            updatePostModal: false,
            newPostData: { title: "", content: "", user_id: "" },
            updatePostData: { id:"", title: "", content:"", user_id:"" }
        }
    }
    loadPost() {
        axios.get('http://127.0.0.1:8000/api/posts').then((response) => {
            this.setState({
                posts: response.data
            })
        })
    }
 
    addPost() {
        axios.post('http://127.0.0.1:8000/api/post',
        this.state.newPostData).then((response) => {
            let { posts } = this.state
            this.loadPost()
            this.setState({
                posts,
                newPostModal: false,
                newPostData: { title: "", content: "", user_id: "" },
 
            })
        })
    }
 
   
    componentWillMount() {
        this.loadPost();
    }
    toggleNewPostModal() {
        this.setState({ newPostModal: !this.state.newPostModal })
       
    }
 
 
    callUpdatePost(id, title, content, user_id) {
        this.setState({
            updatePostData: { id, title, content, user_id },
            updatePostModal: !this.state.updatePostModal
        })
    }
   
    updatePost() {
        let { id, title, content, user_id } = this.state.updatePostData
        axios.put('http://127.0.0.1:8000/api/post/' + this.state.updatePostData.id, {
            title, content, user_id
        }).then((response) => {
            this.loadPost()
            this.setState({ //after execution, set all states to false
                updatePostModal: false,
                updatePostData: { id: "", title: "", content: "", user_id: "" }
            })
        })
    }
    deletePost(id) {
       
        if (confirm("Do you want delete this Post?"))
        {
        axios.delete('http://127.0.0.1:8000/api/post/' + id, {
 
        }).then((response) => {
            this.loadPost()            
        })
    }
    }
    toggleUpdatePostModal() {
        this.setState({
            updatePostModal: !this.state.updatePostModal
        })
    }
    render() {
        let posts = this.state.posts.map((post) => {
            return (
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2"
                            onClick={this.callUpdatePost.bind(this,post.id, post.title, post.content, post.user_id)}>
                            Edit </Button>
                        <Button color="danger" size="sm" className="mr-2"  onClick={this.deletePost.bind(this,post.id)}> Delete </Button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="container">
                <Button color="primary" onClick={this.toggleNewPostModal.bind(this)}>Add Post</Button>
                <Modal isOpen={this.state.newPostModal} toggle={this.toggleNewPostModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewPostModal.bind(this)}> Add New Post
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                value={this.state.newPostData.title}
                                onChange={(e) => {
                                    let { newPostData } = this.state
                                    newPostData.title = e.target.value
                                    this.setState({ newPostData })
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input
                                id="content"
                                value={this.state.newPostData.content}
                                onChange={(e) => {
                                    let { newPostData } = this.state
                                    newPostData.content = e.target.value
                                    this.setState({ newPostData })
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="user_id">User ID</Label>
                            <Input
                                id="user_id"
                                value={this.state.newPostData.user_id}
                                onChange={(e) => {
                                    let { newPostData } = this.state
                                    newPostData.user_id = e.target.value
                                    this.setState({ newPostData })
                                }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addPost.bind(this)}> Add Post </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewPostModal.bind(this)}> Cancel </Button>
                    </ModalFooter>
                </Modal>
             
                <Modal isOpen={this.state.updatePostModal} toggle={this.toggleUpdatePostModal.bind(this)}>
                    <ModalHeader toggle={this.toggleUpdatePostModal.bind(this)}>Update Post
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                value={this.state.updatePostData.title}
                                onChange={(e) => {
                                    let { updatePostData } = this.state
                                    updatePostData.title = e.target.value
                                    this.setState({ updatePostData })
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input
                                id="content"
                                value={this.state.updatePostData.content}
                                onChange={(e) => {
                                    let { updatePostData } = this.state
                                    updatePostData.content = e.target.value
                                    this.setState({ updatePostData })
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="user_id">User ID</Label>
                            <Input
                                id="user_id"
                                value={this.state.updatePostData.user_id}
                                onChange={(e) => {
                                    let { updatePostData } = this.state
                                    updatePostData.user_id = e.target.value
                                    this.setState({ updatePostData })
                                }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updatePost.bind(this)}> Edit Post </Button>{' '}
                        <Button color="secondary" onClick={this.toggleUpdatePostModal.bind(this)}> Cancel </Button>
                    </ModalFooter>
                </Modal>
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