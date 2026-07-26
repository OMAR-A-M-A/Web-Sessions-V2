import type { User } from "@supabase/supabase-js";

export interface CustomUserMetadata {
  full_name?: string;
  avatar_url?: string;
  email?: string;
}

export interface AppUser extends Omit<User, "user_metadata"> {
  user_metadata: CustomUserMetadata;
}

export interface UpdateCurrentUserParams {
  fullName?: string;
  password?: string;
  avatar?: File | null;
}
