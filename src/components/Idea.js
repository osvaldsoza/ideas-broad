import React from 'react'
import { Form } from 'react-bootstrap'
const Idea = (props) =>
    <div className="broad" >
        <Form.Control type="text" value={props.idea.title} placeholder="Title"/>
        <Form.Control as="textarea" rows="4" value={props.idea.description} placeholder="Description"/>
    </div>


export default Idea