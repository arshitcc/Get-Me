"use client";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchSchema, searchSchema } from "@/schemas/search.schema";
import useMaps, { Predictions } from "@/store/useMapStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Loader2Icon,
  SearchIcon,
  CookingPotIcon,
  CreditCardIcon,
  MapPinIcon,
  CarIcon,
  StarIcon,
  TrainIcon,
  BusIcon,
  SchoolIcon,
  PlusSquareIcon,
  CheckIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

axios.defaults.withCredentials = true;
const categories = [
  { type: "restaurant", label: "Restaurant", Icon: CookingPotIcon },
  { type: "atm", label: "ATM", Icon: CreditCardIcon },
  { type: "taxi_stand", label: "Taxi", Icon: CarIcon },
  { type: "tourist_attraction", label: "Attractions", Icon: StarIcon },
  { type: "train_station", label: "Train Station", Icon: TrainIcon },
  { type: "university", label: "University", Icon: SchoolIcon },
  { type: "pharmacy", label: "Pharmacy", Icon: PlusSquareIcon },
];

function page() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { initMap, suggestPlaces, searchPlaces, nearbySearches } = useMaps();
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const [searches, setSearches] = useState<Predictions[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setLocation({ lat, lng });
      },
      () => toast.error("Location access denied")
    );
  }, []);

  const form = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: { search: "" },
  });

  const debounced = useDebounceCallback(setSearchText, 500);

  useEffect(() => {
    if (mapContainerRef.current) {
      initMap("map");
    }
  }, [initMap]);

  useEffect(() => {
    async function handleSearch() {
      if (!searchText.trim() || !location.lat || !location.lng) {
        setSearches([]);
        return;
      }
      setSearching(true);
      try {
        const predictions = await suggestPlaces(searchText, location);
        setSearches(predictions || []);
        toast.success("Results updated!");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setSearching(false);
      }
    }
    handleSearch();
  }, [searchText]);

  async function handleSearch(data: SearchSchema) {
    if (!data.search.trim()) return;
    setSearching(true);
    setSearches([]);
    try {
      const predictions = await searchPlaces(data.search);
      setSearches(predictions || []);
      toast.success("Results updated!");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSearching(false);
    }
  }

  async function handleCategoryClick(type: string) {
    if (!location.lat || !location.lng) return;
    let newSelectedTypes;
    if (selectedTypes.includes(type)) newSelectedTypes = selectedTypes.filter((t) => t !== type);
    else newSelectedTypes = [...selectedTypes, type];
    setSelectedTypes(newSelectedTypes);
    if(!newSelectedTypes.length) {
      setSearches([]);
      return;
    }
    try {
      let selectedTypes = newSelectedTypes.join(",");
      const predictions = await nearbySearches(selectedTypes, location);
      setSearches(predictions || []);
      toast.success("Nearby Search updated!");
    } catch (error) {
      toast.error("Failed to fetch nearby places");
    }
  }

  return (
    <div className="relative h-screen ">
      <div id="map" ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute z-10 top-4 px-2.5 md:px-4 grid grid-rows-2 w-full gap-2">
        <div className="row-span-1 w-full md:w-[700px] mx-auto">
          <Card className="py-0">
            <CardContent className="p-2 pb-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSearch)}
                  className="space-y-4 flex gap-2"
                >
                  <FormField
                    name="search"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full relative">
                        <Input
                          {...field}
                          placeholder="Search"
                          className="bg-white pl-10 text-white"
                          onChange={(e) => {
                            field.onChange(e);
                            debounced(e.target.value);
                          }}
                        />
                        <SearchIcon
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          size={18}
                        />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={searching}
                    className="w-[20%] cursor-pointer"
                  >
                    {searching ? (
                      <Loader2Icon className="animate-spin" />
                    ) : (
                      "Search"
                    )}
                  </Button>
                </form>
              </Form>

              {searches?.length > 0 && (
                <div className="mt-4 space-y-2">
                  {searches.map((search, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-100 rounded-md text-black cursor-pointer"
                    >
                      {search.description}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="row-span-1 w-full flex gap-2 overflow-x-auto justify-center">
          {categories.map((category) => {
            const isSelected = selectedTypes.includes(category.type);
            return (
              <Button
                key={category.type}
                variant="default"
                onClick={() => handleCategoryClick(category.type)}
                className="flex items-center gap-1 whitespace-nowrap cursor-pointer text-black bg-white"
              >
                {!isSelected? <category.Icon size={18} /> : <CheckIcon/>}
                <span className="text-sm">{category.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
