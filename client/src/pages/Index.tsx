"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Search,
  MapPin,
  Home,
  Users,
  Award,
  Bath,
  Maximize,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useState, useEffect } from "react";
import { getAllPropertyAPI } from "../service/operations/property";
import Service from "@/components/Service";
import Client from "@/components/Client";
import Review from "@/components/Review";
import VisionMissionSection from "@/components/VisionMissionSection";
import PropertyTypesSection from "@/components/PropertyTypesSection";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all-types");
  const [priceRange, setPriceRange] = useState([0, 10]); // Changed to array for slider [min, max] in crores
  const [location, setLocation] = useState("all-locations");
  const [sortBy, setSortBy] = useState("newest");

  // Data states
  const [properties, setProperties] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Price range options for display
  const formatPriceRange = (range) => {
    const [min, max] = range;
    if (min === 0 && max === 10) return "all-prices";
    if (min === 0) return `under-${max * 100}`;
    if (max === 10) return `above-${min * 100}`;
    return `${min * 100}-${max * 100}`;
  };

  // Convert price range to display text
  const getPriceRangeText = (range) => {
    const [min, max] = range;
    if (min === 0 && max === 10) return "All Prices";
    if (min === 0) return `Under ₹${max} Cr`;
    if (max === 10) return `Above ₹${min} Cr`;
    return `₹${min} Cr - ₹${max} Cr`;
  };

  // Extract unique property types and locations
  const extractUniqueValues = (properties) => {
    const types = [
      ...new Set(properties.map((property) => property.type).filter(Boolean)),
    ];
    const locations = [
      ...new Set(
        properties
          .map((property) => {
            // Extract city/area name from full location string
            const locationParts = property.location.split(",");
            return locationParts[0].trim(); // Get the first part (area name)
          })
          .filter(Boolean)
      ),
    ];

    setUniqueTypes(types);
    setUniqueLocations(locations);
  };

  // Fetch properties and extract unique types
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await getAllPropertyAPI();
      setProperties(response);
      extractUniqueValues(response);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.append("search", searchTerm);
    if (propertyType && propertyType !== "all-types")
      searchParams.append("type", propertyType);

    // Convert price range to the format expected by the properties page
    const priceRangeString = formatPriceRange(priceRange);
    if (priceRangeString !== "all-prices")
      searchParams.append("price", priceRangeString);

    if (location && location !== "all-locations")
      searchParams.append("location", location);

    // Navigate to properties page with search params
    window.location.href = `/properties?${searchParams.toString()}`;
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  // Clear all filters function
  const clearFilters = () => {
    setSearchTerm("");
    setPropertyType("all-types");
    setPriceRange([0, 10]);
    setLocation("all-locations");
    setSortBy("newest");
  };

  const stats = [
    { icon: Home, value: "10,00,000+", label: "Sq. Ft. Sold" },
    { icon: Users, value: "5,000+", label: "Happy Clients" },
    { icon: Award, value: "25+", label: "Years Experience" },
    {
      icon: MapPin,
      value: `${properties.length}+`,
      label: "Properties Listed",
    },
  ];

  // Get 6 latest properties for featured section (not filtered)
  const featuredProperties = properties
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date || 0) -
        new Date(a.createdAt || a.date || 0)
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-black/70 to-black/50 flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1721322800607-8c38375eef04')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Property in{" "}
            <span className="text-blue-500">Bhopal</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            With 25+ years of experience, we help you find the perfect home or
            investment property
          </p>

          {/* Enhanced Search Bar with Improved Price Range UI */}
          <div className="bg-white rounded-lg p-6 max-w-6xl mx-auto shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-1">
                <Input
                  placeholder="Search properties..."
                  className="h-12 text-black placeholder:text-gray-500 border-gray-300 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="lg:col-span-1">
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-12 text-black border-gray-300">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">All Types</SelectItem>
                    {uniqueTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-1">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-12 text-black border-gray-300">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-locations">All Locations</SelectItem>
                    {uniqueLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="lg:col-span-1">
                <Button
                  className="h-12 w-full gradient-gold text-white"
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Price Range Slider - Moved below the main search controls */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium text-gray-700">
                  Price Range
                </Label>
                <span className="text-sm font-medium text-blue-600">
                  {getPriceRangeText(priceRange)}
                </span>
              </div>
              <div className="px-2 mb-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={10}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹0</span>
                  <span>₹5 Cr</span>
                  <span>₹10+ Cr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm ||
            propertyType !== "all-types" ||
            priceRange[0] !== 0 ||
            priceRange[1] !== 10 ||
            location !== "all-locations") && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700">
                Active Filters:
              </span>
              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Search: {searchTerm}
                </Badge>
              )}
              {propertyType !== "all-types" && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Type: {propertyType}
                </Badge>
              )}
              {(priceRange[0] !== 0 || priceRange[1] !== 10) && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Price: {getPriceRangeText(priceRange)}
                </Badge>
              )}
              {location !== "all-locations" && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Location: {location}
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="ml-auto text-gray-600"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <stat.icon className="w-12 h-12 mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PropertyTypesSection />
      <VisionMissionSection />

      {/* Featured Properties with Filters */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our selection of premium properties in Bhopal
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchProperties}>Try Again</Button>
            </div>
          ) : featuredProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <Card
                    key={property.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => handlePropertyClick(property._id)}
                  >
                    <div className="relative">
                      <div className="relative group w-full h-64 overflow-hidden">
                        {/* Default image */}
                        <img
                          src={
                            property.images[0]?.url ||
                            "/placeholder.svg?height=300&width=400"
                          }
                          alt={property.title}
                          className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />

                        {/* Hover image */}
                        {property.images[1]?.url && (
                          <img
                            src={property.images[1].url || "/placeholder.svg"}
                            alt={property.title}
                            className="absolute top-0 left-0 w-full h-64 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          />
                        )}
                      </div>

                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`${
                            property.status === "For Sale"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          } text-white`}
                        >
                          Available
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 capitalize"
                        >
                          {property.type}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                          {property.title}
                        </h3>
                        <span className="text-xl font-bold text-amber-600">
                          {property.price}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </p>
                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        {property.bedrooms > 0 && (
                          <span className="flex items-center">
                            <Home className="w-4 h-4 mr-1" />
                            {property.bedrooms} Bed
                          </span>
                        )}
                        {property.bathrooms > 0 && (
                          <span className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            {property.bathrooms} Bath
                          </span>
                        )}
                        <span className="flex items-center">
                          <Maximize className="w-4 h-4 mr-1" />
                          {property.area}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {property.description}
                      </p>
                      <Button
                        className="w-full gradient-gold text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePropertyClick(property._id);
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <a href="/properties">
                  <Button size="lg" className="gradient-gold text-white">
                    View All Properties
                  </Button>
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Client />

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with our expert team and let us help you find the
            perfect property in Bhopal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" className="gradient-gold text-white">
                Contact Us
              </Button>
            </a>
            <a href="/properties">
              <Button
                size="lg"
                variant="outline"
                className="text-black border-black hover:bg-white hover:text-gray-900"
              >
                Browse Properties
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Review />
      <Service />
    </div>
  );
};

export default Index;
