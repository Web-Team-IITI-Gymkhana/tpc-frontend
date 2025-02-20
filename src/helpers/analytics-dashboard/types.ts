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

export interface SeasonDataFC {
  overallStats: StatsFC;
  departmentWiseStats: DepartmentWiseStatsFC;
  categoryWiseStats: CategoryWiseStatsFC;
  genderWiseStats: GenderWiseStatsFC;
  courseWiseStats: CourseWiseStatsFC;
}