import * as DataTypes from "data/types";
import RESTAPIClient from "RESTAPIClient";
import store from "store";
import _ from "lodash";

const saveViewlog = async (
  saveViewlogJobInfo: SaveViewlogJobInfo,
): Promise<DataSyncJobResponse> => {
  try {
    const createViewlogResponse = await RESTAPIClient.Viewlog.create(
      saveViewlogJobInfo.userId,
      saveViewlogJobInfo.resourceId,
      saveViewlogJobInfo.completed,
      saveViewlogJobInfo.viewEndTime,
    );
    return {
      response: createViewlogResponse,
      error: null,
    };
  } catch (error) {
    return {
      response: null,
      error,
    };
  }
};

const updatePlaylistSection = async (
  updatePlaylistSectionJobInfo: UpdatePlaylistSectionJobInfo,
): Promise<DataSyncJobResponse> => {
  try {
    const updateSectionResponse = await RESTAPIClient.Playlist.updateSection(
      updatePlaylistSectionJobInfo.playlistId,
      updatePlaylistSectionJobInfo.sectionIndex,
      updatePlaylistSectionJobInfo.userId,
      null,
      null,
      updatePlaylistSectionJobInfo.resourceIds,
    );
    return {
      response: updateSectionResponse,
      error: null,
    };
  } catch (error) {
    return {
      response: null,
      error: error,
    };
  }
};

export enum DataSyncJobTypes {
  SAVE_VIEWLOG = "SAVE_VIEWLOG",
  UPDATE_PLAYLIST_SECTION = "UPDATE_PLAYLIST_SECTION",
}

interface DataSyncJob {
  type: DataSyncJobTypes;
  data: DataSyncJobInfo;
}

const JobTypeToFuncMap: {
  [opType: string]: (DataSyncJobInfo) => Promise<DataSyncJobResponse>;
} = {
  [DataSyncJobTypes.SAVE_VIEWLOG]: saveViewlog,
  [DataSyncJobTypes.UPDATE_PLAYLIST_SECTION]: updatePlaylistSection,
};

export interface DataSyncJobInfo {
  numFailures?: number;
}
export interface SaveViewlogJobInfo extends DataSyncJobInfo {
  resourceId: string;
  userId: string;
  viewEndTime: number;
  completed: boolean;
}

export interface UpdatePlaylistSectionJobInfo extends DataSyncJobInfo {
  userId: string;
  resourceIds: Array<string>;
  playlistId: string;
  sectionIndex: number;
}

interface DataSyncJobResponse {
  error: Error | null;
  response: any | null;
}

class DataSyncJobQueue {
  static enqueue = (type: DataSyncJobTypes, data: DataSyncJobInfo) => {
    const jobQueue = store.get("DataSyncJobQueue") as Array<DataSyncJob>;
    jobQueue.push({ type, data });
    store.set("DataSyncJobQueue", jobQueue);
  };

  static replace = (
    type: DataSyncJobTypes,
    newData: DataSyncJobInfo,
    whereCondition: (DataSyncJobInfo) => boolean,
  ) => {
    DataSyncJobQueue.dequeue(type, whereCondition);
    DataSyncJobQueue.enqueue(type, newData);
  };

  static dequeue = (
    type: DataSyncJobTypes,
    whereCondition: (DataSyncJobInfo) => boolean,
  ) => {
    const jobQueue =
      (store.get("DataSyncJobQueue") as Array<DataSyncJob>) || [];
    const updatedJobQueue = jobQueue.filter(
      syncOp => !(syncOp.type === type && whereCondition(syncOp.data)),
    );
    store.set("DataSyncJobQueue", updatedJobQueue);
  };

  static clear = () => {
    store.set("DataSyncJobQueue", []);
  };

  private static processJob = async (op: DataSyncJob) => {
    const saveFunc = JobTypeToFuncMap[op.type];
    const saveFuncResponse = await saveFunc(op.data);
    if (saveFuncResponse.error) {
      // Failure. Update numFailures
      const numFailures = (op.data.numFailures || 0) + 1;

      // Stop trying after 3 failures
      numFailures < 4
        ? DataSyncJobQueue.replace(
            op.type,
            { ...op.data, numFailures },
            opInfo => _.isEqual(op.data, opInfo),
          )
        : DataSyncJobQueue.dequeue(op.type, opInfo =>
            _.isEqual(op.data, opInfo),
          );
    } else {
      // Success. Remove job from queue
      DataSyncJobQueue.dequeue(op.type, opInfo => _.isEqual(op.data, opInfo));
    }
  };

  static processAllJobs = async () => {
    const jobQueue =
      (store.get("DataSyncJobQueue") as Array<DataSyncJob>) || [];
    const dataSyncJobPlist = jobQueue.map(syncOp =>
      DataSyncJobQueue.processJob(syncOp),
    );
    await Promise.all(dataSyncJobPlist);
  };

  static processJobsByType = async (type: DataSyncJobTypes) => {
    const jobQueue =
      (store.get("DataSyncJobQueue") as Array<DataSyncJob>) || [];
    const jobsToProcess = jobQueue.filter(syncOp => syncOp.type === type);
    const dataSyncJobPlist = jobsToProcess.map(syncOp =>
      DataSyncJobQueue.processJob(syncOp),
    );
    await Promise.all(dataSyncJobPlist);
  };
}

export default DataSyncJobQueue;
