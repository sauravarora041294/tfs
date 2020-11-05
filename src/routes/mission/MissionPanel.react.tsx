import { Card } from "antd";
import React from "react";
import s from "./Mission.module.scss";

interface Props {
  children: React.ReactNode;
}

const MissionPanel: React.FC<Props> = (props: Props) => (
  <Card className={s.missionPanel}>{props.children}</Card>
);

export default MissionPanel;
