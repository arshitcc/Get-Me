import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IAddress, IProfile } from "@/types/user";

export interface Interest {
  value: string;
}

// This is our form data type.
export interface ProfileFormData {
  name: string;
  photo?: string;
  description?: string;
  interests: Interest[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  address: IAddress;
}

interface ProfileEditFormProps {
  profile: IProfile;
  onSubmit: (data: IProfile) => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, onSubmit }) => {
  const defaultValues: ProfileFormData = {
    name: profile.name,
    photo: profile.photo || "",
    description: profile.description || "",
    interests: (profile.interests || []).map(interest => ({ value: interest })),
    socialLinks: {
      linkedin: profile.socialLinks?.linkedin || "",
      twitter: profile.socialLinks?.twitter || "",
      facebook: profile.socialLinks?.facebook || "",
    },
    address: {
      street: profile.address?.street || "",
      city: profile.address?.city || "",
      state: profile.address?.state || "",
      country: profile.address?.country || "",
      postalCode: profile.address?.postalCode || "",
      coordinates: profile.address?.coordinates,
    },
  };

  const { register, control, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({ defaultValues });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "interests",
  });
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      append({ value: newInterest });
      setNewInterest("");
    }
  };

  const onFormSubmit = (data: ProfileFormData) => {
    const updatedProfile: IProfile = {
      ...profile, // preserve _id, userId, createdAt, etc.
      name: data.name,
      photo: data.photo,
      description: data.description,
      interests: data.interests.map(i => i.value),
      socialLinks: data.socialLinks,
      address: data.address,
      updatedAt: new Date().toISOString(),
    };
    onSubmit(updatedProfile);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input id="name" defaultValue={profile.name} disabled {...register("name")} />
      </div>

      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
          Photo URL
        </label>
        <Input id="photo" {...register("photo")} className="mt-1 block w-full" />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea
          id="description"
          {...register("description")}
          className="mt-1 block w-full"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description.message}</span>
        )}
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Interests</label>
        <div className="space-y-2 mt-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <Input
                {...register(`interests.${index}.value` as const, { required: true })}
                defaultValue={field.value}
              />
              <Button type="button" variant="destructive" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <Input
            placeholder="Add interest"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
          />
          <Button type="button" onClick={handleAddInterest}>
            Add
          </Button>
        </div>
      </div>

      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
          LinkedIn
        </label>
        <Input id="linkedin" {...register("socialLinks.linkedin")} className="mt-1 block w-full" />
      </div>
      <div>
        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
          Twitter
        </label>
        <Input id="twitter" {...register("socialLinks.twitter")} className="mt-1 block w-full" />
      </div>
      <div>
        <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
          Facebook
        </label>
        <Input id="facebook" {...register("socialLinks.facebook")} className="mt-1 block w-full" />
      </div>

      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          Street
        </label>
        <Input id="street" {...register("address.street", { required: "Street is required" })} className="mt-1 block w-full" />
        {errors.address?.street && (
          <span className="text-red-500 text-sm">{errors.address.street.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <Input id="city" {...register("address.city", { required: "City is required" })} className="mt-1 block w-full" />
        {errors.address?.city && (
          <span className="text-red-500 text-sm">{errors.address.city.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <Input id="state" {...register("address.state", { required: "State is required" })} className="mt-1 block w-full" />
        {errors.address?.state && (
          <span className="text-red-500 text-sm">{errors.address.state.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <Input id="country" {...register("address.country", { required: "Country is required" })} className="mt-1 block w-full" />
        {errors.address?.country && (
          <span className="text-red-500 text-sm">{errors.address.country.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
          Postal Code
        </label>
        <Input id="postalCode" {...register("address.postalCode", { required: "Postal Code is required" })} className="mt-1 block w-full" />
        {errors.address?.postalCode && (
          <span className="text-red-500 text-sm">{errors.address.postalCode.message}</span>
        )}
      </div>

      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default ProfileEditForm;
