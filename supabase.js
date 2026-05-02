if (typeof supabase === 'undefined') {
    const SUPABASE_URL = "https://uymmflfhpeurfiigeivh.supabase.co";
    const SUPABASE_KEY = "sb_publishable_XQjrq5LLhA4b3O32ioObqQ_PNbJD5E5";
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    var supabase = window.supabaseClient; 
}
