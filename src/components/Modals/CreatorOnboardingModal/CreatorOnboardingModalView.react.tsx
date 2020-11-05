import { Button, Modal, Steps } from "antd";
import { AppContext } from "App";
import * as DataTypes from "data/types";
import React, { useEffect } from "react";
import { useCallback } from "react";
import {
  creatorOnboardingModalReducer,
  creatorOnboardingModalStateInit,
  CreatorOnboardingModalStateActionTypes,
} from "./CreatorOnboardingModalReducer";
import {
  saveFinishedCreatorOnboarding,
  saveCreatorOnboardingStatus,
} from "./CreatorOnboardingModalUtil";
import CreatorOnboardingContentCentered from "components/CreatorOnboardingContentCentered";
import CreatorOnboardingContentStaggered from "components/CreatorOnboardingContentStaggered";
import ProgressCard from "components/ProgressCard";
import ProgressList from "components/ProgressList";
import goalsViewImage from "assets/images/floatingPerson.svg";
import teamPresentation from "assets/images/teamPresentation.svg";
import personWorking from "assets/images/personWorking.svg";
import s from "./CreatorOnboardingModal.module.scss";

interface Props {
  show: boolean;
  closeModal: (shouldReload: boolean) => void;
  creator: DataTypes.Creator;
  error?: Error;
}

interface OnboardingStepViewData {
  title?: string;
  content: JSX.Element | string;
}

const CreatorOnboardingModalView: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [creatorOnboardingModalState, dispatch] = React.useReducer(
    creatorOnboardingModalReducer,
    {
      creator: props.creator,
      currentStep: props.creator.creatorOnboardingStepIndex,
      numTotalSteps: 9,
      isSavingCompletedStatus: false,
      viewedStepNums: [],
    },
    creatorOnboardingModalStateInit,
  );

  useEffect(() => {
    saveCreatorOnboardingStatus(
      appState.authUser.uid,
      creatorOnboardingModalState.currentStep,
    );
  }, []);

  const didClickNextStep = useCallback(async () => {
    dispatch({
      type: CreatorOnboardingModalStateActionTypes.NEXT_STEP,
    });
    await saveCreatorOnboardingStatus(
      appState.authUser.uid,
      creatorOnboardingModalState.currentStep + 1,
    );
    if (
      creatorOnboardingModalState.currentStep + 1 ===
      creatorOnboardingModalState.numTotalSteps
    ) {
      await didFinishOnboarding();
    }
  }, [dispatch, creatorOnboardingModalState.currentStep]);

  const didClickPrevStep = useCallback(async () => {
    dispatch({ type: CreatorOnboardingModalStateActionTypes.PREV_STEP });
    await saveCreatorOnboardingStatus(
      appState.authUser.uid,
      creatorOnboardingModalState.currentStep - 1,
    );
  }, [dispatch]);

  const didFinishOnboarding = useCallback(async () => {
    dispatch({
      type: CreatorOnboardingModalStateActionTypes.BEGIN_SAVE_COMPLETION_STATUS,
    });
    const { error } = await saveFinishedCreatorOnboarding(
      appState.authUser.uid,
    );
    if (error) {
      dispatch({
        type: CreatorOnboardingModalStateActionTypes.FINISHED_SAVING_WITH_ERROR,
        progressSaveError: error,
      });
    } else {
      dispatch({
        type:
          CreatorOnboardingModalStateActionTypes.FINISHED_SAVING_SUCCESSFULLY,
      });
      props.closeModal(true);
    }
  }, [appState.authUser]);

  const onboardingProgressList = [
    {
      heading: "About Aaspire",
      subheadings: [
        {
          index: 0,
          value: "Our Goals",
        },
        {
          index: 1,
          value: "Collaboraton",
        },
        {
          index: 2,
          value: "How We're Different",
        },
      ],
    },
    {
      heading: "Content Guidelines",
      subheadings: [
        {
          index: 3,
          value: "Do's",
        },
        {
          index: 4,
          value: "Dont's",
        },
        {
          index: 5,
          value: "Values",
        },
      ],
    },
    {
      heading: "Why We're Different",
      subheadings: [
        {
          index: 6,
          value: "Better for Users",
        },
        {
          index: 7,
          value: "Better for Creators",
        },
        {
          index: 8,
          value: "Our Vision",
        },
      ],
    },
  ];

  const onboardingStepViews: Array<OnboardingStepViewData> = [
    {
      content: (
        <CreatorOnboardingContentCentered
          title={"Our Goals"}
          content={
            "As Aaspire Creators, we’re here to build the best learning experience in the world - so anyone can become the person they aspire to be."
          }
          imageSrc={goalsViewImage}
        />
      ),
    },
    {
      content: (
        <CreatorOnboardingContentStaggered
          title={"Collaboration"}
          subtitle={
            "It’s not about us. It’s about people around the world that we can help if we band together. That’s why collaboration is at the core of our CreatorsHub."
          }
          contentTop={{
            title: "1. Jointly Contribute to Collections",
            body:
              "Courses never have enough depth and breadth to support long-term learning. That’s why we have collections instead. Add your videos & playlists to them so users can easily discover your content.",
            imageSrc: teamPresentation,
          }}
          contentBottom={{
            title: "2. Create Collaborative Playlists",
            body:
              "When creating a playlist, you can choose to make it collaborative - so other creators (that you approve) can contribute content to it as well.",
            imageSrc: personWorking,
          }}
        />
      ),
    },
    {
      content: (
        <CreatorOnboardingContentCentered
          title={"How We're Different"}
          content={"Some random content."}
          imageSrc={goalsViewImage}
        />
      ),
    },
    {
      content: (
        <CreatorOnboardingContentCentered
          title={"Do's"}
          content={
            "As Aaspire Creators, we’re here to build the best learning experience in the world - so anyone can become the person they aspire to be."
          }
          imageSrc={goalsViewImage}
        />
      ),
    },
    {
      content: (
        <CreatorOnboardingContentStaggered
          title={"Dont's"}
          subtitle={
            "It’s not about us. It’s about people around the world that we can help if we band together. That’s why collaboration is at the core of our CreatorsHub."
          }
          contentTop={{
            title: "1. Jointly Contribute to Collections",
            body:
              "Courses never have enough depth and breadth to support long-term learning. That’s why we have collections instead. Add your videos & playlists to them so users can easily discover your content.",
            imageSrc: teamPresentation,
          }}
          contentBottom={{
            title: "2. Create Collaborative Playlists",
            body:
              "When creating a playlist, you can choose to make it collaborative - so other creators (that you approve) can contribute content to it as well.",
            imageSrc: personWorking,
          }}
        />
      ),
    },
    {
      content: (
        <CreatorOnboardingContentCentered
          title={"Values"}
          content={"Some random content."}
          imageSrc={goalsViewImage}
        />
      ),
    },
    {
      content: (
        <CreatorOnboardingContentCentered
          title={"Better for Users"}
          content={
            "As Aaspire Creators, we’re here to build the best learning experience in the world - so anyone can become the person they aspire to be."
          }
          imageSrc={goalsViewImage}
        />
      ),
    },
    {
      content: (
        <CreatorOnboardingContentStaggered
          title={"Better for Creators"}
          subtitle={
            "It’s not about us. It’s about people around the world that we can help if we band together. That’s why collaboration is at the core of our CreatorsHub."
          }
          contentTop={{
            title: "1. Jointly Contribute to Collections",
            body:
              "Courses never have enough depth and breadth to support long-term learning. That’s why we have collections instead. Add your videos & playlists to them so users can easily discover your content.",
            imageSrc: teamPresentation,
          }}
          contentBottom={{
            title: "2. Create Collaborative Playlists",
            body:
              "When creating a playlist, you can choose to make it collaborative - so other creators (that you approve) can contribute content to it as well.",
            imageSrc: personWorking,
          }}
        />
      ),
    },
    {
      content: (
        <CreatorOnboardingContentCentered
          title={"Our Vision"}
          content={"Some random content."}
          imageSrc={goalsViewImage}
        />
      ),
    },
  ];

  const creatorOnboardingModalFooter = React.useMemo(() => {
    return creatorOnboardingModalState.currentStep === 0 ? (
      <div className={s.creatorOnboardingModalFooter}>
        <Button
          onClick={async () => await didClickNextStep()}
          className={s.creatorOnboardingModalFooterBtnNext}
          type={"primary"}
        >
          Got it, next!
        </Button>
      </div>
    ) : (
      <div className={s.creatorOnboardingModalFooter}>
        <Button
          onClick={async () => await didClickPrevStep()}
          className={s.creatorOnboardingModalFooterBtnPrev}
          type={"default"}
        >
          Previous
        </Button>
        <Button
          onClick={async () => await didClickNextStep()}
          className={s.creatorOnboardingModalFooterBtnNext}
          type={"primary"}
        >
          {creatorOnboardingModalState.currentStep <
          creatorOnboardingModalState.numTotalSteps - 1
            ? "Got it, next!"
            : "Finish!"}
        </Button>
      </div>
    );
  }, [creatorOnboardingModalState.currentStep]);

  return (
    <React.Fragment>
      <Modal
        visible={props.show}
        okText={"Finish"}
        width={"950px"}
        closable={false}
        footer={null}
        bodyStyle={{ padding: 0, display: "flex", height: "679px" }}
      >
        <div className={s.creatorOnboardingModalProgressContainer}>
          <div className={s.creatorOnboardingModalProgressBarContainer}>
            <ProgressCard
              progress={
                (100 / creatorOnboardingModalState.numTotalSteps) *
                creatorOnboardingModalState.currentStep
              }
              title={"Let’s Get You Started"}
              subtitle={
                "We want to set you up for success from Day 1. Read every section. We promise it’ll be worth it!"
              }
            />
          </div>
          <div className={s.creatorOnboardingModalProgressListContainer}>
            <ProgressList
              activeSubheadingIndex={creatorOnboardingModalState.currentStep}
              sections={onboardingProgressList}
            />
          </div>
        </div>
        <div className={s.creatorOnboardingModalContentContainer}>
          {onboardingStepViews[creatorOnboardingModalState.currentStep].content}
          {creatorOnboardingModalFooter}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default CreatorOnboardingModalView;
