-- Login logs table to track all user sign-ins
CREATE TABLE public.login_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  roles TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  user_agent TEXT,
  login_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.login_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view login logs"
  ON public.login_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'owner'));

CREATE POLICY "Users can insert their own login logs"
  ON public.login_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_login_logs_user_id ON public.login_logs(user_id);
CREATE INDEX idx_login_logs_login_time ON public.login_logs(login_time DESC);
