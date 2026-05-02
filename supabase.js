console.log("Se inițializează Supabase...");

const SUPABASE_URL = "https://supabase.co";
const SUPABASE_KEY = "sb_publishable_XQjrq5LLhA4b3O32ioObqQ_PNbJD5E5";

try {
    window.db_supa = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Conexiune creată cu succes în window.db_supa");
} catch (e) {
    console.error("Eroare la crearea clientului Supabase:", e);
}
