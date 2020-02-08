import axios from 'axios'
import update from 'immutability-helper'

export const loadIdeas = (url) => {
    return dispatch => {
        axios.get(url)
            .then((res) => {
                dispatch({
                    type: 'LOAD_IDEAS',
                    ideas: res.data
                })
            }).catch(error => console.log(error))
    }


}
export const newIdea = (url, ideasBroad, _ideas) => {
    return dispatch => {
        axios.post(url, ideasBroad)
            .then((res) => {
                const ideas = update(_ideas, {$splice: [[0, 0, res.data]]})
                dispatch(loadIdeas(url))
            }).catch(error => console.log(error))
    }
}

export const deleteIdea = (id,url) => {
    return dispatch => {
        axios.delete(`${url}/${id}`)
            .then((res) => {
                dispatch(loadIdeas(url))
            }).catch(error => console.log(error))
    }
}

export const saveIdea = (url,ideas) => {
    return dispatch => {
        axios.post(url,ideas)
            .then((res) => {
                dispatch(loadIdeas(url))
            }).catch(error => console.log(error))
    }
}

