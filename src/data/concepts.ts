import type { EnergyConcept } from '@/types/kraken';

export type ConceptId = 
  | 'accountNumber'
  | 'mpan'
  | 'mprn'
  | 'tariffCode'
  | 'gspRegion'
  | 'balance'
  | 'meter'
  | 'consumption'
  | 'standingCharge'
  | 'unitRate'
  | 'property';

export const concepts: Record<ConceptId, EnergyConcept> = {
  accountNumber: {
    id: 'accountNumber',
    title: 'Account Number',
    icon: '🏦',
    shortDescription: 'Your unique customer identifier',
    fullDescription: `The account number is your unique identifier in the Kraken system. It's used to link all your properties, meters, and billing information together.

Each account number follows a specific format: a letter prefix followed by alphanumeric characters. This format helps the system quickly categorize and route account queries.

In the API, accounts are the top-level entity - everything else (properties, meters, agreements) lives underneath an account.`,
    apiPath: 'account.number',
    graphqlQuery: `query AccountDetails($accountNumber: String!) {
  account(accountNumber: $accountNumber) {
    number
    status
    balance
    properties {
      address
    }
  }
}`,
    format: {
      example: 'A-12B4C6D8',
      segments: [
        { value: 'A', label: 'Account type', color: '#A855F7' },
        { value: '-', label: 'Separator', color: '#6E7681' },
        { value: '12B4C6D8', label: 'Unique ID', color: '#58A6FF' },
      ],
    },
    relatedConcepts: ['property', 'balance'],
  },

  mpan: {
    id: 'mpan',
    title: 'MPAN',
    icon: '⚡',
    shortDescription: 'Meter Point Administration Number',
    fullDescription: `The MPAN (Meter Point Administration Number) is a 13-digit reference that uniquely identifies your electricity supply point. It's not the same as your meter serial number - the MPAN stays the same even if you change meters.

The MPAN is crucial for:
• Switching energy suppliers
• Getting accurate quotes
• Identifying your specific connection to the grid

Think of it as your electricity supply's "address" in the national grid system.`,
    apiPath: 'account.properties[].electricityMeterPoints[].mpan',
    graphqlQuery: `query ElectricityMeterPoints($accountNumber: String!) {
  account(accountNumber: $accountNumber) {
    properties {
      electricityMeterPoints {
        mpan
        meters {
          serialNumber
        }
        agreements {
          tariffCode
        }
      }
    }
  }
}`,
    format: {
      example: '1900027645362',
      segments: [
        { value: '19', label: 'Profile class', color: '#FCD34D' },
        { value: '000', label: 'Line loss factor', color: '#F97316' },
        { value: '276', label: 'Distributor ID', color: '#A855F7' },
        { value: '45362', label: 'Unique ID', color: '#58A6FF' },
      ],
    },
    relatedConcepts: ['meter', 'gspRegion', 'tariffCode'],
  },

  mprn: {
    id: 'mprn',
    title: 'MPRN',
    icon: '🔥',
    shortDescription: 'Meter Point Reference Number',
    fullDescription: `The MPRN (Meter Point Reference Number) is the gas equivalent of an MPAN. It uniquely identifies your gas supply point and is typically 6-10 digits long.

Like the MPAN, it stays the same regardless of:
• Which supplier you're with
• What meter is installed
• Who lives at the property

Your MPRN is assigned by the gas transporter for your area and is essential for switching suppliers or getting quotes.`,
    apiPath: 'account.properties[].gasMeterPoints[].mprn',
    graphqlQuery: `query GasMeterPoints($accountNumber: String!) {
  account(accountNumber: $accountNumber) {
    properties {
      gasMeterPoints {
        mprn
        meters {
          serialNumber
        }
        agreements {
          tariffCode
        }
      }
    }
  }
}`,
    format: {
      example: '4675382910',
      segments: [
        { value: '4675382910', label: 'Unique supply point ID', color: '#F97316' },
      ],
    },
    relatedConcepts: ['meter', 'tariffCode'],
  },

  tariffCode: {
    id: 'tariffCode',
    title: 'Tariff Code',
    icon: '🏷️',
    shortDescription: 'Encoded product and pricing information',
    fullDescription: `Tariff codes are structured identifiers that encode multiple pieces of information about your energy product in a single string.

A typical tariff code like "E-1R-AGILE-FLEX-22-11-25-C" tells you:
• Fuel type (E = electricity, G = gas)
• Rate structure (1R = single rate, 2R = two rate/Economy 7)
• Product name (AGILE-FLEX)
• Launch date (22-11-25 = November 25, 2022)
• Region code (C = South Eastern England)

Click on the tariff code in the dashboard to see an interactive decoder!`,
    apiPath: 'account.properties[].electricityMeterPoints[].agreements[].tariffCode',
    graphqlQuery: `query TariffDetails($accountNumber: String!) {
  account(accountNumber: $accountNumber) {
    properties {
      electricityMeterPoints {
        agreements(active: true) {
          tariffCode
          validFrom
          validTo
          product {
            displayName
            description
          }
        }
      }
    }
  }
}`,
    format: {
      example: 'E-1R-AGILE-FLEX-22-11-25-C',
      segments: [
        { value: 'E', label: 'Fuel', color: '#FCD34D' },
        { value: '1R', label: 'Rate type', color: '#A855F7' },
        { value: 'AGILE-FLEX', label: 'Product', color: '#00DC82' },
        { value: '22-11-25', label: 'Launch date', color: '#58A6FF' },
        { value: 'C', label: 'Region', color: '#F97316' },
      ],
    },
    relatedConcepts: ['unitRate', 'standingCharge', 'gspRegion'],
  },

  gspRegion: {
    id: 'gspRegion',
    title: 'GSP Region',
    icon: '🗺️',
    shortDescription: 'Grid Supply Point region',
    fullDescription: `The UK electricity grid is divided into 14 GSP (Grid Supply Point) regions, labeled A through P (excluding I and O to avoid confusion with 1 and 0).

Each region has different:
• Network costs
• Energy prices
• Distribution companies

The region code appears in tariff codes and affects your unit rates. For example, region C (South Eastern) might have different pricing than region A (Eastern).

Understanding your GSP region helps explain why neighbors in different areas might pay different rates.`,
    apiPath: 'account.properties[].electricityMeterPoints[].gspGroupId',
    graphqlQuery: `query GSPRegion($accountNumber: String!) {
  account(accountNumber: $accountNumber) {
    properties {
      electricityMeterPoints {
        gspGroupId
        mpan
      }
    }
  }
}`,
    format: {
      example: '_C',
      segments: [
        { value: '_', label: 'Prefix', color: '#6E7681' },
        { value: 'C', label: 'Region code', color: '#00DC82' },
      ],
    },
    relatedConcepts: ['mpan', 'tariffCode', 'unitRate'],
  },

  balance: {
    id: 'balance',
    title: 'Account Balance',
    icon: '💰',
    shortDescription: 'Your current credit or debit amount',
    fullDescription: `Your account balance shows how much you owe (positive) or how much credit you have (negative).

In the API, balance is stored in the smallest currency unit (pence in the UK), so a balance of -2847 means you're £28.47 in credit.

The balance is affected by:
• Direct debit payments (decreases balance)
• Energy usage charges (increases balance)
• Government schemes and credits

A negative balance (credit) is displayed in green and means you've paid more than you've used - great for building up a buffer for winter!`,
    apiPath: 'account.balance',
    graphqlQuery: `query AccountBalance($accountNumber: String!) {
  account(accountNumber: $accountNumber) {
    balance
    bills(first: 3) {
      edges {
        node {
          amount
          issuedDate
        }
      }
    }
  }
}`,
    format: {
      example: '-2847',
      segments: [
        { value: '-', label: 'Credit indicator', color: '#3FB950' },
        { value: '2847', label: 'Amount in pence', color: '#58A6FF' },
      ],
    },
    relatedConcepts: ['accountNumber', 'consumption'],
  },

  meter: {
    id: 'meter',
    title: 'Meter',
    icon: '📊',
    shortDescription: 'Physical device measuring usage',
    fullDescription: `A meter is the physical device that measures your energy consumption. Unlike the MPAN/MPRN (which are supply point identifiers), meters can be replaced or upgraded.

Modern smart meters:
• Send automatic readings every 30 minutes
• Enable accurate billing
• Allow access to time-of-use tariffs like Agile

The meter serial number is unique to your specific device and is useful when:
• Reporting faults
• Confirming installations
• Checking reading submissions`,
    apiPath: 'account.properties[].electricityMeterPoints[].meters[]',
    graphqlQuery: `query MeterDetails($accountNumber: String!) {
  account(accountNumber: $accountNumber) {
    properties {
      electricityMeterPoints {
        meters {
          serialNumber
          makeAndType
          readingSource
          smartDevices {
            deviceId
            status
          }
        }
      }
    }
  }
}`,
    format: {
      example: '21E1234567',
      segments: [
        { value: '21E', label: 'Manufacturer code', color: '#A855F7' },
        { value: '1234567', label: 'Serial number', color: '#58A6FF' },
      ],
    },
    relatedConcepts: ['mpan', 'mprn', 'consumption'],
  },

  consumption: {
    id: 'consumption',
    title: 'Consumption',
    icon: '📈',
    shortDescription: 'Energy usage over time',
    fullDescription: `Consumption data shows how much energy you've used over specific time periods. For smart meter customers, this can be as granular as half-hourly readings.

Consumption is measured in:
• kWh (kilowatt-hours) for both electricity and gas
• Gas meters measure in m³ but this is converted to kWh for billing

The API can return consumption data in various intervals:
• Half-hourly (for smart meters)
• Daily
• Monthly

This data powers usage charts, cost predictions, and helps identify patterns in your energy use.`,
    apiPath: 'account.properties[].electricityMeterPoints[].meters[].consumption',
    graphqlQuery: `query Consumption($accountNumber: String!, $startDate: Date!, $endDate: Date!) {
  account(accountNumber: $accountNumber) {
    properties {
      electricityMeterPoints {
        consumption(
          startDate: $startDate
          endDate: $endDate
          groupedBy: DAY
        ) {
          startDate
          endDate
          quantity
          unit
        }
      }
    }
  }
}`,
    format: {
      example: '{ quantity: 12.5, unit: "kWh" }',
    },
    relatedConcepts: ['meter', 'unitRate', 'balance'],
  },

  standingCharge: {
    id: 'standingCharge',
    title: 'Standing Charge',
    icon: '📅',
    shortDescription: 'Daily fixed fee',
    fullDescription: `The standing charge is a fixed daily fee you pay regardless of how much energy you use. It covers the costs of:

• Maintaining the energy network
• Meter operations
• Government policy costs
• Supplier obligations

Even if you used zero energy, you'd still pay the standing charge. This is why comparing tariffs should consider both the standing charge AND the unit rate.

Standing charges vary by region and are typically 25-50p per day per fuel.`,
    apiPath: 'productTariffQuote.standingCharge',
    graphqlQuery: `query TariffRates($productCode: String!, $postcode: String!) {
  productTariffQuote(
    productCode: $productCode
    postcode: $postcode
  ) {
    standingCharge
    dayUnitRate
    nightUnitRate
  }
}`,
    format: {
      example: '45.34p/day',
      segments: [
        { value: '45.34', label: 'Pence', color: '#58A6FF' },
        { value: 'p/day', label: 'Per day', color: '#6E7681' },
      ],
    },
    relatedConcepts: ['unitRate', 'tariffCode', 'balance'],
  },

  unitRate: {
    id: 'unitRate',
    title: 'Unit Rate',
    icon: '⚡',
    shortDescription: 'Price per kWh',
    fullDescription: `The unit rate is the price you pay for each kilowatt-hour (kWh) of energy used. This is the variable part of your bill that changes based on consumption.

For variable tariffs like Agile Octopus:
• Rates can change every 30 minutes
• Prices follow the wholesale market
• Can go negative during high renewable generation!

For fixed tariffs:
• Rate is locked for 12-24 months
• Provides price certainty
• Usually slightly higher than variable rates

Unit rates include VAT (5% for domestic energy).`,
    apiPath: 'productTariffQuote.dayUnitRate',
    graphqlQuery: `query UnitRates($productCode: String!, $postcode: String!) {
  productTariffQuote(
    productCode: $productCode
    postcode: $postcode
  ) {
    dayUnitRate
    nightUnitRate
    dayUnitRateValidFrom
    dayUnitRateValidTo
  }
}`,
    format: {
      example: '24.50p/kWh',
      segments: [
        { value: '24.50', label: 'Pence', color: '#00DC82' },
        { value: 'p/kWh', label: 'Per kilowatt-hour', color: '#6E7681' },
      ],
    },
    relatedConcepts: ['standingCharge', 'consumption', 'tariffCode'],
  },

  property: {
    id: 'property',
    title: 'Property',
    icon: '🏠',
    shortDescription: 'Physical address with energy supply',
    fullDescription: `In the Kraken data model, a Property represents a physical location that receives energy supply. Each account can have multiple properties (useful for landlords or people with second homes).

A property contains:
• Address details
• Electricity meter points (MPANs)
• Gas meter points (MPRNs)

The property is the link between your account and the physical infrastructure. When you move house, you'd typically add a new property to your account and close the old one.`,
    apiPath: 'account.properties[]',
    graphqlQuery: `query Properties($accountNumber: String!) {
  account(accountNumber: $accountNumber) {
    properties {
      id
      address
      postcode
      electricityMeterPoints {
        mpan
      }
      gasMeterPoints {
        mprn
      }
    }
  }
}`,
    format: {
      example: '42 Oak Lane, Greenfield, GF1 2AB',
    },
    relatedConcepts: ['accountNumber', 'mpan', 'mprn'],
  },
};
