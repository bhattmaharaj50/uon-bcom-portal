
-- Announcements table
CREATE TABLE public.announcements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date VARCHAR(20) NOT NULL,
  priority VARCHAR(10) NOT NULL DEFAULT 'normal'
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Anyone can insert announcements" ON public.announcements FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete announcements" ON public.announcements FOR DELETE USING (true);

-- Assignments table
CREATE TABLE public.assignments (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  course VARCHAR(50) NOT NULL,
  due_date VARCHAR(20) NOT NULL,
  description TEXT NOT NULL,
  file_url TEXT,
  file_name TEXT
);

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read assignments" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Anyone can insert assignments" ON public.assignments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete assignments" ON public.assignments FOR DELETE USING (true);

-- Resources table
CREATE TABLE public.resources (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  course VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL DEFAULT 'notes',
  file_url TEXT,
  file_name TEXT,
  date VARCHAR(20) NOT NULL
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Anyone can insert resources" ON public.resources FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete resources" ON public.resources FOR DELETE USING (true);

-- Feedbacks table
CREATE TABLE public.feedbacks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  is_admin VARCHAR(5) DEFAULT 'false'
);

ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read feedbacks" ON public.feedbacks FOR SELECT USING (true);
CREATE POLICY "Anyone can insert feedbacks" ON public.feedbacks FOR INSERT WITH CHECK (true);
