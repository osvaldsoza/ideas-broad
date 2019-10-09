import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import trash from '../../src/trash.png'

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

        axios.post('http://localhost:5000/ideasbroad', ideasBroad)
            .then((res) => {
                this.props.handleGetIdeas()
            }).catch(error => console.log(error))
    }

    handleExcluirIdea = () => {
        const {
            title,
            description
        } = this.state

        const ideasBroad = {
            title,
            description,
            id: this.props.idea.id
        }

        axios.delete(`http://localhost:5000/ideasbroad/${ideasBroad.id}`)
            .then((res) => {
                this.props.handleGetIdeas()
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="broad" >
                <form onBlur={this.handleOnBlur}>
                <label>Title</label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleOnChange}
                        placeholder="Title"
                    />
                    <label>Description</label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows="4"
                        value={this.state.description}
                        onChange={this.handleOnChange}
                    />
                </form>
                <button
                    type="button"
                    class="btn btn-danger btn-block"
                    style={{ marginTop: '5px' }}
                    onClick={this.handleExcluirIdea}
                >
                    <img src={trash} />
                </button>
            </div>

        )
    }
}


export default IdeaForm