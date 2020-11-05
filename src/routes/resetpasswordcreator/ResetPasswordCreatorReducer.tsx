interface ResetPasswordCreatorState {}

interface ResetPasswordCreatorAction {
  type?: string;
}

const resetPasswordCreatorStateInit = (
  initialState: ResetPasswordCreatorState,
): ResetPasswordCreatorState => ({
  ...initialState,
});

const resetPasswordCreatorReducer = (
  state: ResetPasswordCreatorState,
  action: ResetPasswordCreatorAction,
): ResetPasswordCreatorState => {
  switch (action.type) {
    default:
      return state;
  }
};

export { resetPasswordCreatorStateInit, resetPasswordCreatorReducer };
