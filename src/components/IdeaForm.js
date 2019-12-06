import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'


const IdeaForm = ({ idea, handleGetIdeas, url }) => {
    const [title, setTitle] = useState(idea.title)
    const [description, setDescription] = useState(idea.description)

    const btnDeleteRef = React.createRef()
    const descriptionRef = React.createRef()

    const handleSaveIdea = () => {
        const ideas = {
            title,
            description,
            id: idea.id
        }
        axios.post(url, ideas)
            .then(() => {
                handleGetIdeas()
            }).catch(error => console.log(error))
    }

    const handleExcluirIdea = () => {
        const id = idea.id
        axios.delete(`${url}/${id}`)
            .then(() => {
                handleGetIdeas()
            }).catch(error => console.log(error))
    }

    const handlePressTitle = (e) => {
        if (e.which === 13 && title !== '') {
            if (descriptionRef.current) {
                descriptionRef.current.focus();
            }
            handleSaveIdea();
        }
    }

    const handlePressDescription = (e) => {
        if (e.which === 13 && description !== '') {
            if (btnDeleteRef.current) {
                btnDeleteRef.current.focus()
            }
            handleSaveIdea();
        }
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    className="input-form"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyPress={handlePressTitle}
                    onBlur={handleSaveIdea}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    rows="4"
                    className="input-form"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    onKeyPress={handlePressDescription}
                    ref={descriptionRef}
                    onBlur={handleSaveIdea}
                />
            </Form.Group>
            <Button
                variant="outline-dark" size="sm" block
                style={{ marginTop: '5px' }}
                onClick={handleExcluirIdea}
                ref={btnDeleteRef}
            >
                Delete Idea
            </Button>
        </Form>
    )
}

IdeaForm.propTypes = {
    idea: PropTypes.object,
    handleGetIdeas: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
}
IdeaForm.defaultProps = {
    idea: {}
}

export default IdeaForm