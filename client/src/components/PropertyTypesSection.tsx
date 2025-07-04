"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Building,
  Home,
  Building2,
  MapPin,
  Key,
  Search,
  DollarSign,
  HandHeart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyTypesSection = () => {
  const router = useNavigate();

  const propertyTypes = [
    {
      id: "apartment",
      title: "Apartment",
      image:
        "https://is1-2.housingcdn.com/4f2250e8/e40e9a26237f9ba9c5c0fe2dec96a6ba/v5/fs/siddharth_apartment-ratanpur_bhopal-bhopal-siddharth_construction_%26_builders.jpg",
      icon: Building,
      description: "Modern apartments in prime locations",
    },
    {
      id: "villa",
      title: "Villa",
      image:
        "https://www.maramani.com/cdn/shop/articles/ID_24402-1.jpg?v=1700459989&width=1500",
      icon: Home,
      description: "Luxury villas with premium amenities",
    },
    {
      id: "commercial",
      title: "Commercial",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtKPhTIXHRqKTBvlaVAeqJs14cJWqVGjJVVg&s",
      icon: Building2,
      description: "Office spaces and commercial properties",
    },
    {
      id: "plot",
      title: "Plot",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgWuUyJmnLuvj1BurkemfWGSqdb0WKGTr-Wg&s",
      icon: MapPin,
      description: "Residential and commercial plots",
    },
    {
      id: "buying-a-home",
      title: "Buying a Home",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbcrj53mGyk-u4JwrIb6z1RBAeCpxR78gfQ&s",
      icon: Key,
      description: "Find your dream home to purchase",
    },
    {
      id: "renting-a-home",
      title: "Renting a Home",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRicwRmM2_WYADdZ7ygXgQv1nKGuP3iAxfXUg&s",
      icon: Search,
      description: "Discover rental properties",
    },
    {
      id: "sell-property",
      title: "Sell Property",
      image:
        "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202403/65ee8897a0986-i-want-to-sell-my-house-and-buy-two-other-residential-properties-the-capital-gain-on-it-will-be-aro-112910279-16x9.jpg?size=948:533",
      icon: DollarSign,
      description: "List your property for sale",
    },
    {
      id: "rent-property",
      title: "Rent Property",
      image:
        "https://blog.ipleaders.in/wp-content/uploads/2021/07/Real-Estate-Is-this-a-good-time-to-buy-a-house-1.jpg",
      icon: HandHeart,
      description: "Rent out your property",
    },
  ];

  const handlePropertyTypeClick = (typeId: string) => {
    router(`/properties?type=${typeId}`);
  };
  const handleProperty = (typeId: string) => {
    router(`/properties`);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Property Types
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the perfect property type that matches your needs. From
            luxury villas to commercial spaces, we have it all.
          </p>
        </div>

        {/* Property Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card
                key={type.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border-0 shadow-md overflow-hidden"
                onClick={() => handlePropertyTypeClick(type.id)}
              >
                <CardContent className="p-0">
                  {/* Property Type Title */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-3 gradient-gold rounded-full">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {type.description}
                    </p>
                  </div>

                  {/* Property Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={type.image || "/placeholder.svg"}
                      alt={type.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button
            onClick={() => router("/properties")}
            className="inline-flex items-center px-8 py-3 gradient-gold hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            View All Properties
            <Search className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyTypesSection;
