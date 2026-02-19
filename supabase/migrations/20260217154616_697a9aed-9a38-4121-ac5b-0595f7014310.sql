
-- Bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  turf_name TEXT NOT NULL,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'Pay at Turf',
  amount INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert bookings when logged in
CREATE POLICY "Authenticated users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins/owners can view all bookings
CREATE POLICY "Admins can view all bookings"
  ON public.bookings FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'owner'));

-- Admins/owners can update bookings (confirm/cancel)
CREATE POLICY "Admins can update bookings"
  ON public.bookings FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'owner'));

-- Admins can delete bookings
CREATE POLICY "Admins can delete bookings"
  ON public.bookings FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- Admin login logs table
CREATE TABLE public.admin_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  login_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT
);

ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view logs"
  ON public.admin_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'owner'));

CREATE POLICY "Admins can insert logs"
  ON public.admin_logs FOR INSERT
  WITH CHECK (auth.uid() = admin_id);

-- Index for fast booking lookups
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX idx_bookings_booking_id ON public.bookings(booking_id);
