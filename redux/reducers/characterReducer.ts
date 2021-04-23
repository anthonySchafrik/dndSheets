interface State {
  name: string;
}
interface Action {
  type: string;
  payload: State;
}

const initialState: State = {
  name: 'TestName',
};

const characterReducer = (state = initialState, action: Action) => {
  const {type, payload} = action;

  switch (type) {
    default:
      return state;
  }
};

export default characterReducer;
