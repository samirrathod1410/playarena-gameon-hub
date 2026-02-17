const ADMIN_PHONE = "919876543210"; // Replace with actual admin number

export function formatPhoneForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/[\s+\-()]/g, "");
  if (cleaned.startsWith("0")) cleaned = cleaned.substring(1);
  if (!cleaned.startsWith("91")) cleaned = "91" + cleaned;
  return cleaned;
}

export function generateBookingId(): string {
  const digits = Math.floor(10000 + Math.random() * 90000);
  return `TBK${digits}`;
}

interface BookingInfo {
  bookingId: string;
  name: string;
  mobile: string;
  email: string;
  turfName: string;
  bookingDate: string;
  timeSlot: string;
  paymentMethod: string;
}

function buildAdminMessage(b: BookingInfo): string {
  return `New Turf Booking:\n\nBooking ID: ${b.bookingId}\nName: ${b.name}\nMobile: ${b.mobile}\nEmail: ${b.email}\nTurf: ${b.turfName}\nDate: ${b.bookingDate}\nTime: ${b.timeSlot}\nPayment: ${b.paymentMethod}`;
}

function buildCustomerMessage(b: BookingInfo): string {
  return `Hello ${b.name},\n\nYour Turf Booking is Successfully Received ✅\n\nBooking Details:\nBooking ID: ${b.bookingId}\nTurf: ${b.turfName}\nDate: ${b.bookingDate}\nTime: ${b.timeSlot}\nPayment: ${b.paymentMethod}\nStatus: Pending Confirmation\n\nThank you for booking with us.\nWe will confirm shortly.`;
}

export function openWhatsAppForAdmin(booking: BookingInfo) {
  const msg = encodeURIComponent(buildAdminMessage(booking));
  window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`, "_blank");
}

export function openWhatsAppForCustomer(booking: BookingInfo) {
  const phone = formatPhoneForWhatsApp(booking.mobile);
  const msg = encodeURIComponent(buildCustomerMessage(booking));
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}
