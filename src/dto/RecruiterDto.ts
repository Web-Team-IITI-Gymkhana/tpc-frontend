
interface RecruiterDTO {
    id: string;
    designation: string;
    landline: string;
    user: {
      id: string;
      name: string;
      email: string;
      contact: string;
    };
    company: {
      id: string;
      name: string;
    };
  }
  

const recruiterdto = [
    {
      "id": "string",
      "designation": "string",
      "landline": "string",
      "user": {
        "id": "string",
        "name": "string",
        "email": "string",
        "contact": "string"
      },
      "company": {
        "id": "string",
        "name": "string"
      }
    }
  ]
export type {RecruiterDTO}
export {recruiterdto};