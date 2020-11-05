import * as DataTypes from "data/types";

interface JoinContentCardState {
}

enum JoinContentCardStateActionTypes {
}

interface JoinContentCardAction {
  type: JoinContentCardStateActionTypes;
}

const joinContentCardStateInit = (
  initialState: JoinContentCardState,
): JoinContentCardState => ({
  ...initialState,
});

const joinContentCardReducer = (
  state: JoinContentCardState,
  action: JoinContentCardAction,
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export {
  JoinContentCardStateActionTypes,
  joinContentCardStateInit,
  joinContentCardReducer
};
