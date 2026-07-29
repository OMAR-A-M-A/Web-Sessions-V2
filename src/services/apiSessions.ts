import supabase, { supabaseUrl } from "./supabase";
import type {
  Session,
  SessionInput,
  SessionWithDetails,
  GetSessionsParams,
} from "@/types/sessionTypes";
import { PAGE_SIZE } from "@/utils/constants";

//* get all sessions with pagination, filtering, sorting, and joined details
export async function getSessions({
  filters,
  sortBy,
  page,
}: GetSessionsParams): Promise<{
  data: SessionWithDetails[];
  count: number | null;
}> {
  let query = supabase
    .from("sessions")
    .select(
      "*, categories:categories(name, slug, categoryColor), tasks:tasks(count)",
      { count: "exact" },
    );

  // apply filters
  if (filters && filters.length > 0) {
    filters.forEach((f) => {
      if (f.method) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query = (query as any)[f.method](f.field, f.value);
      } else {
        query = query.eq(f.field, f.value);
      }
    });
  }

  // apply sorting
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  } else {
    // default sorting
    query = query.order("display_order", { ascending: true });
  }

  // apply pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching sessions:", error);
    throw new Error("Could not fetch sessions. Please try again later.");
  }

  // format the data to extract the number of tasks and normalize categories object
  const formattedData: SessionWithDetails[] = (data || []).map((session) => ({
    ...session,
    tasks: session.tasks?.[0]?.count || 0,
    categories: Array.isArray(session.categories)
      ? session.categories[0]
      : session.categories,
  }));

  return { data: formattedData, count };
}

//* get one session by id
export async function getSession(id: string): Promise<Session> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching session ${id}:`, error);
    throw new Error("Session not found.");
  }

  return data;
}

//* add new session
export async function createSession(
  newSession: SessionInput,
  imageFile?: File | null,
): Promise<Session> {
  let coverImageUrl = "";

  if (imageFile) {
    // Generate a unique image name
    const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");

    // Upload the file to 'covers' bucket
    const { error: storageError } = await supabase.storage
      .from("covers")
      .upload(imageName, imageFile);

    if (storageError) {
      console.error("Error uploading image:", storageError);
      throw new Error("Could not upload the cover image.");
    }

    coverImageUrl = `${supabaseUrl}/storage/v1/object/public/covers/${imageName}`;
  }

  const sessionData = {
    ...newSession,
    cover_image: coverImageUrl,
  };

  const { data, error } = await supabase
    .from("sessions")
    .insert([sessionData])
    .select()
    .single();

  if (error) {
    console.error("Error creating session:", error);
    throw new Error("Could not create the session.");
  }

  return data;
}

//* update session
interface UpdateSessionArgs {
  id: string;
  updatedSession: Partial<SessionInput>;
  imageFile?: File | null;
}

export async function updateSession({
  id,
  updatedSession,
  imageFile,
}: UpdateSessionArgs): Promise<Session> {
  let coverImageUrl = "";

  if (imageFile) {
    const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");

    const { error: storageError } = await supabase.storage
      .from("covers")
      .upload(imageName, imageFile);

    if (storageError) {
      console.error("Error uploading image:", storageError);
      throw new Error("Could not upload the cover image.");
    }

    coverImageUrl = `${supabaseUrl}/storage/v1/object/public/covers/${imageName}`;
  }

  const sessionData = {
    ...updatedSession,
  };

  if (imageFile) {
    sessionData.cover_image = coverImageUrl;
  }

  const { data, error } = await supabase
    .from("sessions")
    .update(sessionData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating session ${id}:`, error);
    throw new Error("Could not update the session.");
  }

  return data;
}

//* delete selected session
export async function deleteSession(id: string): Promise<void> {
  const { error } = await supabase.from("sessions").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting session ${id}:`, error);
    throw new Error("Could not delete the session.");
  }
}
