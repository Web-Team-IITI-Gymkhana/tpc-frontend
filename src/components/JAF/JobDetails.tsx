import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import { Form, Input, Row, Col } from "antd";

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
};

const JobDetails = ({ errors, values, handleChange }: StepProps) => (
  <Form layout="vertical">
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Title Name">
          <Input
            name="title"
            placeholder="title"
            onChange={handleChange}
            value={values.title}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Attachment"
          required
          hasFeedback
          validateStatus={!!errors.designation ? "error" : ""}
          help={errors.designation ? `${errors.designation}`:""}
        >
          <Input
            name="attachment"
            placeholder="attachment"
            onChange={handleChange}
            value={values.attachment}
          />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Skill">
          <Input
            name="skill"
            placeholder="skill"
            onChange={handleChange}
            value={values.skill}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Description">
          <Input
            name="description"
            placeholder="description"
            onChange={handleChange}
            value={values.description}
          />
        </Form.Item>
      </Col>
    </Row>
  </Form>
);

export default JobDetails;
