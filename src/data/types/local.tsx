export interface CloseModalParams {
  error?: Error;
  errors?: Array<Error>;
  shouldReload: boolean;
  duplicateFound?: boolean;
}
