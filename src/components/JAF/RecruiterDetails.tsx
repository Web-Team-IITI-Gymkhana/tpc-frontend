import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import { Form, Input, Row, Col, Typography, Card, Alert } from "antd";
import { PLACEHOLDERS } from "../../utils/jaf.constants";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
};

const RecruiterDetails = ({ errors, values, handleChange }: StepProps) => {
  const [form] = Form.useForm();

  // Helper function to check if any field for a recruiter index is filled
  const hasAnyRecruiterInfo = (index: number): boolean => {
    return !!(
      values[`recName${index}`] ||
      values[`designation${index}`] ||
      values[`email${index}`] ||
      values[`phoneNumber${index}`] ||
      values[`landline${index}`]
    );
  };

  // Helper function to get error message
  const getErrorMessage = (field: string): string => {
    const error = errors[field];
    return typeof error === "string" ? error : "";
  };

  return (
    <div className="px-1 md:px-6">
      {/* Header Section */}
      <div className="text-center mb-6 md:mb-8 mt-4 md:mt-6">
        <Title
          level={4}
          className="mb-2 text-gray-800 uppercase tracking-wide font-semibold text-lg md:text-xl"
        >
          Recruiter Details
        </Title>
        <Text className="text-sm md:text-base text-gray-600">
          Provide contact information for the recruitment team
        </Text>
      </div>

      <Form layout="vertical">
        <Row
          gutter={[16, 24]}
          className="flex flex-col md:flex-row md:items-stretch"
        >
          {[1, 2, 3].map((index) => (
            <Col xs={24} md={8} key={index} className="flex w-full">
              <Card
                title={
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {index === 1 ? (
                      <>
                        <UserOutlined style={{ color: "#374151" }} />
                        <Text strong style={{ fontSize: 16, color: "#374151" }}>
                          <span style={{ color: "#ef4444" }}>* </span>
                          Primary Contact
                        </Text>
                      </>
                    ) : (
                      <>
                        <TeamOutlined style={{ color: "#6b7280" }} />
                        <Text style={{ fontSize: 16, color: "#6b7280" }}>
                          Additional Contact {index - 1}
                        </Text>
                      </>
                    )}
                  </div>
                }
                className="mb-4 md:mb-6 shadow-sm rounded-lg border border-gray-200 w-full h-auto min-h-96 md:min-h-[480px]"
              >
                {/* Name Field */}
                <Form.Item
                  className="mb-4 md:mb-6"
                  required={index === 1}
                  label={
                    <span className="text-sm md:text-base font-medium">
                      Full Name
                    </span>
                  }
                  hasFeedback
                  validateStatus={
                    getErrorMessage(`recName${index}`) ? "error" : ""
                  }
                  help={getErrorMessage(`recName${index}`)}
                >
                  <Input
                    name={`recName${index}`}
                    placeholder={PLACEHOLDERS.RECRUITER_NAME}
                    onChange={handleChange}
                    value={values[`recName${index}`]}
                    maxLength={100}
                    showCount
                    className="text-xs md:text-sm"
                  />
                </Form.Item>

                {/* Designation Field */}
                <Form.Item
                  className="mb-4 md:mb-6"
                  required={index === 1}
                  label={
                    <span className="text-sm md:text-base font-medium">
                      Designation
                    </span>
                  }
                  hasFeedback
                  validateStatus={
                    getErrorMessage(`designation${index}`) ? "error" : ""
                  }
                  help={getErrorMessage(`designation${index}`)}
                >
                  <Input
                    name={`designation${index}`}
                    placeholder={PLACEHOLDERS.RECRUITER_DESIGNATION}
                    onChange={handleChange}
                    value={values[`designation${index}`]}
                    maxLength={100}
                    showCount
                    className="text-xs md:text-sm"
                  />
                </Form.Item>

                {/* Email Field */}
                <Form.Item
                  className="mb-4 md:mb-6"
                  required={index === 1}
                  label={
                    <span className="text-sm md:text-base font-medium">
                      Email Address
                    </span>
                  }
                  hasFeedback
                  validateStatus={
                    getErrorMessage(`email${index}`) ? "error" : ""
                  }
                  help={getErrorMessage(`email${index}`)}
                >
                  <Input
                    name={`email${index}`}
                    type="email"
                    placeholder={PLACEHOLDERS.RECRUITER_EMAIL}
                    onChange={handleChange}
                    value={values[`email${index}`]}
                    maxLength={254}
                    showCount
                    className="text-xs md:text-sm"
                  />
                </Form.Item>

                {/* Phone Field */}
                <Form.Item
                  className="mb-4 md:mb-6"
                  required={index === 1}
                  label={
                    <span className="text-sm md:text-base font-medium">
                      Mobile Number
                    </span>
                  }
                  hasFeedback
                  validateStatus={
                    getErrorMessage(`phoneNumber${index}`) ? "error" : ""
                  }
                  help={getErrorMessage(`phoneNumber${index}`)}
                >
                  <Input.Group compact className="flex">
                    <Input
                      name={`countryCode${index}`}
                      placeholder="+91"
                      value={values[`countryCode${index}`] || "+91"}
                      onChange={handleChange}
                      className="w-1/4 md:w-1/5 text-center text-xs md:text-sm"
                      maxLength={5}
                    />
                    <Input
                      name={`phoneNumber${index}`}
                      placeholder={PLACEHOLDERS.RECRUITER_PHONE}
                      onChange={handleChange}
                      value={values[`phoneNumber${index}`]}
                      className="w-3/4 md:w-4/5 text-xs md:text-sm"
                      maxLength={15}
                      showCount
                    />
                  </Input.Group>
                </Form.Item>

                {/* Landline Field */}
                <Form.Item
                  className="mb-0"
                  label={
                    <span className="text-sm md:text-base font-medium">
                      Landline (Optional)
                    </span>
                  }
                  hasFeedback
                  validateStatus={
                    getErrorMessage(`landline${index}`) ? "error" : ""
                  }
                  help={getErrorMessage(`landline${index}`)}
                >
                  <Input
                    name={`landline${index}`}
                    placeholder={PLACEHOLDERS.RECRUITER_LANDLINE}
                    onChange={handleChange}
                    value={values[`landline${index}`]}
                    maxLength={20}
                    className="text-xs md:text-sm"
                  />
                </Form.Item>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Simplified Instructions */}
        <Alert
          message={
            <span className="text-sm md:text-base font-medium">
              Contact Information Guidelines
            </span>
          }
          description={
            <span className="text-xs md:text-sm">
              Primary contact information is required. Additional contacts are
              optional but recommended for backup communication during the
              recruitment process.
            </span>
          }
          type="info"
          showIcon
          className="bg-blue-50 border border-blue-200 rounded-md mt-4"
        />
      </Form>
    </div>
  );
};

export default RecruiterDetails;
