import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import { Form, Input, Row, Col, Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
};

const SeasonDetails = ({ errors, values, handleChange }: StepProps) => {
  const [optionsx, setOptionsx] = useState([]);
  let options: any = [];
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jaf`).then((res) => {
      console.log(res.data)
      res.data.seasons.map((season: any) => {
        options.push({ value: season.id, label: season.type });
      });
      setOptionsx(options);
    });
  }, []);
  return (
    <Form layout="vertical">
      <h1 className="text-xl">Season Details</h1>
      <Row gutter={32}>
        {/* <Col span={12}>
        <Form.Item label="Year"                             
        >
           <Select                                   
            defaultValue={`${values.year}`}
            onChange={(value) => values.year = value}
            options={[
              { value: '2024', label: '2024' },
              { value: '2025', label: '2025' },
              { value: '2026', label: '2026' },
              { value: '2027', label: '2027' },
            ]}
          >            
          </Select>
        </Form.Item>
      </Col> */}
        <Col span={24}>
          <Form.Item label="Type">
            <Select
              onChange={(value) => (values.seasonId = value)}
              placeholder="Please Select"
              options={optionsx}
              defaultValue={values.seasonId ? `${values.seasonId}` : null}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SeasonDetails;
