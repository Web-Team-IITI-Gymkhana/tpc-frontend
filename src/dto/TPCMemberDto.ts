// TPC Member DTO matching the API response structure
export interface TPCMemberDTO {
  id: string;
  role: "MANAGER" | "COORDINATOR";
  student: {
    id: string;
    program: {
      id: string;
      branch: string;
      course: "BTech" | "MTech" | "MTech / MS(Research)" | "PhD";
      year: string;
      department: string;
    };
    user: {
      id: string;
      name: string;
      email: string;
      contact: string;
    };
  };
}

// Column mapping for the table - using array format like StudentDto
export const jsondto = [
  {
    id: "string",
    role: "MANAGER",
    student: {
      id: "string",
      program: {
        id: "string",
        branch: "string",
        course: "BTech",
        year: "string",
        department: "string",
      },
      user: {
        id: "string",
        name: "string",
        email: "string",
        contact: "string",
      },
    },
  },
];

export type { TPCMemberDTO as DTO };
