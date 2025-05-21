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
      <h3 className="text-lg my-3">Point of Contacts</h3>
      <Row gutter={24}>
        {[1, 2, 3].map((index) => (
          <Col
            span={8}
            key={index}
            style={{ border: "0px 0px 0px 2 px", padding: "0 65px" }}
          >
            <h3 className="text-md my-3">
              {index === 1 ? "Head HR" : `Point of Contact ${index - 1}`}
            </h3>
            <Form.Item
              style={{ marginBottom: "35px" }}
              required={
                index === 1 ||
                values[`recName${index}`] ||
                values[`designation${index}`] ||
                values[`email${index}`] ||
                values[`phoneNumber${index}`] ||
                values[`landline${index}`]
              }
              label={`Name`}
              hasFeedback={true}
              validateStatus={!!errors[`recName${index}`] ? "error" : ""}
              help={
                errors[`recName${index}`] ? `${errors[`recName${index}`]}` : ""
              }
            >
              <Input
                name={`recName${index}`}
                placeholder="Name"
                onChange={handleChange}
                value={values[`recName${index}`]}
              />
            </Form.Item>
            <Form.Item
              label={`Designation`}
              style={{ marginBottom: "35px" }}
              required={
                index === 1 ||
                values[`recName${index}`] ||
                values[`designation${index}`] ||
                values[`email${index}`] ||
                values[`phoneNumber${index}`] ||
                values[`landline${index}`]
              }
              hasFeedback={true}
              validateStatus={!!errors[`designation${index}`] ? "error" : ""}
              help={
                errors[`designation${index}`]
                  ? `${errors[`designation${index}`]}`
                  : ""
              }
            >
              <Input
                name={`designation${index}`}
                placeholder="Designation"
                onChange={handleChange}
                value={values[`designation${index}`]}
              />
            </Form.Item>
            <Form.Item
              label={`Email`}
              style={{ marginBottom: "35px" }}
              hasFeedback={true}
              required={
                index === 1 ||
                values[`recName${index}`] ||
                values[`designation${index}`] ||
                values[`email${index}`] ||
                values[`phoneNumber${index}`] ||
                values[`landline${index}`]
              }
              validateStatus={!!errors[`email${index}`] ? "error" : ""}
              help={errors[`email${index}`] ? `${errors[`email${index}`]}` : ""}
            >
              <Input
                name={`email${index}`}
                placeholder="Email"
                onChange={handleChange}
                value={values[`email${index}`]}
              />
            </Form.Item>
            <Form.Item
              label={`Phone`}
              style={{ marginBottom: "35px" }}
              hasFeedback={true}
              required={
                index === 1 ||
                values[`recName${index}`] ||
                values[`designation${index}`] ||
                values[`email${index}`] ||
                values[`phoneNumber${index}`] ||
                values[`landline${index}`]
              }
              validateStatus={!!errors[`phoneNumber${index}`] ? "error" : ""}
              help={
                errors[`phoneNumber${index}`]
                  ? `${errors[`phoneNumber${index}`]}`
                  : ""
              }
            >
              <Input
                name={`phoneNumber${index}`}
                placeholder="Phone"
                onChange={handleChange}
                value={values[`phoneNumber${index}`]}
                addonBefore="+91"
              />
            </Form.Item>
            <Form.Item label={`Landline`} hasFeedback={true}>
              <Input
                name={`landline${index}`}
                placeholder="Landline"
                onChange={handleChange}
                value={values[`landline${index}`]}
              />
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export default RecruiterDetails;
