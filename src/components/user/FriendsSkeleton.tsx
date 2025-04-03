import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function FriendsSkeleton() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-sky-100 bg-white">
            <CardHeader className="pb-2 px-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-24 sm:w-32" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2 px-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <div className="flex flex-wrap gap-1">
                  <Skeleton className="h-5 w-14" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 px-4">
              <div className="flex space-x-2">
                <Skeleton className="h-7 w-7 rounded-md" />
                <Skeleton className="h-7 w-7 rounded-md" />
                <Skeleton className="h-7 w-7 rounded-md" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  