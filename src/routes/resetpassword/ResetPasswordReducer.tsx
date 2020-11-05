interface ResetPasswordState {}

interface ResetPasswordAction {
  type?: string;
}

const resetPasswordStateInit = (
  initialState: ResetPasswordState,
): ResetPasswordState => ({
  ...initialState,
});

const resetPasswordReducer = (
  state: ResetPasswordState,
  action: ResetPasswordAction,
): ResetPasswordState => {
  switch (action.type) {
    default:
      return state;
  }
};

export { resetPasswordStateInit, resetPasswordReducer };
