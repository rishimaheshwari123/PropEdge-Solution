import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Search,
  FileText,
  Calculator,
  Users,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Property Sales",
      description:
        "Comprehensive property sales services for residential, commercial, and industrial properties.",
      features: [
        "Market Analysis",
        "Property Valuation",
        "Marketing Strategy",
        "Negotiation Support",
      ],
    },
    {
      icon: Search,
      title: "Property Search",
      description:
        "Expert assistance in finding the perfect property that matches your requirements and budget.",
      features: [
        "Personalized Search",
        "Location Analysis",
        "Property Tours",
        "Investment Guidance",
      ],
    },
    {
      icon: FileText,
      title: "Legal Documentation",
      description:
        "Complete legal support for property transactions with experienced legal professionals.",
      features: [
        "Document Verification",
        "Registration Support",
        "Legal Compliance",
        "Title Clearance",
      ],
    },
    {
      icon: Calculator,
      title: "Property Valuation",
      description:
        "Accurate property valuation services based on market trends and expert analysis.",
      features: [
        "Market Research",
        "Comparative Analysis",
        "Investment Assessment",
        "Detailed Reports",
      ],
    },
    {
      icon: Users,
      title: "Vendor Services",
      description:
        "Multi-vendor platform for property owners to list and manage their properties effectively.",
      features: [
        "Property Listing",
        "Vendor Verification",
        "Lead Management",
        "Performance Analytics",
      ],
    },
    {
      icon: Shield,
      title: "Property Management",
      description:
        "Complete property management solutions for landlords and property investors.",
      features: [
        "Tenant Management",
        "Maintenance Services",
        "Rent Collection",
        "Property Maintenance",
      ],
    },
  ];

  const process = [
    {
      step: "01",
      title: "Consultation",
      description:
        "Initial consultation to understand your requirements and preferences",
    },
    {
      step: "02",
      title: "Property Search",
      description: "Curated property options based on your criteria and budget",
    },
    {
      step: "03",
      title: "Site Visits",
      description: "Guided property tours and detailed property inspections",
    },
    {
      step: "04",
      title: "Documentation",
      description: "Complete legal documentation and registration support",
    },
    {
      step: "05",
      title: "Handover",
      description: "Smooth property handover with post-sale support",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 gradient-gold text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From property search to legal documentation, we provide end-to-end
              real estate services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow h-full"
              >
                <CardHeader>
                  <div className="w-16 h-16 gradient-gold rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A streamlined approach to ensure smooth property transactions
            </p>
          </div>

          {/* Corrected Process Grid and Lines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {process.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl flex-shrink-0">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>

                {/* Horizontal line for desktop (hidden on mobile) */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute left-[calc(50%+2rem)] top-8 w-[calc(100%-4rem)] h-0.5 bg-primary -z-10"></div>
                )}
                {/* Vertical line for mobile/tablet (hidden on desktop) */}
                {index < process.length - 1 && (
                  <div className="lg:hidden absolute bottom-0 left-1/2 w-0.5 h-[calc(100%)] bg-primary transform -translate-x-1/2 translate-y-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your real estate needs and let our
              experts guide you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="gradient-gold text-white">
                  Get Free Consultation
                </Button>
              </Link>
              <Link to="/properties">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-black border-white hover:bg-white hover:text-gray-900"
                >
                  View Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
