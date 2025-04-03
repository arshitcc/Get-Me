"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPinIcon,
  CalendarIcon,
  HeartIcon,
  UsersIcon,
  UserIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  EditIcon,
  ClockIcon,
  TagIcon,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { IProfile } from "@/types/user";
import ProfileSkeleton from "@/components/user/ProfileSkeleton";
import PlacesSkeleton from "@/components/user/PlacesSkeleton";
import FriendsSkeleton from "@/components/user/FriendsSkeleton";
import { useRouter } from "next/navigation";

const favoritePlaces = [
  {
    id: "1",
    name: "Golden Gate Park",
    category: "Park",
    lastVisited: new Date("2023-02-15"),
    description:
      "A beautiful urban park with gardens, museums, and recreational areas.",
  },
  {
    id: "2",
    name: "Fisherman's Wharf",
    category: "Tourist Attraction",
    lastVisited: new Date("2023-01-10"),
    description: "Historic waterfront area with seafood restaurants and shops.",
  },
  {
    id: "3",
    name: "Twin Peaks",
    category: "Viewpoint",
    lastVisited: new Date("2022-12-05"),
    description: "Famous hills offering panoramic views of the city and bay.",
  },
];

const friends = [
  {
    id: "1",
    name: "Alex Johnson",
    photo: "/placeholder.svg?height=80&width=80",
    description: "Software Engineer passionate about web technologies",
    interests: ["Coding", "Gaming", "Music"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      facebook: "https://facebook.com/alexjohnson",
    },
  },
  {
    id: "2",
    name: "Sarah Williams",
    photo: "/placeholder.svg?height=80&width=80",
    description: "Marketing specialist with a love for creative campaigns",
    interests: ["Marketing", "Art", "Yoga"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahwilliams",
      twitter: "https://twitter.com/sarahwilliams",
      facebook: "https://facebook.com/sarahwilliams",
    },
  },
  {
    id: "3",
    name: "Michael Brown",
    photo: "/placeholder.svg?height=80&width=80",
    description: "Photographer and digital content creator",
    interests: ["Photography", "Travel", "Cooking"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/michaelbrown",
      twitter: "https://twitter.com/michaelbrown",
      facebook: "https://facebook.com/michaelbrown",
    },
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState<typeof favoritePlaces | null>(null);
  const [friendsList, setFriendsList] = useState<typeof friends | null>(null);
  const router = useRouter();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const { getProfile } = useUserStore();

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      console.log(profile);
      setProfile(profile);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setTimeout(() => setPlaces(favoritePlaces), 1800);
      setTimeout(() => setFriendsList(friends), 2200);
      setTimeout(() => setLoading(false), 2500);
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto py-4 sm:py-6 lg:py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="w-full lg:w-1/3">
            <Card className="shadow-md border-sky-100 bg-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  {loading ? (
                    <Skeleton className="h-24 w-24 rounded-full" />
                  ) : (
                    <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-sky-200">
                      <AvatarImage src={profile?.photo} alt={profile?.name} />
                      <AvatarFallback className="bg-sky-100 text-sky-800">
                        {profile?.name}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-sky-600"
                    onClick={() => router.push("/profile/edit")}
                  >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                </div>
                {loading ? (
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <>
                    <CardTitle className="text-xl sm:text-2xl mt-4 text-black">
                      {profile?.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {profile?.description}
                    </CardDescription>
                  </>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <>
                      <div className="space-y-2 bg-white">
                        <Skeleton className="h-5 w-24" />
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-6 w-14" />
                          <Skeleton className="h-6 w-18" />
                        </div>
                      </div>
                      <div className="space-y-2 bg-white">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-full" />
                      </div>
                      <div className="space-y-2 bg-white">
                        <Skeleton className="h-5 w-24" />
                        <div className="flex space-x-2">
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                      </div>
                      <div className="space-y-2 bg-white">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                    </>
                  ) : (
                    <>
                      {profile?.interests && profile.interests.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-sky-800 mb-2">
                            Interests
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {profile.interests.map((interest, index) => (
                              <Badge
                                key={index}
                                className="bg-sky-100 text-sky-800 hover:bg-sky-200"
                              >
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {profile?.address && (
                        <div>
                          <h3 className="text-sm font-medium text-sky-800 mb-2">
                            Location
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPinIcon className="h-4 w-4 mr-2 text-sky-600 flex-shrink-0" />
                            <span>
                              {profile?.address?.city},{" "}
                              {profile?.address?.state},{" "}
                              {profile?.address?.country}
                            </span>
                          </div>
                        </div>
                      )}

                      {profile?.socialLinks && (
                        <div>
                          <h3 className="text-sm font-medium text-sky-800 mb-2">
                            Social Links
                          </h3>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 text-sky-600"
                            >
                              <LinkedinIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 text-sky-600"
                            >
                              <TwitterIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 text-sky-600"
                            >
                              <FacebookIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="text-sm font-medium text-sky-800 mb-2">
                          Member Since
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="h-4 w-4 mr-2 text-sky-600 flex-shrink-0" />
                          <span>
                            {profile?.createdAt
                              ? new Date(profile.createdAt).toLocaleString()
                              : ""}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full lg:w-2/3">
            <Tabs
              defaultValue="profile"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-3 mb-4 sm:mb-6 bg-sky-500 w-full cursor-pointer text-white">
                <TabsTrigger value="profile" className="cursor-pointer">
                  <UserIcon className="h-4 w-4 mr-2 hidden sm:inline" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="places" className="cursor-pointer">
                  <HeartIcon className="h-4 w-4 mr-2 hidden sm:inline" />
                  Favorite Places
                </TabsTrigger>
                <TabsTrigger value="friends" className="cursor-pointer">
                  <UsersIcon className="h-4 w-4 mr-2 hidden sm:inline" />
                  Friends
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-0">
                <Card className="shadow-md border-sky-100 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-sky-800">
                      About Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <ProfileSkeleton />
                    ) : (
                      <div className="space-y-6">
                        {profile?.description && (
                          <div>
                            <h3 className="font-medium text-sky-800 mb-2">
                              Bio
                            </h3>
                            <p className="text-muted-foreground">
                              {profile?.description}
                            </p>
                          </div>
                        )}

                        {profile?.interests && profile.interests.length > 0 && (
                          <div>
                            <h3 className="font-medium text-sky-800 mb-2">
                              Interests
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {profile?.interests?.map((interest, index) => (
                                <Badge
                                  key={index}
                                  className="bg-sky-100 text-sky-800 hover:bg-sky-200"
                                >
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {profile?.address && (
                          <div>
                            <h3 className="font-medium text-sky-800 mb-2">
                              Full Address
                            </h3>
                            <div className="text-muted-foreground">
                              <p>{profile.address.street}</p>
                              <p>
                                {profile.address.city}, {profile.address.state}{" "}
                                {profile.address.postalCode}
                              </p>
                              <p>{profile.address.country}</p>
                            </div>
                          </div>
                        )}

                        <div>
                          <h3 className="font-medium text-sky-800 mb-2">
                            Social Media
                          </h3>
                          <div className="space-y-2 text-muted-foreground">
                            <div className="flex items-center">
                              <LinkedinIcon className="h-4 w-4 mr-2 text-sky-600 flex-shrink-0" />
                              <span className="truncate">
                                linkedin.com/in/arshitcc
                              </span>
                            </div>
                            <div className="flex items-center">
                              <TwitterIcon className="h-4 w-4 mr-2 text-sky-600 flex-shrink-0" />
                              <span className="truncate">x.com/arshitcc</span>
                            </div>
                            <div className="flex items-center">
                              <FacebookIcon className="h-4 w-4 mr-2 text-sky-600 flex-shrink-0" />
                              <span className="truncate">
                                facebook.com/arshitcc
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="places" className="mt-0">
                <Card className="shadow-md border-sky-100 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-sky-800">
                      Favorite Places
                    </CardTitle>
                    <CardDescription>
                      Places I've visited and loved
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <PlacesSkeleton />
                    ) : (
                      <div className="space-y-4 sm:space-y-6">
                        {places?.map((place) => (
                          <Card
                            key={place.id}
                            className="border-sky-100 bg-white"
                          >
                            <CardHeader className="pb-2 px-4 sm:px-6">
                              <CardTitle className="text-base sm:text-lg text-sky-800">
                                {place.name}
                              </CardTitle>
                              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <TagIcon className="h-4 w-4 mr-1 text-sky-600 flex-shrink-0" />
                                  <span>{place.category}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <ClockIcon className="h-4 w-4 mr-1 text-sky-600 flex-shrink-0" />
                                  <span>
                                    Last visited:{" "}
                                    {place.lastVisited.toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="px-4 sm:px-6">
                              <p className="text-muted-foreground text-sm sm:text-base">
                                {place.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="friends" className="mt-0">
                <Card className="shadow-md border-sky-100 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl text-sky-800">
                      Friends
                    </CardTitle>
                    <CardDescription>People I'm connected with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <FriendsSkeleton />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {friendsList?.map((friend) => (
                          <Card
                            key={friend.id}
                            className="border-sky-100 bg-white"
                          >
                            <CardHeader className="pb-2 px-4">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border border-sky-100">
                                  <AvatarImage
                                    src={friend.photo}
                                    alt={friend.name}
                                  />
                                  <AvatarFallback className="bg-sky-100 text-sky-800">
                                    {friend.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-sm sm:text-base text-sky-800">
                                    {friend.name}
                                  </CardTitle>
                                  <CardDescription className="text-xs">
                                    {friend.description}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2 px-4">
                              <div className="space-y-2">
                                <div>
                                  <h4 className="text-xs font-medium text-sky-800 mb-1">
                                    Interests
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {friend.interests.map((interest, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs py-0 text-black border border-gray-200"
                                      >
                                        {interest}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="pt-0 px-4">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-sky-600"
                                >
                                  <LinkedinIcon className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-sky-600"
                                >
                                  <TwitterIcon className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-sky-600"
                                >
                                  <FacebookIcon className="h-3 w-3" />
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
