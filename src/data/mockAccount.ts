import type { Account, Consumption } from '@/types/kraken';

// Generate realistic consumption data for the past week
function generateWeeklyConsumption(): Consumption[] {
  const consumption: Consumption[] = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const startDate = date.toISOString().split('T')[0];
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const endDate = nextDate.toISOString().split('T')[0];
    
    // Realistic daily consumption: 8-15 kWh for electricity
    const baseUsage = 8 + Math.random() * 7;
    // Weekend usage tends to be higher
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const quantity = isWeekend ? baseUsage * 1.2 : baseUsage;
    
    consumption.push({
      startDate,
      endDate,
      quantity: Math.round(quantity * 100) / 100,
      unit: 'kWh',
    });
  }
  
  return consumption;
}

function generateGasConsumption(): Consumption[] {
  const consumption: Consumption[] = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const startDate = date.toISOString().split('T')[0];
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const endDate = nextDate.toISOString().split('T')[0];
    
    // Gas usage: 20-40 kWh equivalent per day
    const baseUsage = 20 + Math.random() * 20;
    
    consumption.push({
      startDate,
      endDate,
      quantity: Math.round(baseUsage * 100) / 100,
      unit: 'kWh',
    });
  }
  
  return consumption;
}

export const mockAccount: Account = {
  number: 'A-12B4C6D8',
  status: 'ACTIVE',
  balance: -2847, // In credit: -£28.47
  properties: [
    {
      id: 'prop-001',
      address: '42 Oak Lane, Greenfield',
      postcode: 'GF1 2AB',
      electricityMeterPoints: [
        {
          mpan: '1900027645362',
          gspGroupId: '_C', // South Eastern
          meters: [
            {
              serialNumber: '21E1234567',
              makeAndType: 'Secure Liberty 100',
              readingSource: 'Smart',
              consumption: generateWeeklyConsumption(),
            },
          ],
          agreements: [
            {
              id: 'agr-elec-001',
              validFrom: '2024-01-01T00:00:00Z',
              validTo: null,
              tariffCode: 'E-1R-AGILE-FLEX-22-11-25-C',
              product: {
                code: 'AGILE-FLEX-22-11-25',
                displayName: 'Agile Octopus',
                description: 'Smart tariff with half-hourly prices that follow the wholesale market',
                isVariable: true,
                isGreen: true,
                isTracker: false,
              },
            },
          ],
        },
      ],
      gasMeterPoints: [
        {
          mprn: '4675382910',
          meters: [
            {
              serialNumber: 'G4S12345678',
              makeAndType: 'Landis+Gyr G470',
              readingSource: 'Smart',
              consumption: generateGasConsumption(),
            },
          ],
          agreements: [
            {
              id: 'agr-gas-001',
              validFrom: '2024-01-01T00:00:00Z',
              validTo: null,
              tariffCode: 'G-1R-SUPER-GREEN-24-01-01-C',
              product: {
                code: 'SUPER-GREEN-24-01-01',
                displayName: 'Super Green Octopus',
                description: '100% renewable gas backed by biomethane',
                isVariable: false,
                isGreen: true,
                isTracker: false,
              },
            },
          ],
        },
      ],
    },
  ],
};
