import {
  Typography,
  Form,
  Upload,
  Icon,
  Select,
  Row,
  Col,
  Divider,
} from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import * as DataTypes from "data/types";
import SelectField from "components/AaspireBasicComponents/AaspireBasicFormComponents/SelectField";

interface FormProps extends FormComponentProps {
  creatorMissions: Array<DataTypes.Mission>;
  creatorPlaylists: Array<DataTypes.Playlist>;
}

const UploadVideoModalVideoGroupingsForm: React.FC<FormProps> = (
  props: FormProps
) => {
  const formRef = React.useRef();
  return (
    <div>
      <Form ref={formRef}>
        <Row>
          <Col span={11}>
            <Form.Item label="Add your video to the following collections">
              {props.form.getFieldDecorator(
                "selectedMissions",
                {},
              )(
                <SelectField
                  mode="multiple"
                  placeholder="Select Collections to add to"
                >
                  {props.creatorMissions &&
                    props.creatorMissions.map((mission, idx) => {
                      return (
                        <Select.Option key={mission.objectID}>
                          {mission.title}
                        </Select.Option>
                      );
                    })}
                </SelectField>,
              )}
            </Form.Item>
          </Col>
          <Col span={11} offset={2}>
            <Form.Item label="Add your video to the following playlists">
              {props.form.getFieldDecorator(
                "selectedPlaylists",
                {},
              )(
                <SelectField
                  mode="multiple"
                  placeholder="Select Playlists to add to"
                >
                  {props.creatorPlaylists &&
                    props.creatorPlaylists.map((playlist, idx) => {
                      return (
                        <Select.Option key={playlist.objectID}>
                          {playlist.title}
                        </Select.Option>
                      );
                    })}
                </SelectField>,
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UploadVideoModalVideoGroupingsForm;