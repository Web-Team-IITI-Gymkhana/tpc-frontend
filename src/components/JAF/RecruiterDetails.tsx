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
    return typeof error === 'string' ? error : '';
  };

  return (
    <div style={{ padding: '0 24px' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: 32, marginTop: 24 }}>
        <Title level={4} style={{ 
          marginBottom: 8, 
          color: '#1f2937',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 600
        }}>
          Recruiter Details
        </Title>
        <Text style={{ fontSize: 16, color: '#6b7280' }}>
          Provide contact information for the recruitment team
        </Text>
      </div>

      <Form layout="vertical">
        <Row gutter={24} style={{ display: 'flex', alignItems: 'stretch' }}>
          {[1, 2, 3].map((index) => (
            <Col span={8} key={index} style={{ display: 'flex' }}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {index === 1 ? (
                      <>
                        <UserOutlined style={{ color: '#374151' }} />
                        <Text strong style={{ fontSize: 16, color: '#374151' }}>
                          <span style={{ color: '#ef4444' }}>* </span>
                          Primary Contact
                        </Text>
                      </>
                    ) : (
                      <>
                        <TeamOutlined style={{ color: '#6b7280' }} />
                        <Text style={{ fontSize: 16, color: '#6b7280' }}>
                          Additional Contact {index - 1}
                        </Text>
                      </>
                    )}
                  </div>
                }
                style={{ 
                  marginBottom: 24,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  width: '100%',
                  height: 'auto',
                  minHeight: '480px'
                }}
              >
                {/* Name Field */}
                <Form.Item
                  style={{ marginBottom: 24 }}
                  required={index === 1}
                  label="Full Name"
                  hasFeedback
                  validateStatus={getErrorMessage(`recName${index}`) ? "error" : ""}
                  help={getErrorMessage(`recName${index}`)}
                >
                  <Input
                    name={`recName${index}`}
                    placeholder={PLACEHOLDERS.RECRUITER_NAME}
                    onChange={handleChange}
                    value={values[`recName${index}`]}
                    maxLength={100}
                    showCount
                  />
                </Form.Item>

                {/* Designation Field */}
                <Form.Item
                  style={{ marginBottom: 24 }}
                  required={index === 1}
                  label="Designation"
                  hasFeedback
                  validateStatus={getErrorMessage(`designation${index}`) ? "error" : ""}
                  help={getErrorMessage(`designation${index}`)}
                >
                  <Input
                    name={`designation${index}`}
                    placeholder={PLACEHOLDERS.RECRUITER_DESIGNATION}
                    onChange={handleChange}
                    value={values[`designation${index}`]}
                    maxLength={100}
                    showCount
                  />
                </Form.Item>

                {/* Email Field */}
                <Form.Item
                  style={{ marginBottom: 24 }}
                  required={index === 1}
                  label="Email Address"
                  hasFeedback
                  validateStatus={getErrorMessage(`email${index}`) ? "error" : ""}
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
                  />
                </Form.Item>

                {/* Phone Field */}
                <Form.Item
                  style={{ marginBottom: 24 }}
                  required={index === 1}
                  label="Mobile Number"
                  hasFeedback
                  validateStatus={getErrorMessage(`phoneNumber${index}`) ? "error" : ""}
                  help={getErrorMessage(`phoneNumber${index}`)}
                >
                  <Input.Group compact>
                    <Input
                      name={`countryCode${index}`}
                      placeholder="+91"
                      value={values[`countryCode${index}`] || "+91"}
                      onChange={handleChange}
                      style={{ 
                        width: '20%',
                        textAlign: 'center'
                      }}
                      maxLength={5}
                    />
                    <Input
                      name={`phoneNumber${index}`}
                      placeholder={PLACEHOLDERS.RECRUITER_PHONE}
                      onChange={handleChange}
                      value={values[`phoneNumber${index}`]}
                      style={{ width: '80%' }}
                      maxLength={15}
                      showCount
                    />
                  </Input.Group>
                </Form.Item>

                {/* Landline Field */}
                <Form.Item
                  style={{ marginBottom: 0 }}
                  label="Landline (Optional)"
                  hasFeedback
                  validateStatus={getErrorMessage(`landline${index}`) ? "error" : ""}
                  help={getErrorMessage(`landline${index}`)}
                >
                  <Input
                    name={`landline${index}`}
                    placeholder={PLACEHOLDERS.RECRUITER_LANDLINE}
                    onChange={handleChange}
                    value={values[`landline${index}`]}
                    maxLength={20}
                  />
                </Form.Item>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Simplified Instructions */}
        <Alert
          message="Contact Information Guidelines"
          description="Primary contact information is required. Additional contacts are optional but recommended for backup communication during the recruitment process."
          type="info"
          showIcon
          style={{ 
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: 6
          }}
        />
      </Form>
    </div>
  );
};

export default RecruiterDetails;
