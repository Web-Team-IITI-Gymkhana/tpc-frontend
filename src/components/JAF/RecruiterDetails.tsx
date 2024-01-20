import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import { Form, Input, Row, Col } from "antd";

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
};

const RecruiterDetails = ({ errors, values, handleChange }: StepProps) => (
  <Form layout="vertical">
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Employer Name">
          <Input
            name="employerName"
            placeholder="Employer Name"
            onChange={handleChange}
            value={values.employerName}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Desissgnation"
          required
          hasFeedback
          validateStatus={!!errors.designation ? "error" : ""}
          help={errors.designation ? `${errors.designation}`:""}
        >
          <Input
            name="designation"
            placeholder="Designation"
            onChange={handleChange}
            value={values.designation}
          />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Total Experience">
          <Input
            name="totalExperience"
            placeholder="Total Experience"
            onChange={handleChange}
            value={values.totalExperience}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="City">
          <Input
            name="city"
            placeholder="City"
            onChange={handleChange}
            value={values.city}
          />
        </Form.Item>
      </Col>
    </Row>
  </Form>
);

export default RecruiterDetails;
