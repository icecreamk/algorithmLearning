function createStore(reducer) {
  let currentState;
  let listeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    listeners.forEach((listener) => listener());

    return action;
  }

  function subscribe(cb) {
    listeners.push(cb);
    return () => {};
  }

  dispatch({ type: "@@REDUX/INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

function reducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(reducer);
store.subscribe(() => {
  console.log('change');
});

console.log(store.getState());
console.log(store.dispatch({ type: "ADD" }));
console.log(store.getState());
