import { Home, Check } from "lucide-react";

export default function Service() {
  const services = [
    {
      title: "BUY",
      description:
        "Looking to buy your property? We offer expert guidance to help you get the best price in the market! Whether it's a home, commercial space, or land, our experienced team ensures a smooth, stress-free process. Contact us today to start your property buying journey with confidence!",
    },
    {
      title: "SELL",
      description:
        "Looking to sell your property? We offer expert guidance to help you get the best price in the market! Whether it's a home, commercial space, or land, our experienced team ensures a smooth, stress-free process. Contact us today to start your property selling journey with confidence!",
    },
    {
      title: "RENT",
      description:
        "Discover your ideal rental property! Spacious apartments and homes available in prime locations, offering modern amenities and affordable rates. Perfect for families, professionals, or students. Schedule a viewing today!",
    },
  ];

  const values = [
    "TRUST",
    "ACCOUNTABILITY",
    "SERVICE",
    "EXCELLENCE",
    "COLLABORATION",
    "INNOVATION",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-lg">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
              Explore Us
            </h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-blue-700 text-xl font-semibold max-w-2xl mx-auto">
            Your Ultimate Property Hub: Rent, Buy, and Sell with Ease
          </p>
        </div>

        {/* Services Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-3">
                  {service.title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              </div>
              <p className="text-blue-600 leading-relaxed text-justify">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-3xl p-10 shadow-2xl border border-blue-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-4">
              OUR VALUES
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-blue-800 tracking-wide">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
