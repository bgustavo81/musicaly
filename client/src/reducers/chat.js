import {
    GET_CHAT,
    GET_CHATS,
    ADD_CHAT,
    REMOVE_CHAT,

} from "../actions/types";

const initialState = {
    chats: [],
    chat: null,
    loading: true,
    error: {}
}

export default function( state = initialState, action ) {
    const { type, payload } = action;

    switch (type) {
        case GET_CHATS:
            return {
                ...state,
                chats: payload,
                loading: false
            };
        case GET_CHAT:
            return {
                ...state, 
                chat: payload,
                loading: false
            };
        case REMOVE_CHAT: 
        return {
                ...state, 
                chats: state.chats.filter(chat => chat.room_id !== payload),
                loading: false
            };
        case ADD_CHAT: 
            let doNotUpdate;
            state.chats.forEach(chat => {
                if (chat.room_id === payload.room_id) {
                    doNotUpdate = true;
                }
            })
            if (doNotUpdate) {
                return {
                    ...state,
                    chats: state.chats,
                    loading: false
                }
            }
            return {
                ...state,
                chats: [payload, ...state.chats],
                loading: false
            };
        default: 
            return state;
    }
} 