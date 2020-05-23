import axios from "axios";
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_ALERT, 
  REMOVE_ALERT,
  GET_POSTS,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_MESSAGES,
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  GET_CHAT,
  GET_CHATS,
  ADD_CHAT,
  REMOVE_CHAT,
  GET_COMMENTS
  
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import uuid from "uuid";
import history from "../history";


// Profile actions

//Get current user's profile
export const getCurrentProfile = (user) => async (dispatch, getState) => {
  const response = await axios.get(`api/profile/me/`);

  dispatch({ type: GET_PROFILE, payload: response.data });
};

//Get all user's profiles
export const getProfiles = () => async dispatch => {
  //Clear what ever is in the current user's profile
  dispatch({ type: CLEAR_PROFILE });

  const response = await axios.get("/api/profile");
  
  dispatch({ type: GET_PROFILES, payload: response.data });
};


//Get profile by ID
export const getProfileById = userId => async dispatch => {
  const response = await axios.get(`/api/profile/user/${userId}`);

  dispatch({ type: GET_PROFILE, payload: response.data });
};


//Create or update a profile, history is for client side route
export const createProfile = ( formData, history, edit=false ) => async (dispatch, getState) => {
  const user_id = getState().auth.user.id;
  // image upload logic
  if (formData.image) {
    const uploadConfig = await axios.get('/api/upload');
    await axios.put(uploadConfig.data.url, formData.image, {
      headers: {
        'Content-Type': formData.image.type
      }
    })
    formData.image = uploadConfig.data.key;
  }
  
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const response = await axios.post("api/profile", {...formData, user_id}, config);
  dispatch({ type: GET_PROFILE, payload: response.data });
  dispatch(setAlert(edit ? "Profile Updated": "Profile Created", "success"));

  history.push("/dashboard");
};


//Add Experience for the User
export const addExperience = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = await axios.patch("api/profile/experience", formData, config);
  dispatch({ type: UPDATE_PROFILE, payload: response.data });
  dispatch(setAlert("Experience Added", "success"));
  history.push("./dashboard")
}


//Add Education for the User
export const addEducation = (formData, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Patch request to API/PROFILE
  const response = await axios.patch("api/profile/education", formData, config);

  dispatch({ type: UPDATE_PROFILE, payload: response.data });
  dispatch(setAlert("Education Added", "success"));
  history.push("./dashboard");
}




//Delete the account and profile

//Delete a user's experience
export const deleteAccount = () => async dispatch => {
  if (
    window.confirm(
      "Are you sure you want to delete your account?"
    )
  ) {
    await axios.delete(`/api/profile/`);

    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: ACCOUNT_DELETED});

    dispatch(setAlert("Account has been removed.", "danger"));
  }
}









// Alert actions

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id }
    });
  
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};


// Chat actions 

//Get chat rooms
export const getChats = () => async dispatch => {
  const response = await axios.get("api/chats");

  dispatch({ type: GET_CHATS, payload: response.data });
}

//Get chat 
export const getChat = room_id => async dispatch => {
  const response = await axios.get(`/api/chats/${room_id}`);

  dispatch({ type: GET_MESSAGES, payload: response.data.messages });
  dispatch({ type: GET_CHAT, payload: response.data.room });
}

//Create a Chat Room
export const createChat = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const response = await axios.post(`/api/chats/`, formData, config);

  dispatch({ type: ADD_CHAT, payload: response.data });

  const room_id = response.data.room_id;

  history.push(`/chats/${room_id}`);
};

//Delete chat room
export const deleteChat = room_id => async dispatch => {
  await axios.delete(`api/chats/${room_id}`);


  dispatch({ type: REMOVE_CHAT, payload: room_id });
  dispatch(setAlert("Chat room has been deleted.", "Success"));
};

//Add a message
export const addMessage = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const response = await axios.post(`/api/chats/message`, formData, config);

  dispatch({ type: ADD_MESSAGE, payload: response.data });
};

export const dispatchMessageAddition = message => dispatch => {
  dispatch({ type: ADD_MESSAGE, payload: message });
};

//Delete a message
export const deleteMessage = message_id => async dispatch => {
  await axios.delete(`/api/chats/message/${message_id}`);
  dispatch({ type: REMOVE_MESSAGE, payload: message_id });
};

export const dispatchMessageDelete = message_id => dispatch => {
  message_id = parseInt(message_id);
  dispatch({ type: REMOVE_MESSAGE, payload: message_id });
};



//Posts actions

//Get posts
export const getPosts = () => async dispatch => {
  const response = await axios.get("api/posts");

  dispatch({ type: GET_POSTS, payload: response.data });
}


//Add a like to a discussion
export const addLike = post_id => async dispatch => {
  const response = await axios.patch(`/api/posts/like/${post_id}`);

  dispatch({ type: UPDATE_LIKES, payload: { post_id, likes: response.data }});
}


//Remove a like to a discussion
export const removeLike = post_id => async dispatch => {
  const response = await axios.patch(`api/posts/unlike/${post_id}`);

  dispatch({ type: UPDATE_LIKES, payload: {post_id, likes: response.data }});
};


//Delete a post
export const deletePost = post_id => async dispatch => {
  await axios.delete(`api/posts/${post_id}`);

  dispatch({ type: DELETE_POST, payload: post_id });
  dispatch(setAlert("Post has been deleted.", "success"));
};


//Add a post
export const addPost = formData => async (dispatch, getState) => {
  const user = getState().auth.user;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const response = await axios.post("/api/posts/", {...formData, ...user}, config);
  dispatch({ type: ADD_POST, payload: response.data });
  dispatch(setAlert("Post created", "success"));
};


//Get post
export const getPost = id => async dispatch => {
  const response = await axios.get(`/api/posts/${id}`);

  dispatch({ type: GET_POST, payload: response.data });
}

//Get posts
export const getComments = (post_id) => async dispatch => {
  const response = await axios.get(`/api/posts/comments/${post_id}`);  

  dispatch({ type: GET_COMMENTS, payload: response.data });
}


//Add a comment
export const addComment = (postId, formData) => async (dispatch, getState) => {
  const user = getState().auth.user;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const response = await axios.post(`/api/posts/comment/${postId}`, {...user, ...formData, postId}, config);

  dispatch({ type: ADD_COMMENT, payload: response.data });
  dispatch(setAlert("Comment Added", "Success"));
};


//Delete a comment
export const deleteComment = (post_id, comm_id) => async dispatch => {
  await axios.delete(`/api/posts/comment/${post_id}/${comm_id}`);

  dispatch({ type: REMOVE_COMMENT, payload: comm_id });
  dispatch(setAlert("Comment Removed", "danger"))
}





// Auth actions 
//Load User

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const response = await axios.get("/api/auth");


  dispatch({ type: USER_LOADED, payload: response.data });
}

//Registers the user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const body = JSON.stringify({ name, email, password });

  const response = await axios.post("api/users", body, config);

  dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  dispatch(loadUser());
}


//Login the user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  const response = await axios.post("api/auth", body, config);
  dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  dispatch(loadUser());
}


//Logout user and clear the profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
