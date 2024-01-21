import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import { Form, Input, Row, Col } from "antd";

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
};

const JobDetails = ({ errors, values, handleChange }: StepProps) => (
  <Form layout="vertical">
    <h1 className="text-xl">Job Details</h1>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Job Title">
          <Input
            name="jobTitle"
            placeholder="Job Title"
            onChange={handleChange}
            value={values.jobTitle}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Descritption"
          // required
          // hasFeedback
          // validateStatus={!!errors.designation ? "error" : ""}
          // help={errors.designation ? `${errors.designation}`:""}
        >
          <Input
            name="description"
            placeholder="Descritption"
            onChange={handleChange}
            value={values.description}
          />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Skill">
          <Input
            name="skill"
            placeholder="Skill"
            onChange={handleChange}
            value={values.skill}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Attachments">
          <Input
            name="attachments"
            placeholder="Attachments"
            onChange={handleChange}
            value={values.attachments}
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Location">
          <Input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            value={values.location}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Vacancies">
          <Input
            name="vacancies"
            placeholder="Vacancies"
            onChange={handleChange}
            value={values.vacancies}
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Basic Criteria">
          <Input
            name="basicCriteria"
            placeholder="Basic Criteria"
            onChange={handleChange}
            value={values.basicCriteria}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Offer Letter Date">
          <Input
            name="offerLetterDate"
            placeholder="Offer Letter Date"
            onChange={handleChange}
            value={values.offerLetterDate}
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Tentative Joining Date">
          <Input
            name="tentativeJoiningDate"
            placeholder="Tentative Joining Date"
            onChange={handleChange}
            value={values.tentativeJoiningDate}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Duration">
          <Input
            name="duration"
            placeholder="Duration"
            onChange={handleChange}
            value={values.duration}
          />
        </Form.Item>
      </Col>
    </Row>
  </Form>
);

export default JobDetails;
