"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup = ({ isOpen, onClose }: ContactPopupProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    propertyType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with your actual API call
    // const response = await createInquiryAPI(formData);

    // Simulating API call for now
    const response = true;

    if (response) {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      onClose();
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      propertyType: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            Inquiry For the properties
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button> */}
          </DialogTitle>
          <p className="text-gray-600">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="popup-name">Full Name *</Label>
              <Input
                id="popup-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="popup-email">Email Address *</Label>
              <Input
                id="popup-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="popup-phone">Phone Number *</Label>
              <Input
                id="popup-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <div>
              <Label htmlFor="popup-propertyType">Property Interest</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) =>
                  handleInputChange("propertyType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                  <SelectItem value="buying-a-home">Buying a home</SelectItem>
                  <SelectItem value="renting-a-home">Renting a home</SelectItem>
                  <SelectItem value="sell-property">Sell property</SelectItem>
                  <SelectItem value="rent-property">Rent property</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="popup-subject">Subject *</Label>
            <Input
              id="popup-subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder="How can we help you?"
              required
            />
          </div>

          <div>
            <Label htmlFor="popup-message">Message *</Label>
            <Textarea
              id="popup-message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell us more about your requirements..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gradient-gold text-white">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
