import * as DataTypes from "data/types";

const getResourceProgress = (resource, viewlog: DataTypes.Viewlog): number => {
  return viewlog ? 100 * viewlog.viewEndTime : undefined;
};

const getPlaylistProgress = (
  playlist: DataTypes.Playlist,
  playlistViewlogs: Array<DataTypes.Viewlog>,
): number => {
  if (!playlist.sections || playlist.sections.length === 0) {
    return 0;
  }
  const playlistResourceIds = playlist.sections
    .map(section => section.resources)
    .reduce((a, b) => a.concat(b), []);

  const filteredViewlogs = playlistViewlogs.filter(
    viewlog => viewlog !== undefined && viewlog !== null,
  );

  const numCompleted = filteredViewlogs.filter(
    viewlog => viewlog.completed === true,
  ).length;

  const playlistLength = playlistResourceIds.length;
  if (playlistLength > 0) {
    return (100 * numCompleted) / playlistLength;
  } else {
    return 0;
  }
};

const getPlaylistSpecificViewlogs = (
  playlist,
  viewlogsByResourceId: Array<DataTypes.Viewlog>,
): Array<DataTypes.Viewlog> => {
  if (!playlist.sections || playlist.sections.length === 0) {
    return [];
  }
  const playlistResourceIds = playlist.sections
    .map(section => section.resources)
    .reduce((a, b) => a.concat(b), [], []);

  return playlistResourceIds.map(
    resourceId => viewlogsByResourceId[resourceId],
  );
};
const fadeInImage = (
  placeholderRef: React.MutableRefObject<any>,
  containerRef: React.MutableRefObject<any>,
) => {
  if (placeholderRef.current) placeholderRef.current.style.display = "none";
  if (containerRef.current) containerRef.current.style.height = "auto";
  if (containerRef.current) containerRef.current.style.width = "auto";
  if (containerRef.current) containerRef.current.classList.add("fade-in");
  if (containerRef.current) containerRef.current.style.opacity = 1;
};
export {
  getResourceProgress,
  getPlaylistProgress,
  getPlaylistSpecificViewlogs,
  fadeInImage,
};
