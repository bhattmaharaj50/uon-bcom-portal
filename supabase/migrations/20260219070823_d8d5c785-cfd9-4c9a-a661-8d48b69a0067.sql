
-- Create a public storage bucket for class portal files
INSERT INTO storage.buckets (id, name, public) VALUES ('class-files', 'class-files', true);

-- Allow anyone to read/download files
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'class-files');

-- Allow anyone to upload files (admin gated by UI since no real auth)
CREATE POLICY "Public upload access" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'class-files');

-- Allow anyone to delete files (admin gated by UI)
CREATE POLICY "Public delete access" ON storage.objects FOR DELETE USING (bucket_id = 'class-files');
