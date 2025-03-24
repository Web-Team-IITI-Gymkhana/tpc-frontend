interface StatsFC {
  totalRegisteredStudentsCount: number;
  placedStudentsCount: number;
  placementPercentage: number;
  unplacedPercentage: number;
  totalOffers: number;
  totalCompaniesOffering: number;
  highestPackage: number;
  lowestPackage: number;
  meanPackage: number;
  medianPackage: number;
  modePackage: number;
}

interface DepartmentWiseStatsFC {
  [key: string]: StatsFC;
}

interface CategoryWiseStatsFC {
  GENERAL: StatsFC;
  OBC: StatsFC;
  SC: StatsFC;
  ST: StatsFC;
  PWD: StatsFC;
}

interface GenderWiseStatsFC {
  MALE: StatsFC;
  FEMALE: StatsFC;
  OTHER: StatsFC;
}

interface CourseWiseStatsFC {
  PhD: StatsFC;
  MTech: StatsFC;
  BTech: StatsFC;
  MSc: StatsFC;
  MS_Research: StatsFC;
  BTech_MTech: StatsFC;
}

interface AcademicWiseStatsFC {
  "0-1": StatsFC;
  "1-2": StatsFC;
  "2-3": StatsFC;
  "3-4": StatsFC;
  "4-5": StatsFC;
  "5-6": StatsFC;
  "6-7": StatsFC;
  "7-8": StatsFC;
  "8-9": StatsFC;
  "9-10": StatsFC;
}
export interface SeasonDataFC {
  overallStats: StatsFC;
  departmentWiseStats: DepartmentWiseStatsFC;
  categoryWiseStats: CategoryWiseStatsFC;
  genderWiseStats: GenderWiseStatsFC;
  courseWiseStats: CourseWiseStatsFC;
  academicWiseStats: AcademicWiseStatsFC;
}