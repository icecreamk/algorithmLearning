const createStore = (reducer, initialState,  enhancer) => {
  if (enhancer) {
    return enhancer(createStore)(reducer, initialState);
  }


  let currentState = initialState || {};
  let currentListeners = [];

  const getState = () => currentState;
  const subscribe = (listener) => {
    currentListeners.push(listener);
  };

  const dispatch = (action) => {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listener) => listener());
    return action;
  };

  dispatch({ type: "@@INIT" });
  return { getState, dispatch, subscribe };
};

function applyMiddleWare(...middlewares) {
  return (createStore) =>
    (...args) => {
      const store = createStore(...args);
      let dispatch = store.dispatch;

      const midApi = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
      };

      const middlewaresChain = middlewares.map((middleware) =>
        middleware(midApi)
      );
      dispatch = compose(...middlewaresChain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((pre, key) => {
    pre[key] = bindActionCreator(creators[key], dispatch);
    return pre;
  }, {});
}


