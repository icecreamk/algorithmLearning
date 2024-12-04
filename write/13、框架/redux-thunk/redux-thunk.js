// redux-thunk: 利用redux中间件来支持异步

// TOLEARN
// 如果action是函数，则调用
// 如果不是函数，传给下个中间价

const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };


  // 例子
  // userReducer.js
const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_USER_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null };
    case 'FETCH_USER_FAILURE':
      return { ...state, loading: false, user: null, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;

// userActions.js
import axios from 'axios';

export const fetchUserRequest = () => ({
  type: 'FETCH_USER_REQUEST',
});

export const fetchUserSuccess = (user) => ({
  type: 'FETCH_USER_SUCCESS',
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: 'FETCH_USER_FAILURE',
  payload: error,
});

export const fetchUser = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const response = await axios.get(`https://api.example.com/users/${userId}`);
      const user = response.data;
      dispatch(fetchUserSuccess(user));
    } catch (error) {
      dispatch(fetchUserFailure(error.message));
    }
  };
};

// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './userReducer';

const store = createStore(
  userReducer,
  applyMiddleware(thunk)
);

export default store;

// app.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './userActions';

const App = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUser(1)); // 假设 userId 为 1
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default App;