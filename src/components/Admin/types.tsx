export interface JobCoordinatorFC {
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
}

export interface TPCMember {
  id: string;
  department: string;
  role: string;
  user: {
    id: string;
    name: string;
    email: string;
    contact: string;
  };
}
