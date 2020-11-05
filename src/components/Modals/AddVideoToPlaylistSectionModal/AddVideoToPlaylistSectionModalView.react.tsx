import { Button, Form, Modal, Result, Tabs, Typography, Divider } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import AddVideoForm from "./AddVideoForm.react";
import AddVideoToPlaylistSectionUpload from "./AddVideoToPlaylistSectionUpload.react";
import {
  addVideoToPlaylistSectionModalStateInit,
  addVideoToPlaylistSectionModalReducer,
  AddVideoToPlaylistSectionModalStateActionTypes,
} from "./AddVideoToPlaylistSectionModalReducer";
import {
  saveFormData,
  getUploadedVideos,
  HITS_PER_PAGE,
  getCreatorUploadedVideosBySearchStringNewestFirst,
} from "./AddVideoToPlaylistSectionModalUtil";
import { withRouter } from "react-router";
import { History, Location } from "history";
import { compose } from "recompose";
import ContentTabs, { ContentTabsSizeType } from "components/ContentTabs";
import ContentFeedView from "components/Views/ContentFeedView";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  playlist: DataTypes.Playlist;
  sectionIndex: number;
  sectionData: DataTypes.Section;
  uploadedResources?: Array<DataTypes.Resource>;
  error?: Error;
  creator?: DataTypes.User;
  history?: History;
  location?: Location;
}

const AddVideoToPlaylistSectionModalView: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [addVideoToPlaylistSectionState, dispatch] = React.useReducer(
    addVideoToPlaylistSectionModalReducer,
    {
      playlist: props.playlist,
      sectionIndex: props.sectionIndex,
      sectionData: props.sectionData,
      uploadedResources: props.uploadedResources,
      pageKey: "1",
      successfullySubmitted: false,
      isSubmittingForm: false,
      submissionErrors: null,
      contentFeedViewClicksMade: 0,
      resourcesSelected: [],
      hasMore: true,
      searchText: "",
      currentPageOfSearchResults: 1,
    },
    addVideoToPlaylistSectionModalStateInit,
  );

  const results = addVideoToPlaylistSectionState.uploadedResources.map(
    (resource, id) => {
      if (props.creator)
        return {
          ...resource,
          contentType: "resource",
          metadata: { creator: props.creator },
        };
      return { ...resource, contentType: "resource" };
    },
  );

  const addVideoFormRef: React.MutableRefObject<any> = React.useRef();
  const AddVideoFormEnhanced = Form.create({ name: "addvideo" })(
    React.forwardRef(castFormToRefForwardingComponent(AddVideoForm)),
  );

  const handleSubmit = async () => {
    dispatch({
      type:
        AddVideoToPlaylistSectionModalStateActionTypes.BEGIN_FORM_SUBMISSION,
    });

    const resourcesToBeAdded = addVideoToPlaylistSectionState.resourcesSelected.filter(
      (resource, idx) => {
        const foundInSections = addVideoToPlaylistSectionState.playlist.sections.filter(
          section => {
            if (section.resources.includes(resource)) {
              return true;
            }
            return false;
          },
        );
        if (foundInSections && foundInSections.length > 0) return false;
        return true;
      },
    );

    const saveDataResponse = await saveFormData(
      resourcesToBeAdded,
      addVideoToPlaylistSectionState.playlist.objectID,
      addVideoToPlaylistSectionState.sectionIndex,
      appState.authUser.uid,
    );
    if (saveDataResponse.errors && saveDataResponse.errors.length > 0) {
      dispatch({
        type:
          AddVideoToPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
        submissionErrors: saveDataResponse.errors,
      });
      props.closeModal({
        shouldReload: true,
        errors: saveDataResponse.errors,
      });
    } else {
      dispatch({
        type:
          AddVideoToPlaylistSectionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
      });
      if (
        resourcesToBeAdded.length !==
        addVideoToPlaylistSectionState.resourcesSelected.length
      )
        props.closeModal({
          shouldReload: true,
          duplicateFound: true,
        });
      else {
        props.closeModal({
          shouldReload: true,
        });
      }
    }
  };

  const invertSelection = (resourceId: string) => {
    dispatch({
      type: AddVideoToPlaylistSectionModalStateActionTypes.INVERT_SELECTION,
      resourceId,
    });
  };

  const handleSelect = (resourcesSelected: Array<string>) => {
    dispatch({
      type: AddVideoToPlaylistSectionModalStateActionTypes.SET_FORM_DATA,
      resourcesSelected,
    });
  };

  const handleUpload = file => {
    dispatch({
      type: AddVideoToPlaylistSectionModalStateActionTypes.VIDEO_UPLOAD,
      videoFile: file,
    });
  };

  const handleVideoSelection = (resourceId: string) => {
    invertSelection(resourceId);
  };

  const handleSearch = async (searchText: string) => {
    dispatch({
      type: AddVideoToPlaylistSectionModalStateActionTypes.SET_SEARCH_TEXT,
      searchText,
    });
    const searchResults = await getCreatorUploadedVideosBySearchStringNewestFirst(
      {
        creatorUserId: props.creator.objectID,
        searchString: searchText,
        pageSize: HITS_PER_PAGE,
        currentPage: 0,
      },
    );
    dispatch({
      type:
        AddVideoToPlaylistSectionModalStateActionTypes.START_FETCHING_RESULTS,
      uploadedResources: searchResults.results as Array<DataTypes.Resource>,
    });
  };

  const sectionForm = React.useMemo(() => {
    return (
      <AddVideoFormEnhanced
        {...{
          ref: addVideoFormRef,
          handleSearch: (key: string) => handleSearch(key),
        }}
      />
    );
  }, [addVideoFormRef]);

  const handleLoadMore = async (currentPage: number) => {
    try {
      const fetchDataResponse = await getCreatorUploadedVideosBySearchStringNewestFirst(
        {
          creatorUserId: props.creator.objectID,
          searchString: addVideoToPlaylistSectionState.searchText,
          currentPage:
            addVideoToPlaylistSectionState.currentPageOfSearchResults,
          pageSize: HITS_PER_PAGE,
        },
      );
      if (
        !fetchDataResponse.results.length ||
        fetchDataResponse.results.length === 0
      ) {
        dispatch({
          type:
            AddVideoToPlaylistSectionModalStateActionTypes.END_FETCHING_NEXT_RESULTS,
        });
      } else {
        dispatch({
          type:
            AddVideoToPlaylistSectionModalStateActionTypes.FETCHED_NEXT_RESULTS_SUCCESSFULLY,
          uploadedResources: fetchDataResponse.results as Array<
            DataTypes.Resource
          >,
        });
      }
    } catch (error) {
      console.log(`RouteFetchDataError: ${error}`);
    }
  };

  const contentFeedViewContent = React.useMemo(() => {
    return (
      <ContentFeedView
        title=""
        userLatestViewlogs={{
          userId: props.creator.objectID,
          resourceIdToLatestViewlog: null,
        }}
        results={results}
        selectLogic={true}
        scrollViewHeight={450}
        isScrollable={true}
        selectResource={handleVideoSelection}
        hasMore={addVideoToPlaylistSectionState.hasMore}
        loadMore={handleLoadMore}
      />
    );
  }, [
    addVideoToPlaylistSectionState.hasMore,
    props.creator.objectID,
    results,
    handleVideoSelection,
    handleLoadMore,
  ]);

  const viewContent = (
    <Grid>
      <Grid.Column width={16}>
        {sectionForm}
        {addVideoToPlaylistSectionState.searchText ? null : (
          <React.Fragment>
            <Divider>OR</Divider>
            <Typography.Text style={{ fontSize: "16px", fontWeight: 500 }}>
              Choose from Recently Uploaded Content:
            </Typography.Text>
          </React.Fragment>
        )}
        <div style={{ marginTop: "10px", marginBottom: "10px" }} />
        {contentFeedViewContent}
      </Grid.Column>
    </Grid>
  );

  const modalFooterPaneOne = [
    <Button
      key="back"
      onClick={() => {
        props.closeModal({ shouldReload: false });
      }}
    >
      {"Cancel"}
    </Button>,
    <Button
      key="submit"
      type="primary"
      loading={addVideoToPlaylistSectionState.isSubmittingForm}
      onClick={handleSubmit}
      disabled={
        !addVideoToPlaylistSectionState.resourcesSelected ||
        addVideoToPlaylistSectionState.resourcesSelected.length === 0
      }
    >
      {"Submit"}
    </Button>,
  ];

  const modalFooterPaneTwo = (
    <React.Fragment>
      <Button
        key="back"
        onClick={() => {
          props.closeModal({ shouldReload: false });
        }}
      >
        {"Cancel"}
      </Button>
      ,
      <Button
        key="finish"
        type="primary"
        loading={addVideoToPlaylistSectionState.textToDisplay ? true : false}
        onClick={() => {
          props.closeModal({ shouldReload: false });
        }}
      >
        {"Finish"}
      </Button>
    </React.Fragment>
  );

  const setSubmittedText = (textToDisplay: string) => {
    dispatch({
      type: AddVideoToPlaylistSectionModalStateActionTypes.SET_SUBMITTED_TEXT,
      textToDisplay,
    });
  };
  const changeActivePage = pageKey => {
    dispatch({
      type: AddVideoToPlaylistSectionModalStateActionTypes.SET_ACTIVE_PAGE,
      pageKey,
    });
  };

  const modalTabs = [
    {
      key: "1",
      tabName: "Recent",
      children: viewContent,
    },
    {
      key: "2",
      tabName: "Upload",
      children: (
        <AddVideoToPlaylistSectionUpload
          userId={appState.authUser.uid}
          videoFile={addVideoToPlaylistSectionState.videoFile}
          handleUpload={handleUpload}
          playlistId={props.playlist.objectID}
          sectionIndex={props.sectionIndex}
          setSubmittedText={setSubmittedText}
          textToDisplay={addVideoToPlaylistSectionState.textToDisplay}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <Modal
        visible={props.show}
        title={`Add Video to Section ${addVideoToPlaylistSectionState.sectionIndex}: ${addVideoToPlaylistSectionState.sectionData.title}`}
        okText={"Finish"}
        width={"950px"}
        style={{ top: "20px" }}
        bodyStyle={{ padding: "40px", paddingTop: "15px" }}
        footer={
          addVideoToPlaylistSectionState.pageKey === "1"
            ? modalFooterPaneOne
            : modalFooterPaneTwo
        }
        afterClose={() =>
          dispatch({
            type:
              AddVideoToPlaylistSectionModalStateActionTypes.CLEAR_MODAL_DATA,
          })
        }
        onCancel={() => {
          props.closeModal({ shouldReload: false });
        }}
        destroyOnClose
      >
        <ContentTabs
          tabContents={modalTabs}
          defaultActiveKey={"1"}
          size={ContentTabsSizeType.LARGE}
        />
      </Modal>
    </React.Fragment>
  );
};

export default compose<Props, Props>(withRouter)(
  AddVideoToPlaylistSectionModalView,
);
