import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getChats } from '../../actions/index';

import ChatListItem from './ChatListItem';
import Spinner from "../Spinner";

const ChatList = ({ getChats, createChat, chat: {chats, loading} }) => {
    useEffect(() => {
        getChats();
    }, [getChats]);


    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="large text-primary">Chat List</h1>
            {chats.map(chat => (
                <ChatListItem key={chat.room_id} chat={chat} />
            ))}
        </Fragment>
    );
};

ChatList.propTypes = {
    getChats: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    chat: state.chat
});

export default connect(
    mapStateToProps,
    { getChats }
)(ChatList);