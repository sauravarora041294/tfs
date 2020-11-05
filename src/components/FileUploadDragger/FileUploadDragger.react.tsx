import { Upload } from "antd";
import { AppContext } from "App";
import { uploadFile } from "FirebaseClient";
import React, { ReactChildren } from "react";

interface Props {
  children: ReactChildren;
  onUploadSuccess: (message: string) => void;
  uploadDirectory: string;
  acceptTypes: string;
}

const UploadDragger = React.forwardRef((props: Props, ref) => {
  const [appState, _] = React.useContext(AppContext);
  const uploadRequest = async ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }) => {
    const uploadVideoResponse: any = await uploadFile(
      file,
      filename,
      file.type,
      props.uploadDirectory,
      appState.authUser.uid,
      progress => onProgress({ percent: progress }),
    );
    if (uploadVideoResponse.error) {
      onError(uploadVideoResponse.error);
    } else {
      onSuccess(uploadVideoResponse.downloadURL);
    }
  };
  return (
    <Upload.Dragger
      {...{
        name: "upload",
        accept: props.acceptTypes,
        innerRef: ref,
        customRequest: uploadRequest,
        onSuccess: props.onUploadSuccess,
      }}
    >
      {props.children}
    </Upload.Dragger>
  );
});

const FileUploadDragger = props => (
  <UploadDragger {...props}>{props.children}</UploadDragger>
);

export default FileUploadDragger;
