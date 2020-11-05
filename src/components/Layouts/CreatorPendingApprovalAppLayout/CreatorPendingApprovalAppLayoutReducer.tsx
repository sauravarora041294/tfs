interface CreatorPendingApprovalAppLayoutState {
  sidebarCollapsed?: boolean;
}

interface CreatorPendingApprovalAppLayoutStateAction {
  type: string;
}

const creatorPendingApprovalAppLayoutStateInit = (
  initialState: CreatorPendingApprovalAppLayoutState,
): CreatorPendingApprovalAppLayoutState => ({
  ...initialState,
  sidebarCollapsed: false,
});

const creatorPendingApprovalAppLayoutReducer = (
  state: CreatorPendingApprovalAppLayoutState,
  action: CreatorPendingApprovalAppLayoutStateAction,
): CreatorPendingApprovalAppLayoutState => {
  switch (action.type) {
    default:
      return state;
  }
};

export {
  creatorPendingApprovalAppLayoutStateInit,
  creatorPendingApprovalAppLayoutReducer,
};
