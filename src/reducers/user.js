const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_INPUT':
    return { ...state, email: action.email };
  default:
    return { ...state };
  }
}

export default user;
