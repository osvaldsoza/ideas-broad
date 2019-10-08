import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

class IdeaForm extends Component {
    static propTypes = {
        idea: PropTypes.object
    }
    static defaultProps = {
        idea: {}
    }

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

    handleOnBlur = () => {
        const {
            title,
            description
        } = this.state

        const ideasBroad = {
            title,
            description,
            id: this.props.idea.id
        }

        axios.post('http://localhost:8080/ideasbroad', ideasBroad)
            .then((res) => {
                this.handleGetIdeas()
            }).catch(error => console.log(error))
    }

    render() {
        const { title, description } = this.state
        return (
            <div className="broad" >
                <form onBlur={this.handleOnBlur}>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={this.handleOnChange}
                    />
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows="4"
                        value={description}
                        onChange={this.handleOnChange}
                    />
                </form>
            </div>

        )
    }
}


export default IdeaForm