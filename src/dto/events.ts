import { Resume } from "./ResumeDto";
import { Salary } from "./SalaryDto";
import { CompanyDTO, SeasonDTO } from "./JobDto";
import { User } from "./StudentDto";
import { StudentDataType } from "@/helpers/student/types";

interface EventFC {
    id: string;
    roundNumber: number;
    type: string;
    metadata: string;
    startDateTime: string;
    endDateTime: string;
    visibleToRecruiter: boolean;
    job: Job;
}

interface Job {
    id: string;
    role: string;
    company: CompanyDTO;
    season: SeasonDTO;
    salaries: Salary[];
}

interface Application {
    id: string;
    student: StudentDataType;
    resume: Resume;
  }

const eventDto = [{
    "id": "string",
    "roundNumber": 0,
    "type": "POLL",
    "metadata": "string",
    "startDateTime": "2024-08-31T18:18:22.490Z",
    "endDateTime": "2024-08-31T18:18:22.490Z",
    "visibleToRecruiter": true,
    "job": {
      "id": "string",
      "role": "string",
      "company": {
        "id": "string",
        "name": "string"
      },
      "season": {
        "id": "string",
        "year": "string",
        "type": "INTERN"
      },
      "salaries": [
        {
          "id": "string",
          "totalCTC": 0,
          "salaryPeriod": "string",
          "genders": [
            "MALE"
          ],
          "programs": [
            "string"
          ],
          "facultyApprovals": [
            "Astronomy, Astrophysics and Space Engineering"
          ],
          "categories": [
            "GENERAL"
          ],
          "minCPI": 0,
          "tenthMarks": 0,
          "twelthMarks": 0
        }
      ]
    }
  }];

export type { EventFC, Job, Application };
export { eventDto };
