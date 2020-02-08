import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Form, Container} from 'react-bootstrap';
import img from './github-logo.png'
import Logo from './components/Logo';
import {loadIdeas, newIdea} from './actions/Ideas'
import url from './util/url'
import Cards from "./components/Cards";

const opsSorted = [
    {value: 1, label: 'Date  created'}
]

const initialState = {
    ideas: []
}

export class App extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }

    componentDidMount() {
        this.props.loadIdeas(url)
    }

    handleNewIdea = () => {
        const ideasBroad = {
            title: ' ',
            description: ' '
        }
        this.props.newIdea(url, ideasBroad, this.state.ideas)

        this.setState({newIdea: true});
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
                    src={img}
                    alt="Git - osvaldsoza-ideas-broad"
                />
                <div className="d-sort d-flex" style={{marginBottom: '10px'}}>
                    <Button
                        className="btn-new"
                        variant="dark" size="sm"
                        onClick={this.handleNewIdea}>
                        New
                    </Button>
                    <div className="d-flex align-items-baseline">
                        <Form.Label
                            className="label-form"
                            style={{marginLeft: '10px', marginRight: '10px', width: '200px'}}
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
                <Cards/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        ideas: state.Ideas.ideas
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadIdeas: (url) => dispatch(loadIdeas(url)),
        newIdea: (url, ideasBroad, ideas) => dispatch(newIdea(url, ideasBroad, ideas))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
