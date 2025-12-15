export interface MapLocation {
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
  category: string;
  icon: string;
  color: string;
}

export interface MapData {
  center: [number, number]; // [longitude, latitude]
  zoom: number;
  locations: MapLocation[];
}

export interface MapAPIResponse {
  center: [number, number];
  zoom: number;
  locations: {
    id: string;
    name: string;
    description: string;
    address: string;
    coordinates: [number, number];
    category: string;
    icon: string;
    color: string;
  }[];
}
