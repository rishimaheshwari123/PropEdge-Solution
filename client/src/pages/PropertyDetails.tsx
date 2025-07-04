"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Home,
  Bath,
  Bed,
  Square,
  Share2,
  ArrowLeft,
  Send,
  ChevronLeft,
  ChevronRight,
  Eye,
  Phone,
  Mail,
  Building,
  Car,
  Shield,
  Zap,
  Droplets,
  Wifi,
  Camera,
  TreePine,
  Sofa,
} from "lucide-react";
import { toast } from "sonner";
import { getPropertyBYIDAPI } from "../service/operations/property";
import { createContactAPI } from "../service/operations/contact";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await getPropertyBYIDAPI(id);
        if (response) {
          setProperty(response);
        } else {
          toast.error("Property not found");
          navigate("/properties");
        }
      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("Failed to load property details");
        navigate("/properties");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, navigate]);

  // Function to check if property type is residential
  const isResidentialType = (type) => {
    return [
      "apartment",
      "villa",
      "buying-a-home",
      "renting-a-home",
      "house",
      "condo",
      "townhouse",
    ].includes(type?.toLowerCase() || "");
  };

  // Function to check if property type is commercial
  const isCommercialType = (type) => {
    return ["commercial"].includes(type?.toLowerCase() || "");
  };

  // Function to check if property type is plot
  const isPlotType = (type) => {
    return ["plot"].includes(type?.toLowerCase() || "");
  };

  // Function to render property stats based on type
  const renderPropertyStats = () => {
    if (isResidentialType(property?.type)) {
      return (
        <>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Bed className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {property.bedrooms || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Bedrooms</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Bath className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {property.bathrooms || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Bathrooms</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Square className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {property.area || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Area</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Home className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">
              {property.type || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Type</div>
          </div>
        </>
      );
    } else if (isCommercialType(property?.type)) {
      return (
        <>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {property.floors || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Floors</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Car className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {property.parking || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Parking</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Square className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {property.area || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Area</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Sofa className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">
              {property.furnished || "Not Specified"}
            </div>
            <div className="text-sm text-gray-600">Furnished</div>
          </div>
        </>
      );
    } else if (isPlotType(property?.type)) {
      return (
        <>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TreePine className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">
              {property.plotType || "Residential"}
            </div>
            <div className="text-sm text-gray-600">Plot Type</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Square className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {property.area || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Plot Area</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Home className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">
              {property.type || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Type</div>
          </div>
        </>
      );
    } else {
      // Default case for other property types
      return (
        <>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Square className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {property.area || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Area</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Home className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 capitalize">
              {property.type || "N/A"}
            </div>
            <div className="text-sm text-gray-600">Type</div>
          </div>
        </>
      );
    }
  };

  // Function to render property summary in modal based on type
  const renderPropertySummary = () => {
    if (isResidentialType(property?.type)) {
      return (
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {property.bedrooms || 0} BHK
          </span>
          <span className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {property.bathrooms || 0} Bath
          </span>
          <span className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area || "N/A"}
          </span>
        </div>
      );
    } else if (isCommercialType(property?.type)) {
      return (
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center">
            <Building className="w-4 h-4 mr-1" />
            {property.floors || 0} Floors
          </span>
          <span className="flex items-center">
            <Car className="w-4 h-4 mr-1" />
            {property.parking || 0} Parking
          </span>
          <span className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area || "N/A"}
          </span>
        </div>
      );
    } else if (isPlotType(property?.type)) {
      return (
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center">
            <TreePine className="w-4 h-4 mr-1" />
            {property.plotType || "Residential"} Plot
          </span>
          <span className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area || "N/A"}
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {property.area || "N/A"}
          </span>
        </div>
      );
    }
  };

  // Get property images - use actual property images or fallback to placeholder
  const getPropertyImages = () => {
    if (
      property?.images &&
      Array.isArray(property.images) &&
      property.images.length > 0
    ) {
      return property.images;
    }
    // Fallback to single image if no images array
    if (property?.image) {
      return [{ url: property.image, public_id: "main" }];
    }
    // Default placeholder
    return [
      {
        url: "/placeholder.svg?height=600&width=800",
        public_id: "placeholder",
      },
    ];
  };

  const propertyImages = getPropertyImages();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + propertyImages.length) % propertyImages.length
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!property || !property.vendor) {
      toast.error("Property or vendor information is missing");
      return;
    }

    try {
      setIsSubmitting(true);
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        property,
      };
      const response = await createContactAPI(contactData);

      if (response) {
        toast.success("Inquiry sent successfully! We'll contact you soon.");
        setIsModalOpen(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Failed to send inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Property link copied to clipboard!");
  };

  const handleBack = () => {
    navigate("/properties");
  };

  const handleCall = () => {
    if (property?.vendor?.phone) {
      window.location.href = `tel:${property.vendor.phone}`;
    } else {
      toast.error("Phone number not available");
    }
  };

  const handleEmail = () => {
    if (property?.vendor?.email) {
      window.location.href = `mailto:${property.vendor.email}?subject=Inquiry about ${property.title}`;
    } else {
      toast.error("Email address not available");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h2>
          <Button onClick={handleBack} size="lg">
            Go Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="relative">
        <div className="relative h-[60vh] overflow-hidden bg-gray-900">
          <img
            src={propertyImages[currentImageIndex]?.url || "/placeholder.svg"}
            alt={`${property.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=600&width=800";
            }}
          />

          {/* Image Navigation */}
          {propertyImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full flex items-center gap-1">
            <Camera className="w-4 h-4" />
            <span className="text-sm">
              {currentImageIndex + 1} / {propertyImages.length}
            </span>
          </div>

          {/* Property Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {property.title}
                </h1>
                <p className="text-xl mb-3 flex items-center opacity-90">
                  <MapPin className="w-5 h-5 mr-2" />
                  {property.location}
                </p>
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-3xl md:text-4xl font-bold text-green-400">
                    {property.price}
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 capitalize"
                  >
                    {property.type}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Thumbnails */}
        {propertyImages.length > 1 && (
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex gap-2 overflow-x-auto">
                {propertyImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.svg?height=64&width=80";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats - Conditional based on property type */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {renderPropertyStats()}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Property
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {property.description ||
                    "No description available for this property."}
                </p>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Car, label: "Parking Space", available: true },
                    { icon: Shield, label: "24/7 Security", available: true },
                    { icon: Zap, label: "Power Backup", available: true },
                    { icon: Droplets, label: "Water Supply", available: true },
                    { icon: Wifi, label: "Internet Ready", available: true },
                    { icon: Building, label: "Elevator", available: true },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {feature.label}
                      </span>
                      {feature.available && (
                        <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact & Details */}
          <div className="space-y-6">
            {/* Contact Vendor */}
            <Card className="shadow-lg sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Contact Agent
                </h3>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {property.vendor?.name?.charAt(0) || "A"}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      {property.vendor?.name || "Property Agent"}
                    </h4>
                    <p className="text-gray-600">
                      {property.vendor?.company || "Real Estate Professional"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Send Inquiry
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          Property Inquiry
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6">
                        {/* Property Summary */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
                          <div className="flex items-start space-x-4">
                            <img
                              src={propertyImages[0]?.url || "/placeholder.svg"}
                              alt={property.title}
                              className="w-20 h-20 object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "/placeholder.svg?height=80&width=80";
                              }}
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">
                                {property.title}
                              </h4>
                              <p className="text-gray-600 flex items-center mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property.location}
                              </p>
                              <p className="text-xl font-bold text-green-600 mt-2">
                                {property.price}
                              </p>
                              {renderPropertySummary()}
                            </div>
                          </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name *</Label>
                              <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number *</Label>
                              <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter your email address"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              disabled={isSubmitting}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message">Message (Optional)</Label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Any specific questions or requirements..."
                              value={formData.message}
                              onChange={handleInputChange}
                              rows={4}
                              disabled={isSubmitting}
                            />
                          </div>

                          <div className="flex space-x-3 pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsModalOpen(false)}
                              className="flex-1"
                              disabled={isSubmitting}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="flex-1"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Inquiry
                                </>
                              )}
                            </Button>
                          </div>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={handleCall}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleEmail}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Property Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-green-100 text-green-800">
                      Available
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium capitalize">
                      {property.type || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Listed On</span>
                    <span className="font-medium">
                      {property.createdAt
                        ? new Date(property.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property ID</span>
                    <span className="font-medium">
                      #{property._id?.slice(-6).toUpperCase() || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      Views
                    </span>
                    <span className="font-medium">{property.views || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Property
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
