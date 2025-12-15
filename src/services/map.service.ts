import { api } from "./api";
import type { MapData, MapAPIResponse, MapLocation } from "@/types/map";

export const mapService = {
  getMapData: async (): Promise<MapData> => {
    const response = await api.get<{ data: MapAPIResponse }>("/map/locations");

    const data = response.data.data;

    const center: [number, number] =
      Array.isArray(data.center) && data.center.length === 2 ? data.center : [-51.2177, -30.0346];

    const zoom = typeof data.zoom === "number" && data.zoom > 0 ? data.zoom : 9;

    const locations: MapLocation[] = Array.isArray(data.locations)
      ? data.locations.filter((loc) => {
          return (
            loc.id &&
            loc.name &&
            Array.isArray(loc.coordinates) &&
            loc.coordinates.length === 2 &&
            typeof loc.coordinates[0] === "number" &&
            typeof loc.coordinates[1] === "number"
          );
        })
      : [];

    return {
      center,
      zoom,
      locations,
    };
  },
};
