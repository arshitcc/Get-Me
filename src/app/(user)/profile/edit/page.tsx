'use client'

import { IProfile } from "@/types/user";
import { useUserStore } from "@/store/useUserStore";
import React, { useEffect, useState } from "react";
import ProfileEditForm from "@/components/user/ProfileForm";

function page() {
  const [profile, setProfile] = useState<IProfile>({} as IProfile);
  const { getProfile } = useUserStore();

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      console.log(profile)
      setProfile(profile);
    };
    fetchProfile();
  }, []);

  const handleProfileSubmit = async (data: IProfile) => {
    console.log(data);
  };
  return (
    <div className="max-w-screen-md mx-auto py-12">
      <ProfileEditForm profile={profile} onSubmit={handleProfileSubmit} />
    </div>
  );
}

export default page;
