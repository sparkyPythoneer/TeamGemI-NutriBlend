import * as React from 'react';

 const useBooleanStateControl = (initialState = false) => {
  const [state, setState] = React.useState(initialState);

  const setTrue = React.useCallback(() => setState(true), []);
  const setFalse = React.useCallback(() => setState(false), []);
  const toggle = React.useCallback(() => setState(state => !state), [])
  return {
    state,
    setState,
    setTrue,
    setFalse,
    toggle,
  };
};

export default useBooleanStateControl