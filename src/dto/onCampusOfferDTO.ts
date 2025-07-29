const onCampusOfferDTO = [
  {
    status: "string",
    student: {
        rollNo: "string",
        user: {
          name: "string",
          email: "string",
          contact: "string",
        },
        program: {
          course: "string",
          branch: "string",
          department: "string",
          year: "string",
        },
    },
    salary: {
        job: {
            role: "string",
            season: {
                year: "string",
                type: "string",
            },
            company: {
                name: "string",
            },
        },
      totalCTC: "number",
      firstYearCTC: "number",
      stipend: "number",
      otherCompensations: "number",
      salaryPeriod: "string",
    },
  },
];

export { onCampusOfferDTO };