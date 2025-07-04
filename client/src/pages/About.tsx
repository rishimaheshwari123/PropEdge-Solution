import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Home, TrendingUp } from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: Award,
      title: "25+ Years Experience",
      description: "Trusted expertise in Bhopal real estate market",
    },
    {
      icon: Users,
      title: "5,000+ Happy Clients",
      description: "Successfully served thousands of families",
    },
    {
      icon: Home,
      title: "10,00,000+ Sq. Ft. Sold",
      description: "Extensive portfolio of successful transactions",
    },
    {
      icon: TrendingUp,
      title: "Market Leaders",
      description: "Leading real estate company in Bhopal",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 gradient-gold text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About PropEdge
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Building trust and creating homes for over 25 years in Bhopal
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                PropEdge Infra was founded with a simple vision: to make real
                estate accessible, transparent, and trustworthy for everyone in
                Bhopal. What started as a small family business has grown into
                one of the most respected names in Madhya Pradesh's real estate
                industry.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Located in Awadhpuri BDA Road, Bhopal, we have been serving the
                community for over 25 years, helping families find their dream
                homes and investors discover profitable opportunities.
              </p>
              <p className="text-lg text-gray-600">
                Our commitment to excellence, ethical practices, and customer
                satisfaction has earned us the trust of over 5,000 clients and
                helped us facilitate the sale of more than 10,00,000 square feet
                of prime real estate.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625"
                alt="Our Office"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Numbers that speak for our commitment and success in the real
              estate industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <achievement.icon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional real estate services that exceed our
                clients' expectations while maintaining the highest standards of
                integrity, professionalism, and customer care. We strive to make
                the process of buying, selling, or renting property as smooth
                and transparent as possible.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted and preferred real estate partner in
                Madhya Pradesh, recognized for our innovative solutions, ethical
                practices, and commitment to creating value for our clients,
                partners, and the community at large.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PropEdge ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We bring together experience, expertise, and dedication to serve
              you better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Trusted Expertise
              </h3>
              <p className="text-gray-600">
                25+ years of experience in Bhopal's real estate market with deep
                local knowledge
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Client-Centric Approach
              </h3>
              <p className="text-gray-600">
                Personalized service tailored to meet your specific needs and
                requirements
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Market Leadership
              </h3>
              <p className="text-gray-600">
                Leading real estate company with proven track record and market
                insights
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
