import { Button, Modal, message } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import s from "./RemoveContributorModal.module.scss";
import {
  removeContributorModalReducer,
  removeContributorModalStateInit,
} from "./RemoveContributorModalReducer";
import { removeContributor } from "./RemoveContributorModalUtil";

interface Props {
  show: boolean;
  closeModal: (closeModalParams: DataTypes.Local.CloseModalParams) => void;
  onRemoveContributorSuccess?: (contributors: Array<DataTypes.User>) => void;
  contributor: DataTypes.Creator;
  content: DataTypes.Content;
  isMission: boolean;
}

const RemoveContributorModal = (props: Props) => {
  const [removeContributorState] = React.useReducer(
    removeContributorModalReducer,
    {
      contributor: props.contributor,
      content: props.content,
      isMission: props.isMission,
    },
    removeContributorModalStateInit,
  );

  const handleSubmit = async () => {
    const res = await removeContributor(
      removeContributorState.contributor.objectID,
      removeContributorState.content.objectID,
      removeContributorState.isMission,
    );
    if (res.errors) {
      props.closeModal({ shouldReload: true, errors: res.errors });
    } else {
      props.closeModal({ shouldReload: true });
    }
  };

  return (
    <Modal
      title={`Remove ${removeContributorState.contributor.firstName} from ${removeContributorState.content.title}?`}
      visible={props.show}
      onOk={() => handleSubmit()}
      onCancel={() => props.closeModal({ shouldReload: false })}
      footer={[
        <Button key="remove" type="danger" onClick={() => handleSubmit()}>
          Yes
        </Button>,
        <Button
          key="cancel"
          type="primary"
          onClick={() => props.closeModal({ shouldReload: false })}
        >
          No
        </Button>,
      ]}
    >
      <p className={s.modalBodyText}>
        Are you sure you want to remove
        <span className={s.modalBodyImportantText}>
          {` ${removeContributorState.contributor.firstName} ${removeContributorState.contributor.lastName} `}
        </span>
        as a contributor to
        {removeContributorState.isMission ? (
          <span> collection</span>
        ) : (
          <span> playlist</span>
        )}
        <span className={s.modalBodyImportantText}>
          {` ${removeContributorState.content.title}`}
        </span>
        ?
      </p>
      <p className={s.modalBodyText}>
        If so, They will not longer be able to add content to this
        {removeContributorState.isMission ? (
          <span> collection</span>
        ) : (
          <span> playlist</span>
        )}
        .
      </p>
    </Modal>
  );
};

export default RemoveContributorModal;
