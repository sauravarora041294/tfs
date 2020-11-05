import RESTAPIClient from "RESTAPIClient";

const removeContributor = async (
  contributorId: string,
  contentId: string,
  isMission: boolean,
) => {
  return isMission
    ? await RESTAPIClient.Mission.removeContributor(contributorId, contentId)
    : await RESTAPIClient.Playlist.removeContributor(contributorId, contentId);
};

export { removeContributor };
