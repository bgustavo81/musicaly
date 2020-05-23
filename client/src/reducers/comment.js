import {
    GET_COMMENT,
    GET_COMMENTS,
    ADD_COMMENT,
    REMOVE_COMMENT,

} from "../actions/types";

const initialState = {
    comments: [],
    comment: null,
    loading: true,
    error: {}
}

export default function( state = initialState, action ) {
    const { type, payload } = action;

    switch (type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: payload,
                loading: false
            };
        case GET_COMMENT:
            return {
                ...state, 
                comment: payload,
                loading: false
            };
        case REMOVE_COMMENT: 
        return {
                ...state, 
                comments: state.comments.filter(comment => comment.comm_id !== payload),
                loading: false
            };
        case ADD_COMMENT: 
        return {
            ...state,
            comments: [payload, ...state.comments],
            loading: false
        };
        default: 
            return state;
    }
} 