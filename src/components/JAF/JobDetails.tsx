import { FormikErrors, FormikValues, FormikHandlers } from "formik";
import {
  Form,
  Upload,
  message,
  Input,
  Card,
  Checkbox,
  Select,
  Row,
  Col,
  Button,
  UploadProps,
  SelectProps,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const props: UploadProps = {
  name: "attachment",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info: any) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
};

const JobDetails = ({ errors, values, handleChange }: StepProps) => {
  const [form] = Form.useForm();

  const [testType, setTestType] = useState([]);
  const [interviewType, setInterviewType] = useState([]);
  const [programs, setPrograms] = useState<SelectProps["options"]>([]);
  let testTypeOptions: any = [];
  let interviewTypeOptions: any = [];
  const programsOptions: SelectProps["options"] = [];

  useEffect(() => {
    axios.get("http://10.250.9.45:3000/api/v1/jaf").then((res) => {
      res.data.testTypes.map((it: any) => {
        testTypeOptions.push({ value: it, label: it });
      });
      setTestType(testTypeOptions);
      res.data.interviewTypes.map((it: any) => {
        interviewTypeOptions.push({ value: it, label: it });
      });
      setInterviewType(interviewTypeOptions);
      res.data.programs.map((it: any) => {
        programsOptions.push({
          value: it.id,
          label: `${it.branch} - ${it.course} - ${it.year}`,
        });
      });
      setPrograms(programsOptions);
    });
  }, []);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        tests: [{ type: "APTITUDE", duration: "" }],
        interviews: [{ type: "TECHNICAL", duration: "" }],
        salaries: [{}],
      }}
      onValuesChange={() => {
        values.interviews = form.getFieldsValue().interviews;
        values.tests = form.getFieldsValue().tests;
        console.log(form.getFieldsValue().salaries);
        let objx: any = [];
        form.getFieldsValue().salaries.map((salary: any) => {
          const obj = {
            salaryPeriod: salary.salaryPeriod, //text
            criteria: {
              programs: salary.programs ? salary.programs : [], //dropdown from backend
              genders: salary.genders ? salary.genders : [], //dropdown from backend
              categories: salary.categories ? salary.categories : [], //dropdown from backend
              minCPI: salary.minCPI ? salary.minCPI : 0, //number
              tenthMarks: salary.tenthMarks ? salary.tenthMarks : 0, //number
              twelvethMarks: salary.twelvethMarks ? salary.twelvethMarks : 0, //number
            },
            baseSalary: salary.baseSalary ? salary.baseSalary : 0,
            totalCTC: salary.totalCTC ? salary.totalCTC : 0,
            takeHomeSalary: salary.takeHomeSalary ? salary.takeHomeSalary : 0,
            grossSalary: salary.grossSalary ? salary.grossSalary : 0,
            otherCompensations: salary.otherCompensations
              ? salary.otherCompensations
              : 0, //textbox
          };
          objx.push(obj);
        });
        values.salaries = objx;
      }}
    >
      <h1 className="text-xl">Job Details</h1>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Job Title">
            <Input
              name="role"
              placeholder="Job Title"
              onChange={handleChange}
              value={values.role}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Descritption"
            // required
            // hasFeedback
            // validateStatus={!!errors.designation ? "error" : ""}
            // help={errors.designation ? `${errors.designation}`:""}
          >
            <Input
              name="description"
              placeholder="Descritption"
              onChange={handleChange}
              value={values.description}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Skill">
            <Input
              name="skills"
              placeholder="Skill"
              onChange={handleChange}
              value={values.skills}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tentative Joining Date">
            <Input
              name="joiningDate"
              placeholder="Tentative Joining Date"
              onChange={handleChange}
              value={values.joiningDate}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Location">
            <Input
              name="location"
              placeholder="Location"
              onChange={handleChange}
              value={values.location}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vacancies">
            <Input
              name="noOfVacancies"
              placeholder="Vacancies"
              onChange={handleChange}
              value={values.noOfVacancies}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Offer Letter Date">
            <Input
              name="offerLetterReleaseDate"
              placeholder="Offer Letter Date"
              onChange={handleChange}
              value={values.offerLetterReleaseDate}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Duration">
            <Input
              name="duration"
              placeholder="Duration"
              onChange={handleChange}
              value={values.duration}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Attachments">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Other Details">
        <TextArea
          rows={4}
          name="other"
          placeholder="Other Details"
          onChange={handleChange}
          value={values.other}
        />
      </Form.Item>
      <h1 className="text-xl">Selection Procedure</h1>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="Selection Mode">
            <Select
              placeholder="Please select"
              onChange={(value) => (values.selectionMode = value)}
              defaultValue={
                values.selectionMode ? `${values.selectionMode}` : null
              }
              options={[
                { value: "ONLINE", label: "Online" },
                { value: "OFFLINE", label: "Offline" },
              ]}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={8} className="mt-auto mb-auto">
          <div>
            <Checkbox
              onChange={(e) => (values.shortlistFromResume = e.target.checked)}
              name="shortlistFromResume"
              value={values.shortlistFromResume}
            >
              Shortlist From Resume
            </Checkbox>
          </div>
        </Col>
        <Col span={8} className="mt-auto mb-auto">
          <div>
            <Checkbox
              onChange={(e) => (values.groupDiscussion = e.target.checked)}
              name="groupDiscussion"
              value={values.groupDiscussion}
            >
              Group Discussion
            </Checkbox>
          </div>
        </Col>
      </Row>
      <h2 className="text-sm">Tests</h2>
      <Form.List name="tests">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Test ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Type"
                      name={[field.name, "type"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Select placeholder="Please select" options={testType} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Duration"
                      name={[field.name, "duration"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="Duration" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Test
            </Button>
          </div>
        )}
      </Form.List>

      <h2 className="text-sm mt-10">Interviews</h2>
      <Form.List name="interviews">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Interview ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Type"
                      name={[field.name, "type"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Select
                        placeholder="Please select"
                        options={interviewType}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Duration"
                      name={[field.name, "duration"]}
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="Duration" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Interview
            </Button>
          </div>
        )}
      </Form.List>
      <h2 className="text-sm mt-10">Requirements</h2>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Number Of Members">
            <Input
              name="numberOfMembers"
              placeholder="Number Of Members"
              onChange={handleChange}
              value={values.numberOfMembers}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Number Of Rooms">
            <Input
              name="numberOfRooms"
              placeholder="Number Of Rooms"
              onChange={handleChange}
              value={values.numberOfRooms}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Other Requirements">
            <TextArea
              rows={4}
              name="otherRequirements"
              placeholder="Other Requirements"
              onChange={handleChange}
              value={values.otherRequirements}
            />
          </Form.Item>
        </Col>
      </Row>
      <h1 className="text-xl">Salary</h1>
      <Form.List name="salaries">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Salary ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item
                  label="Salary Period"
                  name={[field.name, "salaryPeriod"]}
                >
                  <Input placeholder="Salary Period" />
                </Form.Item>
                <h2 className="text-sm ">Criteria</h2>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Programs" name={[field.name, "programs"]}>
                      <Select
                        mode="multiple"
                        placeholder="Please Select"
                        options={programs}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Genders" name={[field.name, "genders"]}>
                      <Select
                        mode="multiple"
                        placeholder="Please select"
                        options={[
                          { value: "MALE", label: "Male" },
                          { value: "FEMALE", label: "Female" },
                        ]}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Categories"
                      name={[field.name, "categories"]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select"
                        options={[
                          { value: "GENERAL", label: "General" },
                          { value: "PWD", label: "PWD" },
                        ]}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Min CPI" name={[field.name, "minCPI"]}>
                      <Input placeholder="Min CPI" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Tenth Marks"
                      name={[field.name, "tenthMarks"]}
                    >
                      <Input placeholder="Tenth Marks" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Twelveth Marks"
                      name={[field.name, "twelvethMarks"]}
                    >
                      <Input placeholder="Twelveth Marks" />
                    </Form.Item>
                  </Col>
                </Row>
                <h2 className="text-sm ">Salary Details</h2>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Base Salary"
                      name={[field.name, "baseSalary"]}
                    >
                      <Input placeholder="Base Salary" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Total CTC"
                      name={[field.name, "totalCTC"]}
                    >
                      <Input placeholder="Total CTC" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Take Home Salary"
                      name={[field.name, "takeHomeSalary"]}
                    >
                      <Input placeholder="Take Home Salary" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Gross Salary"
                      name={[field.name, "grossSalary"]}
                    >
                      <Input placeholder="Gross Salary" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Other Compensatons"
                  name={[field.name, "otherCompensations"]}
                >
                  <TextArea rows={4} placeholder="Other Compensatons" />
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Salary
            </Button>
          </div>
        )}
      </Form.List>
    </Form>
  );
};

export default JobDetails;
