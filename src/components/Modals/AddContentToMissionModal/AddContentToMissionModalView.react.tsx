import { Button, Form, Modal, Result, Tabs, Typography, Divider } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React from "react";
import { Grid } from "semantic-ui-react";
import AddContentForm from "./AddContentForm.react";
import {
  AddContentToMissionModalStateActionTypes,
  addContentToMissionModalReducer,
  addContentToMissionModalStateInit,
} from "./AddContentToMissionModalReducer";
import {
  saveFormData,
  HITS_PER_PAGE,
  getCreatorUploadedContentBySearchStringNewestFirst,
} from "./AddContentToMissionModalUtil";
import AddContentToMissionModalUpload from "./AddContentToMissionModalUpload.react";
import ContentFeedView from "components/Views/ContentFeedView";
import { withRouter } from "react-router";
import { History, Location } from "history";
import { compose } from "recompose";
import ContentTabs, { ContentTabsSizeType } from "components/ContentTabs";
import { castFormToRefForwardingComponent } from "../../../utilities/index";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  mission: DataTypes.Mission;
  uploadedContent?: Array<DataTypes.Content>;
  creator: DataTypes.Creator;
  error: Error;
  history?: History;
  location?: Location;
}

const AddContentToMissionModalView: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [addContentToMissionState, dispatch] = React.useReducer(
    addContentToMissionModalReducer,
    {
      mission: props.mission,
      uploadedContent: props.uploadedContent,
      pageKey: "1",
      contentFeedViewClicksMade: 0,
      isSubmittingForm: false,
      submissionError: null,
      successfullySubmitted: false,
      searchText: "",
      currentPageOfSearchResults: 1,
      selectedResourceIds: [],
      selectedPlaylistIds: [],
    },
    addContentToMissionModalStateInit,
  );

  const addContentFormRef: React.MutableRefObject<any> = React.useRef()!;
  const AddContentFormEnhanced = Form.create({ name: "addvideo" })(
    React.forwardRef(castFormToRefForwardingComponent(AddContentForm)),
  );

  const handleSubmit = async (): Promise<void> => {
    dispatch({
      type: AddContentToMissionModalStateActionTypes.BEGIN_FORM_SUBMISSION,
    });
    const saveDataResponse = await saveFormData(
      addContentToMissionState.selectedResourceIds,
      addContentToMissionState.selectedPlaylistIds,
      addContentToMissionState.mission.objectID,
      appState.authUser.uid,
    );
    if (saveDataResponse.error) {
      dispatch({
        type:
          AddContentToMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
        submissionError: saveDataResponse.error,
      });
      props.closeModal({
        shouldReload: false,
        error: saveDataResponse.error,
      });
    } else {
      dispatch({
        type:
          AddContentToMissionModalStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
      });
      props.closeModal({ shouldReload: true });
    }
  };

  const handleUpload = file => {
    dispatch({
      type: AddContentToMissionModalStateActionTypes.VIDEO_UPLOAD,
      videoFile: file,
    });
  };

  const handleVideoSelection = (resourceId: string) => {
    dispatch({
      type: AddContentToMissionModalStateActionTypes.TOGGLE_RESOURCE_SELECTION,
      resourceId,
    });
  };

  const handlePlaylistSelection = (playlistId: string) => {
    dispatch({
      type: AddContentToMissionModalStateActionTypes.TOGGLE_PLAYLIST_SELECTION,
      playlistId,
    });
  };

  const handleLoadMore = async (currentPage: number) => {
    try {
      const fetchDataResponse = await getCreatorUploadedContentBySearchStringNewestFirst(
        {
          creatorUserId: props.creator.objectID,
          searchString: addContentToMissionState.searchText,
          currentPage: addContentToMissionState.currentPageOfSearchResults,
          pageSize: HITS_PER_PAGE,
        },
      );
      if (
        !fetchDataResponse.results.length ||
        fetchDataResponse.results.length === 0
      ) {
        dispatch({
          type:
            AddContentToMissionModalStateActionTypes.END_FETCHING_NEXT_RESULTS,
        });
      } else {
        dispatch({
          type:
            AddContentToMissionModalStateActionTypes.FETCHED_NEXT_RESULTS_SUCCESSFULLY,
          uploadedContent: fetchDataResponse.results,
        });
      }
    } catch (error) {
      console.log(`RouteFetchDataError: ${error}`);
    }
  };

  const handleSearch = async (searchText: string) => {
    dispatch({
      type: AddContentToMissionModalStateActionTypes.SET_SEARCH_TEXT,
      searchText,
    });
    const searchResults = await getCreatorUploadedContentBySearchStringNewestFirst(
      {
        creatorUserId: props.creator.objectID,
        searchString: searchText,
        pageSize: HITS_PER_PAGE,
        currentPage: 0,
      },
    );
    dispatch({
      type: AddContentToMissionModalStateActionTypes.START_FETCHING_RESULTS,
      uploadedContent: searchResults.results,
    });
  };

  const sectionForm = React.useMemo(
    () => (
      <AddContentFormEnhanced
        {...{
          ref: addContentFormRef,
          handleSearch: (key: string) => handleSearch(key),
        }}
      />
    ),
    [addContentFormRef],
  );

  const contentFeedViewContent = React.useMemo(() => {
    const contentResults = addContentToMissionState.uploadedContent.map(
      content => {
        if (props.creator)
          return {
            ...content,
            metadata: { creator: props.creator },
          };
        return { ...content };
      },
    );
    return (
      <ContentFeedView
        hideCreatorAvatar
        title=""
        userLatestViewlogs={{
          userId: props.creator.objectID,
          resourceIdToLatestViewlog: null,
        }}
        results={contentResults}
        selectLogic={true}
        selectResource={handleVideoSelection}
        selectPlaylist={handlePlaylistSelection}
        isScrollable={true}
        scrollViewHeight={450}
        hasMore={addContentToMissionState.hasMore}
        loadMore={handleLoadMore}
      />
    );
  }, [
    props.creator.objectID,
    addContentToMissionState.uploadedContent,
    handleVideoSelection,
    handlePlaylistSelection,
    addContentToMissionState.hasMore,
    handleLoadMore,
  ]);

  const viewContent = React.useMemo(() => {
    return (
      <Grid>
        <Grid.Column width={16}>
          {sectionForm}
          {addContentToMissionState.searchText ? null : (
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
  }, [sectionForm, contentFeedViewContent]);

  const modalFooterPaneOne = React.useMemo(() => {
    return [
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
        loading={addContentToMissionState.isSubmittingForm}
        onClick={handleSubmit}
        disabled={
          addContentToMissionState.selectedPlaylistIds.length === 0 &&
          addContentToMissionState.selectedResourceIds.length === 0
        }
      >
        {"Submit"}
      </Button>,
    ];
  }, [
    addContentToMissionState.selectedPlaylistIds,
    addContentToMissionState.selectedResourceIds,
    addContentToMissionState.isSubmittingForm,
  ]);

  const modalFooterPaneTwo = React.useMemo(() => {
    return (
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
          loading={addContentToMissionState.textToDisplay ? true : false}
          onClick={() => {
            props.closeModal({ shouldReload: true });
          }}
        >
          {"Finish"}
        </Button>
      </React.Fragment>
    );
  }, [addContentToMissionState.textToDisplay]);

  const setSubmittedText = (textToDisplay: string) => {
    dispatch({
      type: AddContentToMissionModalStateActionTypes.SET_SUBMITTED_TEXT,
      textToDisplay,
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
        <AddContentToMissionModalUpload
          userId={appState.authUser.uid}
          videoFile={addContentToMissionState.videoFile}
          handleUpload={handleUpload}
          missionId={props.mission.objectID}
          setSubmittedText={setSubmittedText}
          textToDisplay={addContentToMissionState.textToDisplay}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <Modal
        visible={props.show}
        title={`Add Content to Collection: ${addContentToMissionState.mission.title}`}
        okText={"Finish"}
        width={"950px"}
        style={{ top: "20px" }}
        bodyStyle={{ padding: "40px", paddingTop: "15px" }}
        footer={
          addContentToMissionState.pageKey === "1"
            ? modalFooterPaneOne
            : modalFooterPaneTwo
        }
        afterClose={() =>
          dispatch({
            type: AddContentToMissionModalStateActionTypes.CLEAR_MODAL_DATA,
          })
        }
        onCancel={() => props.closeModal({ shouldReload: false })}
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

export default compose<Props, Props>(withRouter)(AddContentToMissionModalView);
