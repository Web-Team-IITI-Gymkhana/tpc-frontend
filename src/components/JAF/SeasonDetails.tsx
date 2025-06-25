import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import { Form, Row, Col, Select, Checkbox, Typography, Card, Divider, Alert, Space } from "antd";
import { useEffect, useState } from "react";
import { FullTime, Intern } from "./TermsAndConditions";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/jaf.constants";
import { SeasonsDto } from "../../types/jaf.types";
import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

interface SeasonOption {
  value: string;
  label: string;
  type: string;
  year: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const SeasonDetails = ({
  errors,
  values,
  handleChange,
  setFieldValue,
}: StepProps) => {
  const [seasonOptions, setSeasonOptions] = useState<SeasonOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSeasonInfo, setSelectedSeasonInfo] = useState<{type: string, year: string} | null>(null);

  // Helper function to get error message
  const getErrorMessage = (field: string): string => {
    const error = errors[field];
    return typeof error === 'string' ? error : '';
  };

  useEffect(() => {
    const fetchSeasons = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}${API_ENDPOINTS.JAF_VALUES}`);
        const seasons: SeasonsDto[] = response.data.seasons;
        
        const options: SeasonOption[] = seasons.map((season) => ({
          value: season.id,
          label: `${season.type} ${season.year}`,
          type: season.type,
          year: season.year
        }));
        
        setSeasonOptions(options);
      } catch (error) {
        console.error("Failed to fetch seasons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  const handleSeasonChange = (value: string) => {
    setFieldValue("seasonId", value);
    const selectedSeason = seasonOptions.find(option => option.value === value);
    if (selectedSeason) {
      setSelectedSeasonInfo({
        type: selectedSeason.type,
        year: selectedSeason.year
      });
    }
  };

  return (
    <div style={{ padding: '0 24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: 32, marginTop: 24 }}>
          <Title level={4} style={{ 
            marginBottom: 8, 
            color: '#1f2937',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 600
          }}>
            Job Application Form
          </Title>
          <Text style={{ fontSize: 16, color: '#6b7280' }}>
            Select recruitment season and review terms and conditions
          </Text>
        </div>

        {/* Season Selection */}
        <Card 
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <InfoCircleOutlined style={{ color: '#1890ff' }} />
              <Text strong style={{ fontSize: 16 }}>Recruitment Season</Text>
            </div>
          }
          style={{ 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            borderRadius: 8,
            border: '1px solid #e5e7eb'
          }}
        >
          <Form.Item
            required
            hasFeedback
            validateStatus={getErrorMessage("seasonId") ? "error" : ""}
            help={getErrorMessage("seasonId")}
            style={{ marginBottom: selectedSeasonInfo ? 16 : 0 }}
          >
            <Select
              size="large"
              loading={loading}
              onChange={handleSeasonChange}
              placeholder="Select the current recruitment season"
              value={values.seasonId || undefined}
              options={seasonOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              notFoundContent={loading ? "Loading seasons..." : "No seasons available"}
              style={{ width: '100%' }}
            />
          </Form.Item>

          {selectedSeasonInfo && (
            <Alert
              message={`${selectedSeasonInfo.type} Season ${selectedSeasonInfo.year}`}
              description={`Recruitment process for ${selectedSeasonInfo.type.toLowerCase()} positions`}
              type="info"
              showIcon
              style={{ 
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: 6
              }}
            />
          )}
        </Card>

        {/* Terms and Conditions */}
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircleOutlined style={{ color: '#10b981' }} />
              <Text strong style={{ fontSize: 16 }}>Terms and Conditions</Text>
            </div>
          }
          style={{ 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            borderRadius: 8,
            border: '1px solid #e5e7eb'
          }}
        >
          {selectedSeasonInfo ? (
            <div style={{ 
              marginBottom: 20,
              padding: 12,
              backgroundColor: '#f9fafb',
              borderRadius: 6,
              border: '1px solid #e5e7eb'
            }}>
             
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {(selectedSeasonInfo.type.toLowerCase() === 'intern' ? Intern : FullTime).map((tc, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      display: 'flex', 
                      gap: 10, 
                      alignItems: 'flex-start',
                      padding: '4px 0'
                    }}
                  >
                    <Text 
                      strong 
                      style={{ 
                        color: '#374151', 
                        minWidth: 20,
                        fontSize: 13,
                        fontWeight: 600
                      }}
                    >
                      {index + 1}.
                    </Text>
                    <Text 
                      style={{ 
                        textAlign: 'justify', 
                        lineHeight: 1.4,
                        fontSize: 13,
                        color: '#374151',
                        whiteSpace: 'pre-line'
                      }}
                    >
                      {tc}
                    </Text>
                  </div>
                ))}
              </Space>
            </div>
          ) : (
            <div style={{ 
              marginBottom: 20,
              padding: 24,
              textAlign: 'center',
              backgroundColor: '#f9fafb',
              borderRadius: 6,
              border: '1px solid #e5e7eb'
            }}>
              <Text style={{ color: '#6b7280', fontSize: 14 }}>
                Please select a recruitment season to view the terms and conditions
              </Text>
            </div>
          )}

          <Divider style={{ margin: '12px 0' }} />

          <Form.Item
            required
            hasFeedback
            validateStatus={getErrorMessage("terms") ? "error" : ""}
            help={getErrorMessage("terms")}
            style={{ marginBottom: 0 }}
          >
            <div style={{
              padding: 16,
              backgroundColor: values.terms ? '#f0f9ff' : '#fafafa',
              border: `2px solid ${values.terms ? '#1890ff' : '#d1d5db'}`,
              borderRadius: 8,
              transition: 'all 0.3s ease'
            }}>
              <Checkbox
                onChange={(e) => setFieldValue("terms", e.target.checked)}
                name="terms"
                checked={values.terms}
                style={{ fontSize: 15 }}
              >
                <Text strong style={{ color: values.terms ? '#1890ff' : '#374151' }}>
                  I acknowledge that I have read, understood, and agree to comply with all the terms and conditions stated above
                </Text>
              </Checkbox>
            </div>
          </Form.Item>

        </Card>

      </Space>
    </div>
  );
};

export default SeasonDetails;
