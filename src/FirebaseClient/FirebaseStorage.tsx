import { firebaseApp } from "./Firebase";

const storageRef = firebaseApp.storage().ref();

export interface UploadFileResponse {
  error: string | null;
  downloadURL: string | null;
}

const uploadFile = async (
  file: Blob | Uint8Array | ArrayBuffer,
  fileName: string,
  contentType: string,
  directory: string,
  userId: string,
  onProgress: (progress: number) => void,
): Promise<UploadFileResponse> => {
  return new Promise((resolve, reject) => {
    var metadata = {
      contentType: contentType,
    };

    const uploadTask = storageRef
      .child(`${directory}/${userId}/${fileName + "." + new Date().getTime()}`)
      .put(file, metadata);

    uploadTask.on(
      firebaseApp.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        onProgress(progress);
      },
      error => reject({ error: error, downloadURL: null }),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          resolve({ error: null, downloadURL: downloadURL });
        });
      },
    );
  });
};

export { uploadFile };
