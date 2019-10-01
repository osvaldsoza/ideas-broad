import React, { Component } from 'react'
import axios from 'axios'
import git from './github-logo.png'
import { Button, Form, Card, Col } from 'react-bootstrap'
import Idea from '././components/Idea'

const ops = [
  { value: 1, label: 'Date  created' }
]

const initialState = {
  ideas: []
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.handleGetIdeas()
  }

  handleGetIdeas = () => {
    axios.get('http://localhost:3000/ideas/')
      .then((res) => {
        this.setState({ ideas: res.data })
      }).catch(error => console.log(error))
  }

  handleNewIdea = () => {
    axios.post('http://localhost:3000/ideas/', { idea: { title: '', description: '' } })
      .then((res) => {
        this.handleGetIdeas()
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App d-flex flex-column align-items-center" >
        <Card style={{ width: '70rem' }}>
          <Card.Body>
            <h2 className="text-center">Idea Board</h2>
            <div className="d-flex align-items-baseline"
              style={{ marginLeft: '10px' }}
            >
              <Button variant="primary" size="lg"
                onClick={this.handleNewIdea}>
                New Idea
            </Button>
              <Form.Label
                className="label-form"
                style={{ marginLeft: '10px', marginRight: '10px' }}
              >
                Sort ideas by:
              </Form.Label>
              <Form.Control as="select">
                <option>Date  created</option>
              </Form.Control>
            </div>
            
              {this.state.ideas.map((idea) => {
                return (
                  <Idea idea={idea} key={idea.id} />
                )
              })}
            
          </Card.Body>
        </Card>
        <Form.Text className="text-muted">
          <a href="https://github.com/osvaldsoza/ideas-broad" target="_blank"><img src={git}/></a>
        </Form.Text>
      </div>
    );
  }
}

export default App;
