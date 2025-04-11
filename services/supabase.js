// services/supabase.js

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eukdljvwspwrfbtgrote.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1a2RsanZ3c3B3cmZidGdyb3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjgxMzcsImV4cCI6MjA1Nzk0NDEzN30.cEH7-HQ91hdsxuIEZaSOSNYH7YsuT00GyHVsMC9SRT8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
