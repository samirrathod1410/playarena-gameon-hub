
import React, { useState } from "react";
import { toast } from "@/components/ui/sonner";

const Checkout: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.paymentMethod) {
      toast.error("Please fill all required fields");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      toast.error("Enter a valid email address");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "").slice(-10))) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Order placed successfully!");
      setForm({ name: "", email: "", phone: "", paymentMethod: "" });
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        {/* Payment Method */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            className="w-full border rounded px-3 py-2"
            value={form.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select a payment method</option>
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          disabled={submitting}
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
