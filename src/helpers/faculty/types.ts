export interface updateProfileFC {
    user: {
      name: string;
      email: string;
      contact: string;
    };
}

export interface ProfileFC {
    id: "string";
    department: "string";
    user: {
      id: "string";
      name: "string";
      email: "string";
      contact: "string";
    };
}