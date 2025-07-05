"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";

export default function CouponForm() {
  const [formData, setFormData] = useState({
    title: "",
    couponCode: "",
    expiryDate: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to create coupon");

      toast.success("Coupon created successfully!");
      setFormData({ title: "", couponCode: "", expiryDate: "", isActive: true });
    } catch (err) {
      toast.error("Error creating coupon");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="couponCode">Coupon Code</Label>
        <Input name="couponCode" value={formData.couponCode} onChange={handleChange} required />
      </div>

      <div>
        <Label htmlFor="expiryDate">Expiry Date</Label>
        <Input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="isActive">Active</Label>
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(val) => setFormData({ ...formData, isActive: val })}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Coupon"}
      </Button>
    </form>
  );
}
