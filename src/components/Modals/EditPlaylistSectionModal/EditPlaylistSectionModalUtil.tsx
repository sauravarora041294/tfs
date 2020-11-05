import RESTAPIClient from "RESTAPIClient";

const saveFormData = async (
  formValues,
  playlistId: string,
  sectionIndex: number,
  userId: string,
) => {
  try {
    const updateSectionResponse = await RESTAPIClient.Playlist.updateSection(
      playlistId,
      sectionIndex,
      userId,
      formValues.title,
      formValues.description,
      null,
    );
    return {
      updateSectionResponse: updateSectionResponse,
      error: null,
    };
  } catch (error) {
    return {
      updateSectionResponse: null,
      error: error,
    };
  }
};

export { saveFormData };
