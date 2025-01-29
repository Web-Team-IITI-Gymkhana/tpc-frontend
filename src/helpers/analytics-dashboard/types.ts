export interface PlacementSeasonFC {
    year: number
    type: 'placement' | 'internship'
  }
  
  export interface DataRibbonStatsFC {
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
  
  export interface ChartDataFC {
    [key: string]: {
      chart: any[]
      total: number
    }
  }