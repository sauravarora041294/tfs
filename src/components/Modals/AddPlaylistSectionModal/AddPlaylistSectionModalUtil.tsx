import RESTAPIClient from "RESTAPIClient";

interface formValues {
  title: string;
  description: string;
}

interface saveFormDataResponse {
  addSectionResponse?: Object;
  error?: Error;
}

const saveFormData = async (
  formValues: formValues,
  playlistId: string,
  userId: string,
): Promise<saveFormDataResponse> => {
  try {
    const updateSectionResponse = await RESTAPIClient.Playlist.addSection(
      playlistId,
      userId,
      formValues.title,
      formValues.description,
    );
    return {
      addSectionResponse: updateSectionResponse,
      error: null,
    };
  } catch (error) {
    return {
      addSectionResponse: null,
      error: error,
    };
  }
};

export { saveFormData };
