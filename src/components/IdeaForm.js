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
        console.log(title)
        const ideasBroad = {
            title,
            description,
            id: this.props.idea.id
        }
        axios.post('https://ideasbroad.herokuapp.com/ideasbroad', ideasBroad)
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

        axios.delete(`https://ideasbroad.herokuapp.com/ideasbroad/${ideasBroad.id}`)
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
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        className="input-form"
                
                        value={this.state.title}
                        onChange={this.handleOnChange}
                        onKeyPress={this.handlePressTitle}
                        onBlur={this.handleSaveIdea}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows="4"
                        className="input-form"
                
                        value={this.state.description}
                        onChange={this.handleOnChange}
                        onKeyPress={this.handlePressDescription}
                        ref={this.descriptionRef}
                        onBlur={this.handleSaveIdea}
                    />
                </Form.Group>
                <Button
                    variant="outline-dark" size="sm" block
                    style={{ marginTop: '5px' }}
                    onClick={this.handleExcluirIdea}
                    ref={this.btnDeleteRef}
                >
                    Delete Idea
                 </Button>
            </Form>
        )
    }
}

export default IdeaForm