import RESTAPIClient from "RESTAPIClient";

const saveQualityTagReview = async (
  userId: string,
  resourceId: string,
  qualityTag: string,
) => {
  try {
    const qualityVerificationResponse = await RESTAPIClient.QualityVerification.create(
      userId,
      resourceId,
      qualityTag,
    );
    return {
      qualityVerificationResponse: qualityVerificationResponse,
      error: null,
    };
  } catch (error) {
    console.log(`ComponentSubmitDataError: ${error}`);
    return {
      qualityVerificationsResponse: null,
      error: error,
    };
  }
};

const modifyQualityTagReview = async (
  objectID: string,
  isCancelled: boolean,
) => {
  try {
    const response = await RESTAPIClient.QualityVerification.modify(
      objectID,
      isCancelled,
    );
    return {
      qualityVerificationResponse: response,
      error: null,
    };
  } catch (error) {
    return {
      qualityVerificationResponse: null,
      error,
    };
  }
};

export { saveQualityTagReview, modifyQualityTagReview };
