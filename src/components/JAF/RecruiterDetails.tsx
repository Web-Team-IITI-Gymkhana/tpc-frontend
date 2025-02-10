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
          <Col span={8} key={index} style={{ border: '0px 0px 0px 2 px', padding: '0 65px' }}>
            <h3 className="text-md my-3">{index === 1 ? "Head HR" : `Point of Contact ${index - 1}`}</h3>
            <Form.Item label={`Name`}>
              <Input
                name={`recName${index}`}
                placeholder="Name"
                onChange={handleChange}
                value={values[`recName${index}`]}
              />
            </Form.Item>
            <Form.Item
              label={`Designation`}
              required={index === 1}
              hasFeedback={index === 1}
              validateStatus={index === 1 && !!errors[`designation${index}`] ? "error" : ""}
              help={index === 1 && errors[`designation${index}`] ? `${errors[`designation${index}`]}` : ""}
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
              required={index === 1}
              validateStatus={index === 1 && !!errors[`email${index}`] ? "error" : ""}
              help={index === 1 && errors[`email${index}`] ? `${errors[`email${index}`]}` : ""}
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
              required={index === 1}
              validateStatus={index === 1 && !!errors[`phoneNumber${index}`] ? "error" : ""}
              help={index === 1 && errors[`phoneNumber${index}`] ? `${errors[`phoneNumber${index}`]}` : ""}
            >
              <Input
                name={`phoneNumber${index}`}
                placeholder="Phone"
                onChange={handleChange}
                value={values[`phoneNumber${index}`]}
                addonBefore="+91"
              />
            </Form.Item>
            <Form.Item label={`Landline`}>
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
