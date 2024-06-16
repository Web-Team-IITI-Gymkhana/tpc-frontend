export interface OnCampusOffers {
    id: string;
    status: string;
    salary: {
        id: string;
        baseSalary: number;
        totalCTC: number;
        takeHomeSalary: number;
        grossSalary: number;
        otherCompensations: number;
        job: {
        id: string;
        role: string;
        others: string;
        company: {
            id: string;
            name: string;
            category: string;
        };
        season: {
            id: string;
            year: string;
            type: string;
        };
        };
    };
}

export interface OffCampusOffer {
    id: string;
    salary: number;
    salaryPeriod: string;
    metadata: string;
    role: string;
    status: string;
    company: {
      id: string;
      name: string;
      category: string;
    };
    season: {
      id: string;
      year: string;
      type: string;
    };
}

export interface Resume {
    id: string;
    filepath: string;
    verified: boolean;
}

export interface Salary {
  id: string;
  salaryPeriod: string;
  others: string;
  baseSalary: number;
  totalCTC: number;
  takeHomeSalary: number;
  grossSalary: number;
  otherCompensations: number;
  job: {
    id: string;
    role: string;
    others: string;
    selectionProcedure: {
      tests: {
        type: string;
        duration: number;
      }[];
      interviews: {
        type: string;
        duration: number;
      }[];
      requirements: {
        numberOfMembers: number;
        numberOfRooms: number;
        otherRequirements: string;
      };
      selectionMode: string;
      groupDiscussion: boolean;
      shortlistFromResume: boolean;
    };
    location: string;
    offerLetterReleaseDate: string;
    duration: number;
    season: {
      id: string;
      year: string;
      type: string;
    };
    company: {
      id: string;
      name: string;
      domains: string[];
      category: string;
    };
    applications: {
      id: string;
      eventId: string;
      resume: {
        id: string;
        filepath: string;
        verified: boolean;
      };
    }[];
    events: {
      id: string;
      roundNumber: number;
      type: string;
      startDateTime: string;
      endDateTime: string;
    }[];
    jobCoordinators: {
      id: string;
      role: string;
      tpcMember: {
        id: string;
        department: string;
        role: string;
        user: {
          id: string;
          email: string;
          name: string;
          contact: string;
        };
      };
    }[];
  };
}


export interface Jobs {
  id: string;
  role: string;
  active: boolean;
  currentStatus: string;
  location: string;
  season: {
    id: string;
    year: string;
    type: string;
  };
  company: {
    id: string;
    name: string;
  };
  recruiter: {
    id: string;
    designation: string;
    user: {
      id: string;
      email: string;
      name: string;
      contact: string;
    };
  };
}

export interface Job {
    id: string;
    role: string;
    active: boolean;
    currentStatus: string;
  
    companyDetailsFilled: {
      name: string;
      size: number;
      address: {
        city: string;
        line1: string;
        state: string;
        country: string;
      };
      domains: string[];
      website: string;
      category: string;
      yearOfEstablishment: string;
    };
  
    recruiterDetailsFilled: {
      name: string;
      email: string;
      contact: string;
      designation: string;
    };
  
    selectionProcedure: {
      tests: {
        type: string;
        duration: number;
      }[];
      interviews: {
        type: string;
        duration: number;
      }[];
      requirements: {
        numberOfMembers: number;
        numberOfRooms: number;
        otherRequirements: string;
      };
      selectionMode: string;
      groupDiscussion: boolean;
      shortlistFromResume: boolean;
    };
  
    description: string;
    skills: string;
    location: string;
    noOfVacancies: number;
    joiningDate: string;
    duration: number;
  
    season: {
      id: string;
      year: string;
      type: string;
    };
  
    company: {
      id: string;
      name: string;
    };
  
    recruiter: {
      id: string;
      designation: string;
      user: {
        id: string;
        email: string;
        name: string;
        contact: string;
      };
    };
  
    jobCoordinators: {
      id: string;
      role: string;
      tpcMember: {
        id: string;
        department: string;
        role: string;
        user: {
          id: string;
          email: string;
          name: string;
          contact: string;
        };
      };
    }[];
  
    events: {
      id: string;
      roundNumber: number;
      type: string;
      metadata: string;
      startDateTime: string;
      endDateTime: string;
      visibleToRecruiter: boolean;
    }[];
  
    salaries: {
      id: string;
      salaryPeriod: string;
      programs: string[];
      genders: string[];
      categories: string[];
      minCPI: number;
      tenthMarks: number;
      twelthMarks: number;
      facultyApprovals: string[];
      baseSalary: number;
      totalCTC: number;
      takeHomeSalary: number;
      grossSalary: number;
      otherCompensations: number;
      others?: string;
    }[];
}
  

export interface CustomEvent {
    id: string;
    roundNumber: number;
    type: string;
    metadata: string;
    startDateTime: string;
    endDateTime: string;
    visibleToRecruiter: boolean;
}
  
export interface EventData {
    date: string;
    status: string;
    title: string;
}

export interface CalenderEvent {
  day: number;
  description: string;
  id: string;
  label: string;
  timeFrom: string;
  timeTo: string;
  title: string;
}

export interface StudentDataType {
  id: string;
  rollNo: string;
  category: string;
  gender: string;
  cpi: number;
  tenthMarks: number;
  twelthMarks: number;
  user: {
      id: string;
      email: string;
      name: string;
      contact: string;
  };
  program: {
      id: string;
      course: string;
      branch: string;
      department: string;
      year: string;
  };
  penalties: {
      id: string;
      penalty: number;
      reason: string;
  }[];
  registrations: {
      id: string;
      registered: boolean;
      season: {
          id: string;
          year: string;
          type: string;
      };
  }[];
}