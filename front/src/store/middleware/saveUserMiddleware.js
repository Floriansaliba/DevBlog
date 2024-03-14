const saveUserMiddleware = (store) => (next) => (action) => {
  next(action);
  if (action.type === 'user/connectUser') {
    const currentUser = store.getState().user;
    localStorage.setItem('user', JSON.stringify(currentUser));
  } else if (action.type === 'user/disconnectUser') {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('articles');
  }
};

export default saveUserMiddleware;
