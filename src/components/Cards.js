import React from 'react'
import {connect} from 'react-redux'
import {Card, Col, Row} from "react-bootstrap";
import IdeaForm from "./IdeaForm";

import {loadIdeas} from "../actions/Ideas";

const Cards = (props) => {
    return (
        <Row>
            {props.ideas.map((idea) => {
                return (
                    <Col lg="6" key={idea.id} style={{marginBottom:'20px'}}>
                        <Card bg="light" border="dark" text="dark">
                            <Card.Body>
                                <IdeaForm idea={idea}/>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}

const mapStateToProps = state => {
    return {
        ideas: state.Ideas.ideas
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadIdeas: (url) => dispatch(loadIdeas(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)