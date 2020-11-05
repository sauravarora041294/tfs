import { Col, Row, Table, Typography, Empty, Icon, Pagination } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import Avatar from "components/Avatar";
import CreatorProfilePopover from "components/CreatorProfilePopover";
import s from "./Mission.module.scss";
import PaginationItemRender from "components/PaginationItemRender";
import { CreatorInfoCard } from "components/CreatorInfoCard";
import WhiteCard from "components/WhiteCard";
interface Props {
  contributors: Array<DataTypes.Creator>;
  isShowMobileView?: boolean;
}

const components = {
  header: {
    wrapper: React.Fragment,
    row: React.Fragment,
    cell: React.Fragment,
  },
};

const paginationConfig = {
  size: "small",
  itemRender: PaginationItemRender,
};
const SMALL_SCREEN_THRESHOLD = 400;

const MissionCreatorsList: React.FC<Props> = (props: Props) => {
  const [minIndexToDisplay, setMinIndexToDisplay] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(2);
  const [maxIndexToDisplay, setMaxIndexToDisplay] = React.useState(2);

  const creatorItemRef = React.useRef(null);
  const creatorDisplayAreaRef = React.useRef(null);

  const setPaginationConfig = () => {
    if (creatorDisplayAreaRef && creatorDisplayAreaRef.current) {
      setPageSize(
        Math.floor(
          creatorDisplayAreaRef.current.getBoundingClientRect().width / 182,
        ) *
          (creatorDisplayAreaRef.current.getBoundingClientRect().width >
          SMALL_SCREEN_THRESHOLD
            ? 2
            : 1),
      );
    }
  };
  React.useEffect(() => {
    if (minIndexToDisplay === 0) {
      setMaxIndexToDisplay(pageSize);
    }
  }, [pageSize]);

  React.useEffect(() => {
    window.addEventListener("resize", setPaginationConfig);

    setPaginationConfig();
  }, [creatorDisplayAreaRef]);

  const setSliceLimit = (value: number) => {
    setMinIndexToDisplay((value - 1) * pageSize);
    setMaxIndexToDisplay(value * pageSize);
  };

  const contributorAvatars = React.useMemo(
    () =>
      props.contributors &&
      props.contributors.length &&
      props.contributors.map(
        (contributor, i) =>
          contributor.creatorDetails && (
            <CreatorInfoCard creator={contributor} />
          ),
      ),
    [props.contributors],
  );

  return (
    <WhiteCard
      title={props.isShowMobileView ? "" : "Collection Experts"}
      subTitle={
        "These are highly vetted pros that have contributed videos & playlists to this collection"
      }
      withDefaultBodyPadding
      smallSizeTitleAndSubtitle
      className={s.creatorsListWhiteCard}
    >
      <div className={s.missionCreatorsList} ref={creatorDisplayAreaRef}>
        {contributorAvatars &&
          contributorAvatars.slice(minIndexToDisplay, maxIndexToDisplay)}
      </div>
      <Pagination
        {...paginationConfig}
        pageSize={pageSize}
        total={props.contributors ? props.contributors.length : 0}
        onChange={value => setSliceLimit(value)}
      />
    </WhiteCard>
  );
};

export default MissionCreatorsList;
