"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  User,
  Phone,
  Info,
  LogOut,
  Menu,
  Mountain,
  HomeIcon,
  PhoneIcon,
  InfoIcon,
  UserIcon,
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  userName: string;
  userImage?: string;
}

export default function Navbar({ userName, userImage }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const session = useSession();
  const { logout } = useUserStore();
  const router = useRouter();

  const routes = [
    {
      href: "/home",
      label: "Home",
      icon: <HomeIcon className="h-4 w-4 mr-2" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <UserIcon className="h-4 w-4 mr-2" />,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <PhoneIcon className="h-4 w-4 mr-2" />,
    },
    {
      href: "/about",
      label: "About",
      icon: <InfoIcon className="h-4 w-4 mr-2" />,
    },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-100 bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Mountain className="h-6 w-6 text-sky-600" />
          <span className="text-lg font-semibold text-sky-800 hidden sm:inline-block">
            SkyProfile
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center text-sm font-medium transition-colors hover:text-sky-600 ${
                isActive(route.href) ? "text-sky-600" : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full"
                aria-label="User menu"
              >
                <Avatar className="h-9 w-9 border border-sky-100">
                  <AvatarImage
                    src={userImage || "/placeholder.svg?height=36&width=36"}
                    alt={userName}
                  />
                  <AvatarFallback className="bg-sky-100 text-sky-800">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    arshitcc@gmail.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="md:hidden" onClick={() => router.push("/home")}>
                <Home className="h-4 w-4 mr-2" />
                <span>Home</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden" onClick={() => router.push("/profile")}>
                <User className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden" onClick={() => router.push("/contact")}>
                <Phone className="h-4 w-4 mr-2" />
                <span>Contact</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="md:hidden" onClick={() => router.push("/about")}>
                <Info className="h-4 w-4 mr-2" />
                <span>About</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
