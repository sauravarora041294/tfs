interface AddRatingModalState {}

interface AddRatingModalStateAction {
  type: string;
}

const addRatingModalStateInit = (
  initialState: AddRatingModalState,
): AddRatingModalState => ({
  ...initialState,
});

const addRatingModalReducer = (
  state: AddRatingModalState,
  action: AddRatingModalStateAction,
): AddRatingModalState => {
  switch (action.type) {
    default:
      return state;
  }
};

export { addRatingModalStateInit, addRatingModalReducer };
