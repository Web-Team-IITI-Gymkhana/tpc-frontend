import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import { Form, Input, Row, Col, Select, SelectProps, InputNumber } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

type StepProps = {
    errors: FormikErrors<FormikValues>;
    values: FormikValues;
    handleChange: FormikHandlers["handleChange"];
};

const CompanyDetails = ({ errors, values, handleChange }: StepProps) => {
    const [domains, setDomains] = useState<SelectProps["options"]>([]);
    const [countries, setCountries] = useState([]);
    let countryOptions: any = [];
    const options: SelectProps["options"] = [];
    useEffect(() => {
        axios.get("http://10.250.9.45:3000/api/v1/jaf").then((res) => {
            res.data.domains.map((domain: any) => {
                options.push({ value: domain, label: domain });
            });
            setDomains(options);
            res.data.countries.map((it: any) => {
                countryOptions.push({ value: it, label: it });
            });
            setCountries(countryOptions);
        });
    }, []);

    return (
        <Form layout="vertical">
            <h1 className="text-xl">Company Details</h1>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        label="Company Name"
                        required
                        hasFeedback
                        validateStatus={!!errors.compName ? "error" : ""}
                        help={errors.compName ? `${errors.compName}` : ""}
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
                        help={errors.website ? `${errors.website}` : ""}
                    >
                        <Input name="website" placeholder="Website" onChange={handleChange} value={values.website} />
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
                            onChange={(value) => (values.domains = value)}
                            options={domains}
                        ></Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Category">
                        <Select
                            placeholder="Please Select"
                            defaultValue={values.category ? `${values.category}` : null}
                            onChange={(value) => (values.category = value)}
                            options={[
                                { value: "PUBLIC", label: "Public" },
                                { value: "GOVERNMENT", label: "Governmnet" },
                                { value: "PSU", label: "PSU" },
                                { value: "MNC", label: "MNC" },
                            ]}
                        ></Select>
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
                        <Select
                            onChange={(value) => (values.country = value)}
                            placeholder="Please Select"
                            options={countries}
                            defaultValue={values.country ? `${values.country}` : null}
                        ></Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default CompanyDetails;
