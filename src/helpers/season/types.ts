export interface ApplicationFC {
  id: string;
  registered: boolean;
  season: {
    id: string;
    type: string;
    year: string;
  };
  student: {
    id: string;
    program: {
      branch: string;
      course: string;
      department: string;
      id: string;
      year: string;
    };
    rollNo: string;
    user: {
      contact: string;
      email: string;
      id: string;
      name: string;
    };
  };
}

export interface SeasonFC {
  id: string;
  year: string;
  type: string;
  status: string;
  policyDocument?: string;
  applications?: [ApplicationFC];
}
