import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'
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

        this.btnDeleteRef = React.createRef()
        this.descriptionRef = React.createRef()
        this.titleRef = React.createRef()
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSaveIdea = () => {
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

        axios.delete(`http://localhost:8080/ideasbroad/${ideasBroad.id}`)
            .then((res) => {
                this.props.handleGetIdeas()
            }).catch(error => console.log(error))
    }

    handlePressTitle = (e) => {
        if (e.which === 13 && this.state.title !== '') {
            if (this.descriptionRef.current) {
                this.descriptionRef.current.focus();
            }
            this.handleSaveIdea();
        }
    }

    handlePressDescription = (e) => {
        if (e.which === 13 && this.state.description !== '') {
            if (this.btnDeleteRef.current) {
                this.btnDeleteRef.current.focus()
            }
            this.handleSaveIdea();
        }
    }

    render() {
        return (
            <div className="broad" >
                <form onBlur={this.handleSaveIdea}>
                    <label>Title</label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleOnChange}
                        onKeyPress={this.handlePressTitle}
                        ref={this.titleRef}
                        placeholder="Title"
                    />
                    <label>Description</label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows="4"
                        value={this.state.description}
                        onChange={this.handleOnChange}
                        onKeyPress={this.handlePressDescription}
                        ref={this.descriptionRef}
                    />
                </form>

                <Button
                    variant="outline-danger" size="sm" block
                    style={{ marginTop: '5px' }}
                    onClick={this.handleExcluirIdea}
                    ref={this.btnDeleteRef}
                >
                    Delete Idea
                 </Button>
            </div>
        )
    }
}


export default IdeaForm