import { Card, PageHeader, Typography, Row, Col, Input } from "antd";
import React from "react";
import { withRouter } from "react-router";
import s from "./Invited.module.scss";
import {
  invitedReducer,
  invitedStateInit,
  InvitedStateActionTypes,
} from "./InvitedReducer";
import WhiteCard from "components/WhiteCard";
import invitedPageGraphic1 from "assets/images/invitedPageGraphic1.svg";
import invitedPageGraphic2 from "assets/images/invitedPageGraphic2.svg";
import blueBenefitCheck from "assets/images/blueBenefitCheck.svg";
import SubmitButton from "components/AaspireBasicComponents/AaspireBasicFormComponents/SubmitButton";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";
import RESTAPIClient from "RESTAPIClient";
import { getInviteeStatus } from "./InvitedUtil";
import { compose } from "recompose";
import { History, Location } from "history";
import { CloseCircleOutlined } from "@ant-design/icons";
import floatingPerson1 from "assets/images/floatingPerson1.svg";

import floatingPerson2 from "assets/images/floatingPerson2.svg";

const graphic1 = <img src={invitedPageGraphic1} />;
const graphic2 = <img src={invitedPageGraphic2} style={{ maxWidth: "100%" }} />;

interface Props {
  error?: Error;
  history?: History;
  location?: Location;
}

const benefits = [
  {
    title: "Monetize Quickly & Effectively",
    text:
      "No need to spend 6 months making a full course. Upload & earn as you produce content.",
  },
  {
    title: "Collaborate for Greater Impact",
    text:
      "No need to spend 6 months making a full course. Upload & earn as you produce content.",
  },
  {
    title: "Network with Other Remarkable Creators",
    text:
      "No need to spend 6 months making a full course. Upload & earn as you produce content.",
  },
  {
    title: "Focus on Your Learners",
    text:
      "No need to spend 6 months making a full course. Upload & earn as you produce content.",
  },
  {
    title: "Earn More from Existing Content",
    text:
      "No need to spend 6 months making a full course. Upload & earn as you produce content.",
  },
  {
    title: "Stop Competing with Other Courses",
    text:
      "No need to spend 6 months making a full course. Upload & earn as you produce content.",
  },
];

const InvitedView: React.FC<Props> = (props: Props) => {
  const [invitedState, dispatch] = React.useReducer(
    invitedReducer,
    {
      invitee: null,
      error: null,
    },
    invitedStateInit,
  );
  const inviteCodeRef = React.createRef();

  const authenticateInviteCode = async () => {
    if (!invitedState || !invitedState.inviteCode) return;

    const response = await getInviteeStatus(invitedState.inviteCode);
    if (!response.error)
      dispatch({
        type: InvitedStateActionTypes.FINISHED_FETCHING_SUCCESSFULLY,
        invitee: response.invitee,
      });
    else {
      dispatch({
        type: InvitedStateActionTypes.FINISHED_FETCHING_WITH_ERROR,
        error: response.error,
      });
    }
  };

  const startingSteps = [
    {
      title: "Understand how Aaspire works",
      content: (
        <React.Fragment>
          <div>
            Check out our <span>home page</span> for learners
          </div>
          <div>
            Check out our <span>home page</span> for creators
          </div>
          <br />
          <div>
            {" "}
            Read out <span>FAQ</span>
          </div>
          <br />
          <br />
          <div>Have Questions?</div>
          <div>
            Reach out to us at <span>info@aaspire.io</span>
          </div>
        </React.Fragment>
      ),
    },
    {
      title: "Submit your application",
      content: (
        <React.Fragment>
          <div>
            Since you have been invited,you have a greater chance of being
            approved
          </div>
          <div
            onClick={e => {
              props.history.push(
                `/register-creator?inviteCode=${invitedState.inviteCode}`,
              );
            }}
            style={{ maxWidth: 190, marginTop: 21 }}
          >
            <div className={s.applyNowButton}> APPLY NOW </div>
          </div>
        </React.Fragment>
      ),
    },
    {
      title: "Start Adding Your Content",
      content:
        "Our CreatorsHub makes this easy to do. If you still need help, reach out and we can upload it for you!",
    },
  ];

  const inviteFormCard = React.useMemo(() => {
    return (
      <WhiteCard className={s.invitedWhiteCardForm}>
        {!invitedState.invitee && (
          <React.Fragment>
            <div className={s.welcomeText}>
              Have an invite code? Enter it below.
            </div>
            <div className={s.inputContainer}>
              <Input
                onChange={e =>
                  dispatch({
                    type: InvitedStateActionTypes.SET_INVITE_CODE,
                    code: e.target.value,
                  })
                }
                placeholder={"INVITE CODE"}
              />
            </div>
            <div className={s.errorMessage}>
              {invitedState.error && (
                <CloseCircleOutlined
                  style={{ color: "#fb255d", marginRight: 10, marginTop: 5 }}
                />
              )}
              {invitedState.error}
            </div>
            <div
              style={{
                margin: "29px auto",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={authenticateInviteCode}
            >
              <AaspireButton
                className={s.submitButtonCustom}
                type="primary"
                loading={invitedState.isLoading}
              >
                SUBMIT
              </AaspireButton>
            </div>
          </React.Fragment>
        )}
      </WhiteCard>
    );
  }, [invitedState]);
  return (
    <React.Fragment>
      <img src={floatingPerson1} className={s.floatingBGImage1} />
      <img src={floatingPerson2} className={s.floatingBGImage2} />
      <div className={s.invitedRoot}>
        {!invitedState.invitee && inviteFormCard}
        {invitedState.invitee && (
          <WhiteCard className={s.invitedWhiteCard}>
            <div className={s.joinOurCommunityText}>Join Our Community</div>

            <React.Fragment>
              <div className={s.welcomeText}>
                Hi,{" "}
                <span style={{ fontWeight: "bold" }}>
                  {invitedState.invitee.split(" ")[0]}
                </span>{" "}
                you've been invited to become an Aaspire Creator{" "}
              </div>

              <div className={s.welcomeSmallText}>
                First off -{" "}
                <span style={{ fontWeight: "bold" }}>congrats!</span> We don’t
                reach out to many people. The fact that you received an invite
                means we found your expertise & educational content to be
                best-in-class for your field.
              </div>

              <Row className={s.talkingPointsWrapper}>
                <Col sm={{ span: 11, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                  <div className={s.talkingPointsGraphicWrapper}>
                    {graphic1}
                  </div>
                </Col>
                <Col sm={{ span: 10, offset: 3 }} xs={{ span: 24, offset: 0 }}>
                  <div className={s.talkingPointsTextWrapper}>
                    <div className={s.talkingPointsHeader}>
                      Bring Your Content to Aaspire. Make a difference.
                    </div>

                    <div className={s.talkingPointsText}>
                      {" "}
                      Reach learners who would have previously never discovered
                      your content. Add your videos & playlists to our Aaspire
                      Collections to help people around the world achieve their
                      learning goals.
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className={s.talkingPointsWrapper}>
                <Col sm={{ span: 10, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                  <div className={s.talkingPointsTextWrapper}>
                    <div className={s.talkingPointsHeader}>
                      Join a Select Group of Experts on a Mission
                    </div>

                    <div className={s.talkingPointsText}>
                      {" "}
                      We hand pick remarkable industry experts, educators, and
                      researchers to join our Aaspire Creator Community. Once
                      you’re an Aaspire Creator, you’re part of a mission: to
                      create the best learning experience in the world - so
                      anyone can become who they aspire to be.
                    </div>
                  </div>
                </Col>
                <Col sm={{ span: 11, offset: 3 }} xs={{ span: 24, offset: 0 }}>
                  <div className={s.talkingPointsGraphicWrapper}>
                    {graphic2}
                  </div>
                </Col>
              </Row>

              <div className={s.benefitsWrapper}>
                <div className={s.benefitsHeading}>
                  Benefits of Being an Aaspire Creator
                </div>
                {benefits &&
                  benefits.map(benefit => {
                    return (
                      <div className={s.benefit}>
                        <div>
                          {
                            <img
                              src={blueBenefitCheck}
                              style={{
                                height: 17,
                                width: 23,
                                marginBottom: 20,
                              }}
                            />
                          }
                        </div>
                        <div className={s.benefitRight}>
                          {" "}
                          <div className={s.benefitTitle}>{benefit.title} </div>
                          <div className={s.benefitText}>
                            {benefit.text}
                          </div>{" "}
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className={s.getStartedWrapper}>
                <div className={s.getStartedHeading}>How To Get Started</div>

                <div className={s.getStartedStepsWrapper}>
                  {startingSteps &&
                    startingSteps.map((step, idx) => {
                      return (
                        <div className={s.step}>
                          <div className={s.stepIdx}>0{idx + 1}</div>
                          <div className={s.stepRight}>
                            <div className={s.stepTitle}>{step.title}</div>

                            <div className={s.stepContent}>{step.content}</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </React.Fragment>
          </WhiteCard>
        )}
      </div>
    </React.Fragment>
  );
};

export default compose<Props, Props>(withRouter)(InvitedView);
