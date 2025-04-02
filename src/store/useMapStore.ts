import { create } from "zustand";
import axios from "axios";
import { OlaMaps } from "olamaps-web-sdk";

interface location{
  lat: number;
  lng: number;
}

export interface Predictions{
  structured_formatting? : Object;
  description? : string;
  geomentry? : {
    location? : location
  },
  place_id? : string;
  formatted_address? : string;
  name? : string;
  types? : string[]
}

interface MapStore {
  map: OlaMaps | null;
  initMap: (containerId: string) => Promise<void>;
  addMarkerToMap: ( location: location, photoUrl?: string, alt?: string, isSelected?: boolean) => Promise<void>;
  addPopupToMap: ( content: string, location : location) => Promise<void>;
  searchPlaces: ( query: string) => Promise<Predictions[]>;
  suggestPlaces: ( substring: string, location : location) => Promise<Predictions[]>;
  nearbySearches: ( types: string, location: location) => Promise<any[]>;
}

function MapMarker(photoUrl?: string, alt = "User Marker", isSelected?: boolean): string {
  return `
    <div class="relative flex flex-col items-center group">
      <div class="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 ${isSelected ? "scale-110 border-4 border-blue-500" : ""}">
        <div class="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden transform transition-transform duration-200 group-hover:scale-110">
          <img src="${photoUrl}" alt="${alt}" class="w-full h-full object-cover" />
        </div>
      </div>
      <div class="w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800 -mt-2"></div>
    </div>
  `;
}

function Marker(): string {
  return `<div class="relative w-12">
    <div class="w-12 h-12 bg-red-500 rounded-full relative">
      <div class="w-6 h-6 bg-white rounded-full absolute top-1/4 left-1/4"></div>
    </div>
    <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[12px] border-t-red-500 mx-auto -mt-1"></div>
  </div>`;
}

const useMaps = create<MapStore>((set, get) => ({
  map: null,
  initMap: async (containerId) => {
    if (typeof window === "undefined") return;
    const { OlaMaps } = await import("olamaps-web-sdk");
    const olaMaps = new OlaMaps({ apiKey: process.env.NEXT_PUBLIC_OLAMAPS_API_KEY!});

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      const myMap = olaMaps.init({
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        container: containerId,
        center: [lng, lat],
        zoom: 17,
      });

      const marker = document.createElement("div");
      marker.innerHTML = `<img width="32" height="32" src="https://img.icons8.com/hatch/64/place-marker.png" alt="place-marker"/>`;

      olaMaps
        .addMarker({ element: marker, offset: [0, -10], anchor: "bottom" })
        .setLngLat([lng, lat])
        .addTo(myMap);

      set({ map: myMap });
    });
  },

  addMarkerToMap: async (location, photoUrl, alt, isSelected) => {
    const { map } = get();
    if (!map) return;
    const markerElement = document.createElement("div");
    markerElement.innerHTML = MapMarker(photoUrl, alt, isSelected);
    map
      .addMarker({ element: markerElement, offset: [0, -10], anchor: "bottom" })
      .setLngLat([location.lng, location.lat]);
  },

  addPopupToMap: async (content, location) => {
    const { map } = get();
    if (!map) return;
    const popup = document.createElement("div");
    popup.innerHTML = `<div class="p-2 bg-white rounded shadow-md">${content}</div>`;
    map
      .addPopup({ element: popup, offset: [0, -10], anchor: "bottom" })
      .setLngLat([location.lng, location.lat]);
   
  },

  searchPlaces: async (textsearch) => {
    try {
      const response = await axios.post(`/api/v1/ola/places/textsearch`, {textsearch});
      return response.data.data.predictions || [];
    } catch (error) {
      throw new Error("Search Failed");
    }
  },

  suggestPlaces: async (searchText, location) => {
    try {
      const response = await axios.post(`/api/v1/ola/places/autocomplete`, {searchText, location});
      return response.data.data.predictions || [];
    } catch (error) {
      throw new Error("Suggestions Failed");
    }
  },

  nearbySearches: async (types, location) => {
    try {
      const response = await axios.post(`/api/v1/ola/places/nearbysearch`, {types, location});
      return response.data.data.predictions || [];
    } catch (error) {
      throw new Error("Nearby Search Failed");
    }
  },
}));

export default useMaps;
