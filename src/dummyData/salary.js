const Salary = [
    {
      id: "1",
      baseSalary: 50000,
      totalCTC: 70000,
      takeHomeSalary: 45000,
      grossSalary: 60000,
      otherCompensations: 5000,
      salaryPeriod: "Monthly",
      job: {
        id: "101",
        role: "Software Engineer",
        company: {
          id: "201",
          name: "TechCorp"
        },
        season: {
          id: "301",
          year: "2023",
          type: "INTERN"
        },
        salaries: [
          {
            id: "401",
            totalCTC: 70000,
            salaryPeriod: "Monthly",
            genders: ["MALE", "FEMALE"],
            programs: ["Engineering", "Computer Science"],
            facultyApprovals: ["Astronomy, Astrophysics and Space Engineering"],
            categories: ["GENERAL"],
            minCPI: 7.0,
            tenthMarks: 85,
            twelthMarks: 90
          }
        ]
      },
      others: "Performance bonus",
      genders: ["MALE", "FEMALE"],
      programs: ["Engineering", "Computer Science"],
      facultyApprovals: ["Astronomy, Astrophysics and Space Engineering"],
      categories: ["GENERAL"],
      minCPI: 7.0,
      tenthMarks: 85,
      twelthMarks: 90,
      facultyApprovalRequests: [
        {
          id: "501",
          status: "APPROVED",
          remarks: "Good candidate",
          faculty: {
            id: "601",
            department: "Astronomy, Astrophysics and Space Engineering",
            user: {
              id: "701",
              name: "Dr. John Doe",
              email: "john.doe@university.edu",
              contact: "1234567890"
            }
          }
        }
      ],
      onCampusOffers: [
        {
          id: "801",
          status: "ACCEPTED",
          student: {
            id: "901",
            rollNo: "123456",
            user: {
              id: "1001",
              name: "Jane Smith",
              email: "jane.smith@student.edu",
              contact: "0987654321"
            },
            program: {
              id: "1101",
              branch: "Computer Science",
              course: "B.Tech",
              year: "2023",
              department: "Astronomy, Astrophysics and Space Engineering"
            }
          }
        }
      ]
    },
    {
      id: "2",
      baseSalary: 55000,
      totalCTC: 75000,
      takeHomeSalary: 50000,
      grossSalary: 65000,
      otherCompensations: 6000,
      salaryPeriod: "Monthly",
      job: {
        id: "102",
        role: "Data Analyst",
        company: {
          id: "202",
          name: "DataInc"
        },
        season: {
          id: "302",
          year: "2023",
          type: "INTERN"
        },
        salaries: [
          {
            id: "402",
            totalCTC: 75000,
            salaryPeriod: "Monthly",
            genders: ["MALE", "FEMALE"],
            programs: ["Data Science", "Statistics"],
            facultyApprovals: ["Astronomy, Astrophysics and Space Engineering"],
            categories: ["GENERAL"],
            minCPI: 8.0,
            tenthMarks: 88,
            twelthMarks: 92
          }
        ]
      },
      others: "Annual bonus",
      genders: ["MALE", "FEMALE"],
      programs: ["Data Science", "Statistics"],
      facultyApprovals: ["Astronomy, Astrophysics and Space Engineering"],
      categories: ["GENERAL"],
      minCPI: 8.0,
      tenthMarks: 88,
      twelthMarks: 92,
      facultyApprovalRequests: [
        {
          id: "502",
          status: "APPROVED",
          remarks: "Excellent candidate",
          faculty: {
            id: "602",
            department: "Astronomy, Astrophysics and Space Engineering",
            user: {
              id: "702",
              name: "Dr. Alice Brown",
              email: "alice.brown@university.edu",
              contact: "2233445566"
            }
          }
        }
      ],
      onCampusOffers: [
        {
          id: "802",
          status: "ACCEPTED",
          student: {
            id: "902",
            rollNo: "654321",
            user: {
              id: "1002",
              name: "Tom Johnson",
              email: "tom.johnson@student.edu",
              contact: "1122334455"
            },
            program: {
              id: "1102",
              branch: "Statistics",
              course: "B.Sc",
              year: "2023",
              department: "Astronomy, Astrophysics and Space Engineering"
            }
          }
        }
      ]
    }
  ];
  
  export default Salary;