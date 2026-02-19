import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://dvelfnopbpwsurvpicvi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2ZWxmbm9wYnB3c3VydnBpY3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NjQ1MzAsImV4cCI6MjA4NzA0MDUzMH0.fFqkyVOwiuq2RYkEhH1HpHSK26sBYS9Pebix1R3lvq0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export async function uploadFile(file: File, folder: string): Promise<{ url: string; fileName: string } | null> {
  const fileExt = file.name.split('.').pop();
  const filePath = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { error } = await supabase.storage.from('class-files').upload(filePath, file);
  if (error) {
    console.error('Upload error:', error);
    return null;
  }
  
  const { data } = supabase.storage.from('class-files').getPublicUrl(filePath);
  return { url: data.publicUrl, fileName: file.name };
}
