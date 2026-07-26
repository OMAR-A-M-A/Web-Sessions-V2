import supabase, { supabaseUrl } from "./supabase";
import { type UpdateCurrentUserParams } from "@/types/userTypes";

export async function loginWithEmail({
  email,
  password,
}: Record<string, string>) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function loginWithProvider(provider: "google" | "github") {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/admin`,
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function updateCurrentUser({
  fullName,
  password,
  avatar,
}: UpdateCurrentUserParams) {
  const updatedData: {
    data?: { full_name?: string; avatar_url?: string }
    password?: string
  } = {};

  if (fullName) {
    updatedData.data = { ...updatedData.data, full_name: fullName };
  }
  if (password) {
    updatedData.password = password;
  }

  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  if (!avatar) return data?.user;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) {
    console.error(storageError);
    throw new Error(storageError.message);
  }
  const { data: user, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar_url: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateAvatarError) {
    console.error(updateAvatarError);
    throw new Error(updateAvatarError.message);
  }
  return user?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
