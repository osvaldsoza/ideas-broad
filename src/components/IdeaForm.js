import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Button, Form} from 'react-bootstrap'
import {loadIdeas, deleteIdea, saveIdea} from "../actions/Ideas";
import url from "../util/url";

const IdeaForm = (props) => {
    const [title, setTitle] = useState(props.idea.title)
    const [description, setDescription] = useState(props.idea.description)

    const btnDeleteRef = React.createRef()
    const descriptionRef = React.createRef()

    const handleSaveIdea = () => {
        const ideas = {
            title,
            description,
            id: props.idea.id
        }
        props.saveIdea(url, ideas)
    }

    const handleExcluirIdea = () => {
        const id = props.idea.id
        props.deleteIdea(id, url)
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
                style={{marginTop: '5px'}}
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
    loadIdeas:PropTypes.func.isRequired,
    deleteIdea:PropTypes.func.isRequired,
    saveIdea:PropTypes.func.isRequired
}
IdeaForm.defaultProps = {
    idea: {}
}

const mapStateToProps = state => {
    return {
        ideas: state.Ideas.ideas
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadIdeas: (url) => dispatch(loadIdeas(url)),
        deleteIdea: (id, url) => dispatch(deleteIdea(id, url)),
        saveIdea: (url, ideas) => dispatch(saveIdea(url, ideas))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IdeaForm)
