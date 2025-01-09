import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
export async function insertData(table, data) {
  const { data: result, error } = await supabase.from(table).insert(data);
  if (error) throw error;
  return result;
}

export async function updateData(table, id, data) {
  const { data: result, error } = await supabase.from(table).update(data).eq("id", id);
  if (error) throw error;
  return result;
}

export async function deleteData(table, id) {
  const { data: result, error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
  return result;
}