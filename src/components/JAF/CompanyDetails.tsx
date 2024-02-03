import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import { Form, Input, Row, Col, Select, SelectProps } from "antd";


type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
};

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}



const CompanyDetails = ({ errors, values, handleChange }: StepProps) => {
  

  return(
  <Form layout="vertical">
     <h1 className="text-xl">Company Details</h1>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item
          label="Company Name"
          required
          hasFeedback
          validateStatus={!!errors.compName ? "error" : ""}
          help={errors.compName ? `${errors.compName}`:""}
        >
          <Input
            name="compName"
            placeholder="Company Name"
            onChange={handleChange}
            value={values.compName}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Website"
          required
          hasFeedback
          validateStatus={!!errors.website ? "error" : ""}
          help={errors.website ? `${errors.website}`:""}
        >
          <Input
            name="website"
            placeholder="Website"
            onChange={handleChange}
            value={values.website}
          />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Domains">
        <Select          
            mode="multiple"           
            placeholder="Please Select"                                     
            defaultValue={values.domains.length ? values.domains : []}
            onChange={(value) => values.domains=value}
            options={options}
          >            
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Category">
        <Select                                   
            defaultValue={`${values.category}`}
            onChange={(value) => values.category = value}
            options={[
              { value: 'public', label: 'Public' },
              { value: 'governmnet', label: 'Governmnet' },
              { value: 'psu', label: 'PSU' },
              { value: 'mnc', label: 'MNC' },
            ]}
          >            
          </Select>
        </Form.Item>
      </Col>
    </Row>
   
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Company Size">
        <Input
            name="size"
            placeholder="Company Size"
            defaultValue={values.size}
            onChange={handleChange}
            value={values.size}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Year of Establishment">
        <Input
            name="yearOfEstablishment"
            placeholder="Year of Establishment"
            defaultValue={values.yearOfEstablishment}
            onChange={handleChange}
            value={values.yearOfEstablishment}
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Annual Turnover">
        <Input
            name="annualTurnover"
            placeholder="Annual Turnover"
            defaultValue={values.annualTurnover}
            onChange={handleChange}
            value={values.annualTurnover}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Social Media Link">
        <Input
            name="socialMediaLink"
            placeholder="Social Media Link"
            defaultValue={values.socialMediaLink}
            onChange={handleChange}
            value={values.socialMediaLink}
          />
        </Form.Item>
      </Col>
    </Row>
    <h1 className="text-xl">Address</h1>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Address Line 1">
        <Input
            name="line1"
            placeholder="Address Line 1"
            defaultValue={values.line1}
            onChange={handleChange}
            value={values.line1}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item label="Address Line 2">
        <Input
            name="line2"
            placeholder="Address Line 2"
            defaultValue={values.line2}
            onChange={handleChange}
            value={values.line2}
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="City">
        <Input
            name="city"
            placeholder="City"
            defaultValue={values.city}
            onChange={handleChange}
            value={values.city}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="State">
        <Input
            name="state"
            placeholder="State"
            defaultValue={values.state}
            onChange={handleChange}
            value={values.state}
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Zip Code">
        <Input
            name="zipCode"
            placeholder="Zip Code"
            defaultValue={values.zipCode}
            onChange={handleChange}
            value={values.zipCode}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Country">
        <Input
            name="country"
            placeholder="Country"
            defaultValue={values.country}
            onChange={handleChange}
            value={values.country}
          />
        </Form.Item>
      </Col>
    </Row>
  </Form>
)};

export default CompanyDetails;
