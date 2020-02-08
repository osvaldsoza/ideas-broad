import React, {Component} from 'react'
import {connect} from 'react-redux'
import Logo from './components/Logo';
import {loadIdeas, newIdea} from './actions/Ideas'
import img from './github-logo.png'
import url from './util/url'
import Cards from "./components/Cards";
import {Button, Container} from 'react-bootstrap';

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

    render() {
        return (
            <Container>
                <Logo
                    title="Ideas Broad"
                    href="https://github.com/osvaldsoza/ideas-broad"
                    src={img}
                    alt="Git - osvaldsoza-ideas-broad"
                />
                <div style={{marginBottom: '10px'}}>
                    <Button
                        className="btn-new"
                        variant="dark" size="sm"
                        onClick={this.handleNewIdea}
                    >
                        New Idea
                    </Button>
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
