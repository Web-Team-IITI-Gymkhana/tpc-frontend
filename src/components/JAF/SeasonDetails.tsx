import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import { Form, Input, Row, Col, Select, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { TermsAndConditions } from "@/dummyData/TermsAndConditions";
import axios from "axios";

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const SeasonDetails = ({
  errors,
  values,
  handleChange,
  setFieldValue,
}: StepProps) => {
  const [optionsx, setOptionsx] = useState([]);
  let options: any = [];
  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/jaf`).then((res) => {
      res.data.seasons.map((season: any) => {
        const seasonString = `${season.type} ${season.year}`
        options.push({ value: season.id, label: seasonString });
      });
      setOptionsx(options);
    });
  }, []);
  return (
    <Form layout="vertical">
      <h1 className="text-xl">Season Details</h1>
      <Row gutter={32}>
        <Col span={24}>
          <Form.Item
            label="Type"
            required
            hasFeedback
            validateStatus={!!errors.seasonId ? "error" : ""}
            help={errors.seasonId ? `${errors.seasonId}` : ""}
          >
            <Select
              onChange={(value) => setFieldValue("seasonId", value)}
              placeholder="Please Select"
              options={optionsx}
              defaultValue={values.seasonId ? `${values.seasonId}` : null}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <div className="ml-auto mr-auto flex flex-col items-start gap-8 ">
          <div className="flex flex-col items-center w-[100%] text-[1rem] gap-1 opacity-60">
            <div>Terms and Conditions</div>
            <div className=" opacity-50 text-[0.8rem]">
              {" "}
              &#40;Please read it carefully&#41;
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-3  text-[0.8rem] opacity-50">
              {TermsAndConditions.map((tc, index) => (
                <div key={index} className="flex gap-3">
                  <span>{index + 1}&#46;</span>
                  <span className=" text-justify">{tc}</span>
                </div>
              ))}
            </div>
          </div>
          <Form.Item
            required
            hasFeedback
            validateStatus={!!errors.terms ? "error" : ""}
            help={errors.terms ? `${errors.terms}` : ""}
          >
            <Checkbox
              onChange={(e) => setFieldValue("terms", e.target.checked)}
              name="terms"
              checked={values.terms}
            >
              I accept the terms and conditions
            </Checkbox>
          </Form.Item>
        </div>
      </Row>
    </Form>
  );
};

export default SeasonDetails;
