import React from "react";
import s from "./Home.module.scss";
import landingPage_CollectionCardImage1 from "assets/images/landingPage_CollectionCardImage1.png";
import landingPage_CollectionCardImage2 from "assets/images/landingPage_CollectionCardImage2.png";
import landingPage_CollectionCardImage3 from "assets/images/landingPage_CollectionCardImage3.png";
import landingPage_rightArrow from "assets/icons/landingPage_rightArrow.svg";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";
import { LandingPageTopCollections } from "./HomeUtil";
import LoadingView from "components/Views/LoadingView";
import { Link } from "react-router-dom";

export interface Props {
  collectionsData: LandingPageTopCollections;
}

const HomeFindCollectionsSection: React.FC<Props> = ({ collectionsData }) => {
  return (
    <section id="find_collections_section" className={s.findCollectionsSection}>
      <div className={s.header}>Find the Collections that Fit Your Goals</div>

      <div className={s.collectionCards}>
        {collectionsData.isLoading ? (
          <LoadingView />
        ) : (
          collectionsData.collections.map(collection => (
            <Link
              to={`/collection/${collection.missionId}`}
              key={collection.missionId}
              className={s.card}
            >
              <div>
                <div className={s.imgContainer}>
                  <img
                    src={
                      collection.thumbnailUrl ||
                      landingPage_CollectionCardImage2
                    }
                    alt=""
                  />
                </div>

                <div className={s.metadata}>
                  <span className={s.metaDataValue}>
                    {collection.numVideos}
                  </span>
                  <span className={s.metaDataText}>videos</span>

                  <span className={s.verticalLine}></span>

                  <span className={s.metaDataValue}>
                    {collection.numPlaylists}
                  </span>
                  <span className={s.metaDataText}>playlists</span>
                </div>

                <div className={s.title}>{collection.title}</div>

                <div className={s.description}>{collection.description}</div>
              </div>
            </Link>
          ))
        )}
      </div>

      <div className={s.btnContainer}>
        <AaspireButton type="primary">
          EXPLORE COLLECTIONS
          <img src={landingPage_rightArrow} alt="" />
        </AaspireButton>
      </div>
    </section>
  );
};

export default HomeFindCollectionsSection;
