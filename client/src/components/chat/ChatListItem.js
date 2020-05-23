import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteChat } from "../../actions/index";

const ChatListItem = ({
    auth,
    deleteChat,
    chat: {room_id, admin, recipient, admin_name, recipient_name, joined_at},
    showActions
}) => {
    let name;
    if (auth.user.id === admin) {
        name = recipient_name
    } else {
        name = admin_name
    }


    return (    
    <div className="chat bg-white p-1 my-1">
        <div>
            <Link to={`/chats/${room_id}`}>
                <h4>{name}</h4>
            </Link>
            <p className="chat-date">
                Joined <Moment format="DD/MM/YYYY HH:mm">{joined_at}</Moment>
            </p>
        </div>
        {showActions && (
            <div>
                <div>
                    <Link to={`/chats/${room_id}`} className="btn btn-primary my-1">
                        <i className="fas fa-comment"></i>
                    </Link>
                </div>
            {!auth.loading && admin === auth.user.id && (
                <div>
                    <button
                    onClick={e => deleteChat(room_id)}
                    type="button"
                    className="btn btn-danger">
                    <i className="fas fa-trash"></i>
                    </button>
                </div>
            )}
            </div>
        )}
    </div>
    )
};

ChatListItem.defaultProps = {
    showActions: true
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { deleteChat }
)(ChatListItem);



