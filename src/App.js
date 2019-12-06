import React, { Component } from 'react'
import axios from 'axios'
import git from './github-logo.png'
import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import IdeaForm from '././components/IdeaForm'
import update from 'immutability-helper'
import Logo from './components/Logo';

const opsSorted = [
  { value: 1, label: 'Date  created' }
]

const initialState = {
  ideas: []
}

const ideasbroad_herokuapp = 'https://ideasbroad.herokuapp.com/ideasbroad'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.handleGetIdeas()
  }

  handleGetIdeas = () => {
    axios.get(ideasbroad_herokuapp)
      .then((res) => {
        this.setState({ ideas: res.data })
      }).catch(error => console.log(error))
  }

  handleNewIdea = () => {
    const ideasBroad = {
      title: ' ',
      description: ' '
    }
    axios.post(ideasbroad_herokuapp, ideasBroad)
      .then((res) => {
        const ideas = update(this.state.ideas, { $splice: [[0, 0, res.data]] })
        this.setState({ ideas }, () => {
          this.handleGetIdeas()
        })
      }).catch(error => console.log(error))

    this.setState({ newIdea: true });
  }

  selectItems = () => {
    return (
      opsSorted.map(o => {
        return (
          <option value={o.value}>{o.label}</option>
        )
      })
    )
  }

  render() {
    return (
      <Container>
        <Logo
          title="Ideas Broad"
          href="https://github.com/osvaldsoza/ideas-broad"
          src={git}
          alt="Git - osvaldsoza-ideas-broad"
        />
        <div className="d-sort d-flex" style={{ marginBottom: '10px' }} >
          <Button
            className="btn-new"
            variant="dark" size="sm"
            onClick={this.handleNewIdea}>
            New
          </Button>
          <div className="d-flex align-items-baseline">
            <Form.Label
              className="label-form"
              style={{ marginLeft: '10px', marginRight: '10px' }}
            >
              Sort ideas by:
            </Form.Label>
            <Form.Control as="select">
              {
                this.selectItems()
              }
            </Form.Control>
          </div>
        </div>
        <Row>
          {this.state.ideas.map((idea) => {
            return (
              <Col lg="3">
                <Card bg="light" border="dark" text="dark">
                  <Card.Body>
                    <IdeaForm
                      idea={idea}
                      key={idea.id}
                      handleGetIdeas={this.handleGetIdeas}
                    />
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    );
  }
}

export default App;
