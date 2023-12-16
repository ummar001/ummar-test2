interface IFeature {
  type: string
  geometry: {
    type: string
    coordinates: number[]
  }
  properties: {
    [key: string]: unknown
    housenumber: string
    street: string
    postcode: string
    city: string
    county: string
  }
}

interface IFeatureCollection {
  type: string
  features: IFeature[]
}

export interface IFormatedAddress {
  coordinates: string
  address: string
}

export function formatAddresses(
  featureCollection: IFeatureCollection
): IFormatedAddress[] {
  return featureCollection.features.map((feature: IFeature) => {
    const { address_line1, address_line2 } =
      feature.properties;
    const addressLine1 = `${address_line1} ${address_line2}`;
    return {
      address: addressLine1,
      coordinates: `${feature.properties.lat}, ${feature.properties.lon}`,
    };
  });
}
