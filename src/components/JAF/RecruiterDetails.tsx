import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import { Form, Input, Row, Col, InputNumber, Space } from "antd";

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
};

const RecruiterDetails = ({ errors, values, handleChange }: StepProps) => {
  const [form] = Form.useForm();

  return (
    <Form layout="vertical">
      <h1 className="text-xl">Recruiter Details</h1>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Recruiter Name">
            <Input
              name="recName"
              placeholder="Recruiter Name"
              onChange={handleChange}
              value={values.recName}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Designation"
            required
            hasFeedback
            validateStatus={!!errors.designation ? "error" : ""}
            help={errors.designation ? `${errors.designation}` : ""}
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
          <Form.Item
            label="Email"
            required
            validateStatus={!!errors.email ? "error" : ""}
            help={errors.email ? `${errors.email}` : ""}
          >
            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Phone"
            required
            validateStatus={!!errors.phoneNumber ? "error" : ""}
            help={errors.phoneNumber ? `${errors.phoneNumber}` : ""}
          >
            {/* <Input style={{ width: '20%' }} defaultValue="+91" name="code" />
            <Input style={{ width: '80%' }} placeholder="Phone Number" name="number"/> */}
            <Input
              name="phoneNumber"
              placeholder="Phone"
              onChange={handleChange}
              value={values.phoneNumber}
              addonBefore="+91"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Landline">
            <Input
              name="landline"
              placeholder="Landline"
              onChange={handleChange}
              value={values.landline}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default RecruiterDetails;
