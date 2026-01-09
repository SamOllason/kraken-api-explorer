// TypeScript type definitions for Kraken/Octopus Energy data structures

export interface Account {
  number: string;
  status: 'ACTIVE' | 'PENDING' | 'CLOSED';
  balance: number; // in pence
  properties: Property[];
}

export interface Property {
  id: string;
  address: string;
  postcode: string;
  electricityMeterPoints: ElectricityMeterPoint[];
  gasMeterPoints: GasMeterPoint[];
}

export interface ElectricityMeterPoint {
  mpan: string;
  meters: Meter[];
  agreements: Agreement[];
  gspGroupId: string; // Grid Supply Point region
}

export interface GasMeterPoint {
  mprn: string;
  meters: Meter[];
  agreements: Agreement[];
}

export interface Meter {
  serialNumber: string;
  makeAndType?: string;
  readingSource?: string;
  consumption?: Consumption[];
}

export interface Agreement {
  id: string;
  validFrom: string;
  validTo: string | null;
  tariffCode: string;
  product?: Product;
}

export interface Product {
  code: string;
  displayName: string;
  description: string;
  isVariable: boolean;
  isGreen: boolean;
  isTracker: boolean;
  exitFeesPerFuel?: number;
}

export interface Consumption {
  startDate: string;
  endDate: string;
  quantity: number; // kWh
  unit: 'kWh' | 'm³';
}

export interface TariffRate {
  validFrom: string;
  validTo: string | null;
  valueIncVat: number; // pence per kWh
  valueExcVat: number;
}

export interface DecodedTariff {
  fuelType: 'E' | 'G'; // Electricity or Gas
  rateType: '1R' | '2R'; // Single rate or Two rate (Economy 7)
  productCode: string;
  launchDate: string;
  regionCode: string;
  regionName: string;
}

export interface EnergyConcept {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  apiPath?: string;
  graphqlQuery?: string;
  format?: {
    example: string;
    segments?: Array<{
      value: string;
      label: string;
      color: string;
    }>;
  };
  relatedConcepts: string[];
}

export interface SchemaNode {
  name: string;
  type: string;
  description: string;
  children?: SchemaNode[];
  isExpanded?: boolean;
}
