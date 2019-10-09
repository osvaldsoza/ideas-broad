import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
class Idea extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.idea.title,
            description: this.props.idea.description
        }
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <div className="broad" >
                <Form.Control
                    type="text"
                    value={this.state.title}
                    name="title"
                    onChange={this.handleOnChange}
                    placeholder="Title"
                />
                <Form.Control
                    as="textarea"
                    rows="4"
                    value={this.state.description}
                    name="description"
                    onChange={this.handleOnChange}
                />
            </div>
        )
    }
}


export default Idea