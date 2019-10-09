import React, { Component } from 'react'
import axios from 'axios'
import git from './github-logo.png'
import { Button, Form, Card } from 'react-bootstrap'
import IdeaForm from '././components/IdeaForm'
import update from 'immutability-helper'


const ops = [
  { value: 1, label: 'Date  created' }
]

const initialState = {
  ideas: [],
  editingIdeaId: null
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
    axios.get('http://localhost:5000/ideasbroad')
      .then((res) => {
        this.setState({ ideas: res.data })
      }).catch(error => console.log(error))
  }

  handleNewIdea = () => {
    const ideasBroad = {
      title: ' ',
      description: ' '
    }
    axios.post('http://localhost:5000/ideasbroad', ideasBroad)
      .then((res) => {
        const ideas = update(this.state.ideas, { $splice: [[0, 0, res.data]] })
        this.setState({ ideas, editingIdeaId: res.data.id }, () => {
          this.handleGetIdeas()
        })
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App d-flex flex-column align-items-center" >
        <Card style={{ width: '70rem' }}>
          <Card.Body>
            <h2 className="text-center">Idea Board
            <Form.Text className="text-muted">
                <a href="https://github.com/osvaldsoza/ideas-broad" target="_blank" ><img src={git} alt="Git - osvaldsoza-ideas-broad" /></a>
              </Form.Text>
            </h2>
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
                <IdeaForm idea={idea} key={idea.id} handleGetIdeas={this.handleGetIdeas} />
              )
            })}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default App;
