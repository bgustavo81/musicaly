import {
    GET_MESSAGE,
    GET_MESSAGES,
    ADD_MESSAGE,
    REMOVE_MESSAGE,
} from "../actions/types";

const initialState = {
    messages: [],
    message: null,
    loading: true,
    error: {}
}

export default function( state = initialState, action ) {
    const { type, payload } = action;

    switch (type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload,
                loading: false
            };
        case GET_MESSAGE:
            return {
                ...state, 
                message: payload,
                loading: false
            };
        case REMOVE_MESSAGE: 
        return {
                ...state, 
                messages: state.messages.filter(message => message.message_id !== payload),
                loading: false
            };
        case ADD_MESSAGE: 
        let doNotUpdate;
        state.messages.forEach(message => {
            if (message.message_id === payload.message_id) {
                doNotUpdate = true;
            }
        })
        if (doNotUpdate) {
            return {
                ...state,
                messages: state.messages,
                loading: false
            }
        }
        return {
            ...state,
            messages: [...state.messages, payload],
            loading: false
        };
        default: 
            return state;
    }
} 