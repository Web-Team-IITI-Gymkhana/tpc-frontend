// dto.ts

// Define the User type
type User = {
    name: string;
    email: string;
    contact: string;
};

// Define the Program type
type Program = {
    course: string;
    branch: string;
    year: number;
};

// Define the main DTO type
type DTO = {
    id: string;
    userId: string;
    programId: string;
    rollNo: number;
    category: string;
    gender: 'MALE' | 'FEMALE'; // Assuming gender can have more than one value
    cpi: number;
    user: User;
    program: Program;
};

const jsondto = [
    {
        "id": "string",
        "userId": "string",
        "programId": "string",
        "rollNo": "number",
        "category": "string",
        "gender": "MALE",
        "cpi": "number",
        "user": {
            "name": "string",
            "email": "string",
            "contact": "string"
        },
        "program": {
            "course": "string",
            "branch": "string",
            "year": "number"
        }
    }
]

export type { DTO, User, Program };
export {jsondto}
