"use client";

import React, { useState } from "react";
import { Camera, Loader2, UserCog } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateProfilePhoto, updateUserData } from "@/services/Auth";
import { TUser } from "@/types/user";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface UpdateProfileFormProps {
  user: TUser | null;
}

export default function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.image || null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleCancelPreview = () => {
    setSelectedFile(null);
    setPreviewUrl(user?.image || null);
  };

  const handleUpdatePhoto = async () => {
    if (!selectedFile) return;

    setPhotoLoading(true);
    const toastId = toast.loading("Uploading profile picture...");

    try {
      const uploadData = new FormData();
      uploadData.append("user", selectedFile);

      const res = await updateProfilePhoto(uploadData);

      if (res?.success) {
        toast.success("Profile picture updated successfully!", { id: toastId });
        setSelectedFile(null);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to upload image", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setPhotoLoading(false);
    }
  };

  async function onSubmit(values: ProfileFormValues) {
    setLoading(true);
    const toastId = toast.loading("Updating profile information...");

    try {
      const res = await updateUserData(values);

      if (res?.success) {
        toast.success("Profile information updated successfully!", { id: toastId });
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update profile", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <UserCog className="h-4 w-4 text-primary" /> Profile information
            </CardTitle>
            <CardDescription>
              Keep your contact and display information up to date.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="relative group">
                <Avatar className="h-28 w-28 border-4 border-primary/10 transition-all group-hover:border-primary/20 shadow-md">
                  <AvatarImage
                    src={previewUrl || ""}
                    alt={user?.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/5 text-primary text-2xl font-bold">
                    {user?.name?.substring(0, 2).toUpperCase() || "RM"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="image-upload"
                  className="absolute -bottom-1 -right-1 grid h-9 w-9 cursor-pointer place-items-center rounded-full border bg-background shadow-lg transition-transform hover:scale-110 active:scale-95"
                >
                  <Camera className="h-5 w-5 text-primary" />
                  <input
                    type="file"
                    id="image-upload"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading || photoLoading}
                  />
                </label>
              </div>
              <div className="flex flex-col gap-3 text-center sm:text-left">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Profile photo</h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                    Click the camera icon to choose a new photo. Max size 2MB.
                  </p>
                </div>
                {selectedFile && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-xs"
                      onClick={handleUpdatePhoto}
                      disabled={photoLoading}
                    >
                      {photoLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : null}
                      Save Photo
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full text-xs text-red-500 hover:text-red-600 dark:bg-white/10 bg-black/10 hover:bg-red-50"
                      onClick={handleCancelPreview}
                      disabled={photoLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2 md:col-span-2">
                <FormLabel className="flex items-center gap-2">
                  Email address{" "}
                  <Badge variant="secondary" className="text-xs h-4 font-normal py-0">
                    Read only
                  </Badge>
                </FormLabel>
                <Input
                  type="email"
                  defaultValue={user?.email || ""}
                  disabled
                  className="bg-muted/50"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t bg-muted/20 px-6 py-4">
            <Button
              type="submit"
              className="rounded-full min-w-[160px]"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Update Information"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
