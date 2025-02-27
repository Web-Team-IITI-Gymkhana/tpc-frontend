import { FormikErrors, FormikValues, FormikHandlers, Formik, Field } from "formik";
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
  List,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './styles/CustomQuill.css';
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const { TextArea } = Input;

type StepProps = {
  errors: FormikErrors<FormikValues>;
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
  setFieldValue: (field: string, value: any) => void;
};

const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const JobDetails = ({ errors, values, handleChange, setFieldValue }: StepProps) => {
  const [form] = Form.useForm();

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [fileList, setFileList] = useState([]);

  const [testType, setTestType] = useState([]);
  const [seasonType, setSeasonType] = useState("");
  const [interviewType, setInterviewType] = useState([]);
  const [programs, setPrograms] = useState<SelectProps["options"]>([]);
  let testTypeOptions: any = [];
  let interviewTypeOptions: any = [];
  const programsOptions: SelectProps["options"] = [];

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleFileChange = async (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log('Uploading:', info.file, info.fileList);
    }
    if (info.file.status === "done") {
      const file = info.file.originFileObj;
      try {
        const base64String = await getBase64(file);
        const files=values.attachments;
        files.push(base64String);
        setFieldValue("attachments", files);
        console.log(values.attachments);
        message.success(`${info.file.name} file uploaded successfully`);
      } catch (error) {
        message.error("File conversion to Base64 failed.");
      }
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    
    setFileList(info.fileList);
  };

  const addSkill = () => {
    if (skillInput) {
      const updatedSkills = [...skills, skillInput];
      setSkills(updatedSkills);
      setSkillInput("");
      setFieldValue("skills", updatedSkills);
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    setFieldValue("skills", updatedSkills);
  };

  const handleSkillChange = (newSkills: string[]) => {
    setSkills(newSkills);
    setFieldValue("skills", newSkills); 
  }

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/jaf`).then((res) => {
      res.data.testTypes.map((it: any) => {
        testTypeOptions.push({ value: it, label: it });
      });
      setTestType(testTypeOptions);
      res.data.interviewTypes.map((it: any) => {
        interviewTypeOptions.push({ value: it, label: it });
      });
      setInterviewType(interviewTypeOptions);

      const matchingSeason = res.data.seasons.find(
        (season) => season.id === values.seasonId
      );

      if (matchingSeason) {
        setSeasonType(matchingSeason.type);
      }
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
        let objx: any = [];
        form.getFieldsValue().salaries.map((salary: any) => {
          const obj = {
            salaryPeriod: salary.salaryPeriod || "", // text
            programs: salary.programs || [], // dropdown from backend
            genders: salary.genders || [], // dropdown from backend
            categories: salary.categories || [], // dropdown from backend
            isBacklogAllowed: salary.isBacklogAllowed || "", // dropdown from backend
            minCPI: salary.minCPI || 0, // number
            tenthMarks: salary.tenthMarks || 0, // number
            twelthMarks: salary.twelthMarks || 0, // number
            baseSalary: salary.baseSalary || 0,

            //PLACEMENT
            totalCTC: salary.totalCTC || 0,
            takeHomeSalary: salary.takeHomeSalary || 0,
            grossSalary: salary.grossSalary || 0,
            joiningBonus: salary.joiningBonus || 0,
            performanceBonus: salary.performanceBonus || 0,
            relocation: salary.relocation || 0,
            bondAmount: salary.bondAmount || 0,
            esopAmount: salary.esopAmount || 0,
            esopVestPeriod: salary.esopVestPeriod || "", // text
            firstYearCTC: salary.firstYearCTC || 0,
            retentionBonus: salary.retentionBonus || 0,
            deductions: salary.deductions || 0,
            medicalAllowance: salary.medicalAllowance || 0,
            bondDuration: salary.bondDuration || "", // text
            foreignCurrencyCTC: salary.foreignCurrencyCTC || 0,
            foreignCurrencyCode: salary.foreignCurrencyCode || "", // text
            otherCompensations: salary.otherCompensations || 0, // textbox
            others: salary.others || "", // text
          
            // Internship-related fields
            stipend: salary.stipend || 0,
            foreignCurrencyStipend: salary.foreignCurrencyStipend || 0,
            accommodation: salary.accommodation || 0,
            tentativeCTC: salary.tentativeCTC || 0,
            PPOConfirmationDate: salary.PPOConfirmationDate || null, // date
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
        <Form.Item label="Offer Letter Date">
            <Input
              type="date"
              name="offerLetterReleaseDate"
              placeholder="Offer Letter Date"
              onChange={handleChange}
              value={values.offerLetterReleaseDate}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tentative Joining Date">
            <Input
              type="date"
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
        <Form.Item label="Expected number of Hires">
            <Input
              type="number"
              name="expectedNoOfHires"
              placeholder="Expected number of Hires"
              onChange={handleChange}
              value={values.expectedNoOfHires}
            />
          </Form.Item>
        </Col>       
      </Row>
      <Row gutter={24}>        
        <Col span={12}>
          <Form.Item label="Minimum number of Hires">
            <Input
              type="number"
              name="minNoOfHires"
              placeholder="Minimum number of Hires"
              onChange={handleChange}
              value={values.minNoOfHires}
            />
          </Form.Item>
        </Col>        
        <Col span={12}>
          
        </Col>        
      </Row>
      <Row gutter={24}>        
        <Col span={24}>
        <Form.Item label="Skills">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Enter a skill and press Enter"
            value={skills}
            onChange={handleSkillChange}
          />
        </Form.Item>
        </Col>     
      </Row>
      <Form.Item label="Description" className="my-3">
        <Field name="description">
          {({ field }) => (
            <ReactQuill
              value={values.description}
              onChange={(content) => setFieldValue('description', content)}
              placeholder="Enter the description here..."
              className="custom-quill"
            />
          )}
        </Field>
      </Form.Item>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Attachments">
          <Upload
            fileList={fileList} 
            onChange={handleFileChange}
          >
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
                { value: "HYBRID", label: "Hybrid" },
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
              type="number"
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
              type="number"
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
                          { value: "OTHER", label: "Other" },
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
                          { value: "SC", label: "SC" },
                          { value: "ST", label: "ST" },
                          { value: "OBC", label: "OBC" },
                          { value: "PWD", label: "PWD" },
                        ]}
                      ></Select>
                    </Form.Item>
                  </Col>                  
                  <Col span={12}>
                    <Form.Item
                      label="Backlogs"
                      name={[field.name, "isBacklogAllowed"]}
                    >
                      <Select
                        placeholder="Please select"
                        options={[
                          { value: "PREVIOUS", label: "No Active Backlogs" },
                          { value: "NEVER", label: "No Backlogs at All" },
                          { value: "ACTIVE", label: "Doesn't Matter" },
                        ]}
                      ></Select>
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
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Min CPI" name={[field.name, "minCPI"]}>
                      <Input placeholder="Min CPI" />
                    </Form.Item>
                  </Col>
                </Row>
                {seasonType === "PLACEMENT" ? (
                  <>
                    <h2 className="text-sm">Placement Details</h2>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Base Salary"
                          name={[field.name, "baseSalary"]}
                        >
                          <Input type="number" placeholder="Base Salary" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Total CTC"
                          name={[field.name, "totalCTC"]}
                        >
                          <Input type="number" placeholder="Total CTC" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Take Home Salary"
                          name={[field.name, "takeHomeSalary"]}
                        >
                          <Input type="number" placeholder="Take Home Salary" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Gross Salary"
                          name={[field.name, "grossSalary"]}
                        >
                          <Input type="number" placeholder="Gross Salary" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Joining Bonus"
                          name={[field.name, "joiningBonus"]}
                        >
                          <Input type="number" placeholder="Joining Bonus" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Performance Bonus"
                          name={[field.name, "performanceBonus"]}
                        >
                          <Input type="number" placeholder="Performance Bonus" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Relocation"
                          name={[field.name, "relocation"]}
                        >
                          <Input type="number" placeholder="Relocation" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Bond Amount"
                          name={[field.name, "bondAmount"]}
                        >
                          <Input type="number" placeholder="Bond Amount" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="ESOP Amount"
                          name={[field.name, "esopAmount"]}
                        >
                          <Input type="number" placeholder="ESOP Amount" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="ESOP Vest Period"
                          name={[field.name, "esopVestPeriod"]}
                        >
                          <Input placeholder="ESOP Vest Period" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="First Year CTC"
                          name={[field.name, "firstYearCTC"]}
                        >
                          <Input type="number" placeholder="First Year CTC" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Retention Bonus"
                          name={[field.name, "retentionBonus"]}
                        >
                          <Input type="number" placeholder="Retention Bonus" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Deductions"
                          name={[field.name, "deductions"]}
                        >
                          <Input type="number" placeholder="Deductions" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Medical Allowance"
                          name={[field.name, "medicalAllowance"]}
                        >
                          <Input type="number" placeholder="Medical Allowance" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Bond Duration"
                          name={[field.name, "bondDuration"]}
                        >
                          <Input placeholder="Bond Duration" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Foreign Currency CTC"
                          name={[field.name, "foreignCurrencyCTC"]}
                        >
                          <Input type="number" placeholder="Foreign Currency CTC" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Foreign Currency Code"
                          name={[field.name, "foreignCurrencyCode"]}
                        >
                          <Input placeholder="Foreign Currency Code" maxLength={3} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <h2 className="text-sm">Internship Details</h2>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Stipend"
                          name={[field.name, "stipend"]}
                        >
                          <Input type="number" placeholder="Stipend" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Foreign Currency Stipend"
                          name={[field.name, "foreignCurrencyStipend"]}
                        >
                          <Input placeholder="Foreign Currency Stipend" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label="Accommodation"
                          name={[field.name, "accommodation"]}
                        >
                          <Input type="number" placeholder="Accommodation" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Tentative CTC"
                          name={[field.name, "tentativeCTC"]}
                        >
                          <Input type="number" placeholder="Tentative CTC" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      label="PPO Confirmation Date"
                      name={[field.name, "PPOConfirmationDate"]}
                    >
                      <Input type="date" />
                    </Form.Item>
                  </>
                )}
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
