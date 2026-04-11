import { createClient } from "@/lib/supabase/server";

export default async function AdminImportPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user ? await supabase.from("profiles").select("role").eq("id", user.id).single() : { data: null };
  if (!user || profile?.role !== "admin") return <div className="card">Admin only.</div>;

  return <div className="card"><h1 className="text-2xl font-bold">Admin Import</h1><p className="mt-2 text-sm text-gray-300">Run <code>npm run seed</code> locally with service role key to import seasonal BO7 content safely.</p></div>;
}
