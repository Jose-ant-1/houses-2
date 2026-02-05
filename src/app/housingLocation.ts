export interface HousingLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  price: number;
  available: boolean;
}
