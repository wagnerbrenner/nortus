"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Overlay from "ol/Overlay";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mapService } from "@/services/map.service";
import { AlertCircle, X, Navigation } from "lucide-react";

interface LocationData {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  category: string;
  address: string;
  icon: string;
  color: string;
}

const categoryIcons: Record<string, string> = {
  tourism: "🏛️",
  health: "🏥",
  transport: "✈️",
  education: "🎓",
  heritage: "🏰",
  sports: "⚽",
  food: "🍴",
  commerce: "🛒",
  entertainment: "🎭",
  park: "🌳",
};

const getCategoryNames = (t: (key: string) => string): Record<string, string> => ({
  tourism: t("dashboard.map.categories.tourism"),
  health: t("dashboard.map.categories.health"),
  transport: t("dashboard.map.categories.transport"),
  education: t("dashboard.map.categories.education"),
  heritage: t("dashboard.map.categories.heritage"),
  sports: t("dashboard.map.categories.sports"),
  food: t("dashboard.map.categories.food"),
  commerce: t("dashboard.map.categories.commerce"),
  entertainment: t("dashboard.map.categories.entertainment"),
  park: t("dashboard.map.categories.park"),
});

export function ClientMap() {
  const { t } = useTranslation("common");
  const categoryNames = getCategoryNames(t);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [filteredLocations, setFilteredLocations] = useState<LocationData[]>([]);

  const {
    data: mapData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mapData"],
    queryFn: mapService.getMapData,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  const filteredLocationsMemo = useMemo(() => {
    if (!mapData?.locations) {
      return [];
    }

    let filtered = mapData.locations;

    if (filterCategory !== "all") {
      filtered = filtered.filter((loc) => loc.category === filterCategory);
    }

    if (filterLocation !== "all") {
      filtered = filtered.filter((loc) => loc.id === filterLocation);
    }

    return filtered;
  }, [mapData, filterCategory, filterLocation]);

  useEffect(() => {
    setFilteredLocations(filteredLocationsMemo);
  }, [filteredLocationsMemo]);

  const categories = mapData?.locations
    ? Array.from(new Set(mapData.locations.map((loc) => loc.category)))
    : [];

  useEffect(() => {
    if (!mapRef.current || !mapData) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.setTarget(undefined);
      mapInstanceRef.current = null;
    }

    const vectorSource = new VectorSource();

    if (popupRef.current) {
      overlayRef.current = new Overlay({
        element: popupRef.current,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });
    }

    const isDark = document.documentElement.classList.contains("dark");
    const tileUrl = isDark
      ? "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
      : "https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            url: tileUrl,
          }),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      view: new View({
        center: fromLonLat(mapData.center),
        zoom: mapData.zoom,
      }),
    });

    if (overlayRef.current) {
      map.addOverlay(overlayRef.current);
    }

    mapInstanceRef.current = map;

    const features: Feature[] = [];

    if (filteredLocations && filteredLocations.length > 0) {
      filteredLocations.forEach((location) => {
        if (!location.coordinates || location.coordinates.length !== 2) return;

        const feature = new Feature({
          geometry: new Point(fromLonLat([location.coordinates[0], location.coordinates[1]])),
        });

        feature.setProperties({
          id: location.id,
          name: location.name,
          description: location.description,
          address: location.address,
          category: location.category,
          color: location.color,
        });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = 40;
        canvas.height = 40;

        if (context) {
          context.beginPath();
          context.arc(20, 20, 18, 0, 2 * Math.PI);
          context.fillStyle = location.color || "#3b82f6";
          context.fill();
          context.strokeStyle = "#ffffff";
          context.lineWidth = 3;
          context.stroke();

          context.font = "20px Arial";
          context.textAlign = "center";
          context.textBaseline = "middle";
          const emoji = categoryIcons[location.category] || "📍";
          context.fillText(emoji, 20, 20);
        }

        feature.setStyle(
          new Style({
            image: new Icon({
              img: canvas,
              size: [40, 40],
              scale: 0.8,
            }),
          })
        );

        features.push(feature);
      });
    }

    if (features.length > 0) {
      vectorSource.addFeatures(features);
    }

    map.on("click", (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);

      if (feature && overlayRef.current) {
        const properties = feature.getProperties();
        setSelectedLocation({
          id: properties.id,
          name: properties.name,
          description: properties.description,
          address: properties.address,
          category: properties.category,
          color: properties.color,
          coordinates: [0, 0],
          icon: "",
        });

        const geometry = feature.getGeometry();
        if (geometry && geometry.getType() === "Point") {
          const point = geometry as Point;
          overlayRef.current.setPosition(point.getCoordinates());
        }
      } else {
        setSelectedLocation(null);
        overlayRef.current?.setPosition(undefined);
      }
    });

    map.on("pointermove", (evt) => {
      const pixel = map.getEventPixel(evt.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [filteredLocations, mapData]);

  if (error) {
    return (
      <Card className="p-6 bg-sidebar border border-sidebar-border rounded-2xl">
        <div className="flex flex-col items-center justify-center h-[400px]">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">{t("dashboard.map.error")}</h3>
          <p className="text-muted-foreground text-center text-sm">
            Não foi possível carregar os dados do mapa. Tente novamente mais tarde.
          </p>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6 bg-sidebar border border-sidebar-border rounded-2xl">
        <div className="space-y-4">
          <div className="h-6 bg-sidebar-accent rounded w-1/3 animate-pulse" />
          <div className="w-full h-[500px] rounded-xl bg-sidebar-accent/50 animate-pulse" />
        </div>
      </Card>
    );
  }
  return (
    <Card className="p-6 bg-sidebar border border-sidebar-border rounded-2xl">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          {t("dashboard.map.title")}
        </h2>

        <div className="flex gap-2 flex-wrap">
          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="h-9 text-xs px-4 w-48">
              <SelectValue placeholder={t("dashboard.map.filters.selectLocation")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                {t("dashboard.map.filters.allLocations")}
              </SelectItem>
              {mapData?.locations?.map((location) => (
                <SelectItem key={location.id} value={location.id} className="text-xs">
                  {categoryIcons[location.category]} {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="h-9 text-xs px-4 w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                {t("dashboard.map.filters.allCategories")}
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-xs">
                  {categoryIcons[category]} {categoryNames[category]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(filterCategory !== "all" || filterLocation !== "all") && (
            <button
              onClick={() => {
                setFilterCategory("all");
                setFilterLocation("all");
              }}
              className="h-9 px-4 bg-destructive/20 hover:bg-destructive/30 text-destructive rounded-md text-xs transition-colors font-medium"
            >
              {t("dashboard.map.filters.clearFilters")}
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <div ref={mapRef} className="w-full h-[500px] rounded-lg overflow-hidden" />

        <div
          ref={popupRef}
          className={`absolute bg-card border border-border rounded-lg shadow-xl p-4 min-w-[280px] max-w-[320px] transition-opacity z-10 ${
            selectedLocation ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            bottom: "20px",
            left: "-140px",
            transform: "translateX(-50%)",
          }}
        >
          {selectedLocation && (
            <>
              <button
                onClick={() => {
                  setSelectedLocation(null);
                  overlayRef.current?.setPosition(undefined);
                }}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: selectedLocation.color }}
                >
                  {categoryIcons[selectedLocation.category]}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-card-foreground font-semibold text-sm mb-1 truncate">
                    {selectedLocation.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-[10px] mb-2"
                    style={{
                      backgroundColor: `${selectedLocation.color}20`,
                      color: selectedLocation.color,
                    }}
                  >
                    {categoryNames[selectedLocation.category]}
                  </Badge>
                  <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
                    {selectedLocation.description}
                  </p>
                  <div className="flex items-start gap-1 text-muted-foreground text-[10px]">
                    <Navigation className="w-3 h-3 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{selectedLocation.address}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
