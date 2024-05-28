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

export interface Resume {
    id: string;
    filepath: string;
    verified: boolean;
}

export interface Salary {
    id: string;
    baseSalary: number;
    totalCTC: number;
    takeHomeSalary: number;
    grossSalary: number;
    otherCompensations: number;
    salaryPeriod: string;
    job: {
        id: string;
        role: string;
        company: {
        id: string;
        name: string;
        };
        season: {
        id: string;
        year: string;
        type: string; // Assuming "INTERN" is a possible value, you might want to use a union type if there are more types.
        };
        salaries: {
        id: string;
        totalCTC: number;
        salaryPeriod: string;
        genders: string[]; // Assuming "MALE" is a possible value, you might want to use a union type if there are more genders.
        programs: string[];
        facultyApprovals: string[];
        categories: string[]; // Assuming "GENERAL" is a possible value, you might want to use a union type if there are more categories.
        minCPI: number;
        tenthMarks: number;
        twelthMarks: number;
        }[];
    };
    others: string;
    genders: string[]; // Assuming "MALE" is a possible value, you might want to use a union type if there are more genders.
    programs: string[];
    facultyApprovals: string[];
    categories: string[]; // Assuming "GENERAL" is a possible value, you might want to use a union type if there are more categories.
    minCPI: number;
    tenthMarks: number;
    twelthMarks: number;
    facultyApprovalRequests: {
        id: string;
        status: string; // Assuming "APPROVED" is a possible value, you might want to use a union type if there are more statuses.
        remarks: string;
        faculty: {
        id: string;
        department: string; // Assuming "Astronomy, Astrophysics and Space Engineering" is a possible value, you might want to use a union type if there are more departments.
        user: {
            id: string;
            name: string;
            email: string;
            contact: string;
        };
        };
    }[];
    onCampusOffers: {
        id: string;
        status: string;
        student: {
        id: string;
        rollNo: string;
        user: {
            id: string;
            name: string;
            email: string;
            contact: string;
        };
        program: {
            id: string;
            branch: string;
            course: string;
            year: string;
            department: string;
        };
        };
    }[];
}