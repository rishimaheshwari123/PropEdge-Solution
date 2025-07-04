"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Briefcase,
  MapPin,
  Clock,
  Building,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { getJobsAPI } from "../service/operations/job";

// This would be replaced with your actual API function
const getAllJobsAPI = async () => {
  // Placeholder - replace with actual API call
  return [
    {
      _id: "1",
      title: "Real Estate Sales Executive",
      location: "Bhopal, MP",
      type: "Full-time",
      department: "Sales",
      experience: "2-5 years",
      salary: "₹4L - ₹8L per annum",
      description:
        "We are looking for an experienced Real Estate Sales Executive to join our growing team. The ideal candidate will have a proven track record in property sales and excellent communication skills.",
      responsibilities: [
        "Generate and follow up on leads",
        "Conduct property viewings and presentations",
        "Negotiate deals and close sales",
        "Maintain client relationships",
        "Stay updated on market trends",
      ],
      requirements: [
        "2-5 years of experience in real estate sales",
        "Excellent communication and negotiation skills",
        "Valid real estate license",
        "Self-motivated with a positive attitude",
        "Knowledge of local property market",
      ],
      benefits: [
        "Competitive commission structure",
        "Health insurance",
        "Professional development opportunities",
        "Flexible working hours",
        "Team incentives and bonuses",
      ],
      postedDate: "2025-05-15T10:30:00.000Z",
      deadline: "2025-06-15T23:59:59.000Z",
    },
    {
      _id: "2",
      title: "Property Manager",
      location: "Bhopal, MP",
      type: "Full-time",
      department: "Operations",
      experience: "3+ years",
      salary: "₹5L - ₹7L per annum",
      description:
        "We are seeking a detail-oriented Property Manager to oversee our residential properties. The successful candidate will be responsible for maintaining property standards, tenant relations, and financial reporting.",
      responsibilities: [
        "Manage day-to-day operations of assigned properties",
        "Handle tenant inquiries and resolve issues",
        "Oversee maintenance and repair work",
        "Conduct regular property inspections",
        "Prepare financial reports and budgets",
      ],
      requirements: [
        "3+ years of experience in property management",
        "Strong organizational and problem-solving skills",
        "Knowledge of property management software",
        "Excellent customer service skills",
        "Basic understanding of building maintenance",
      ],
      benefits: [
        "Health and dental insurance",
        "Retirement plan",
        "Paid time off",
        "Professional development opportunities",
        "Performance bonuses",
      ],
      postedDate: "2025-05-10T09:15:00.000Z",
      deadline: "2025-06-10T23:59:59.000Z",
    },
    {
      _id: "3",
      title: "Digital Marketing Specialist",
      location: "Remote",
      type: "Full-time",
      department: "Marketing",
      experience: "2-4 years",
      salary: "₹4.5L - ₹6.5L per annum",
      description:
        "We are looking for a Digital Marketing Specialist to develop and implement marketing strategies for our real estate business. The ideal candidate will have experience in SEO, social media marketing, and content creation.",
      responsibilities: [
        "Develop and execute digital marketing campaigns",
        "Manage social media accounts and create engaging content",
        "Implement SEO strategies to improve website ranking",
        "Analyze campaign performance and prepare reports",
        "Collaborate with sales team to generate leads",
      ],
      requirements: [
        "2-4 years of experience in digital marketing",
        "Proficiency in SEO, SEM, and social media marketing",
        "Experience with Google Analytics and other marketing tools",
        "Strong analytical and creative skills",
        "Knowledge of real estate industry is a plus",
      ],
      benefits: [
        "Remote work flexibility",
        "Health insurance",
        "Paid time off",
        "Professional development budget",
        "Performance bonuses",
      ],
      postedDate: "2025-05-20T14:00:00.000Z",
      deadline: "2025-06-20T23:59:59.000Z",
    },
    {
      _id: "4",
      title: "Real Estate Photographer",
      location: "Bhopal, MP",
      type: "Part-time",
      department: "Creative",
      experience: "1-3 years",
      salary: "₹15K - ₹25K per month",
      description:
        "We are seeking a skilled photographer to capture high-quality images of our properties. The ideal candidate will have experience in real estate photography and attention to detail.",
      responsibilities: [
        "Photograph interior and exterior of properties",
        "Edit and enhance images for marketing materials",
        "Coordinate with property managers for scheduling",
        "Maintain photography equipment",
        "Deliver final images in a timely manner",
      ],
      requirements: [
        "1-3 years of experience in photography, preferably real estate",
        "Proficiency in photo editing software",
        "Own photography equipment",
        "Flexible schedule",
        "Eye for detail and composition",
      ],
      benefits: [
        "Flexible working hours",
        "Opportunity for full-time employment",
        "Portfolio development",
        "Travel allowance",
        "Performance bonuses",
      ],
      postedDate: "2025-05-18T11:45:00.000Z",
      deadline: "2025-06-18T23:59:59.000Z",
    },
  ];
};

const Careers = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [uniqueDepartments, setUniqueDepartments] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);

  // Extract unique values for filters
  const extractUniqueValues = (jobs) => {
    const departments = [
      ...new Set(jobs.map((job) => job.department).filter(Boolean)),
    ];
    const types = [...new Set(jobs.map((job) => job.type).filter(Boolean))];
    const locations = [
      ...new Set(jobs.map((job) => job.location).filter(Boolean)),
    ];

    setUniqueDepartments(departments);
    setUniqueTypes(types);
    setUniqueLocations(locations);
  };

  // Fetch all jobs
  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const response = await getJobsAPI();
      setJobs(response);
      extractUniqueValues(response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load job listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining until deadline
  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days remaining` : "Deadline passed";
  };

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" || job.department === selectedDepartment;
    const matchesType = selectedType === "all" || job.type === selectedType;
    const matchesLocation =
      selectedLocation === "all" || job.location === selectedLocation;

    return matchesSearch && matchesDepartment && matchesType && matchesLocation;
  });

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("all");
    setSelectedType("all");
    setSelectedLocation("all");
  };

  // Handle job click
  const handleJobClick = (jobId) => {
    navigate(`/careers/${jobId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchAllJobs}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-16 gradient-gold text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join Our Team
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover exciting career opportunities and be part of our mission
              to transform the real estate industry
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a dynamic work environment with opportunities for growth,
              competitive benefits, and a chance to make a real impact in the
              real estate industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Professional Growth
              </h3>
              <p className="text-gray-600">
                We invest in our team's development with training programs,
                mentorship, and opportunities for advancement.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Collaborative Culture
              </h3>
              <p className="text-gray-600">
                Join a team that values collaboration, innovation, and creating
                exceptional experiences for our clients.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
                  <path d="M15 7h6v6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Competitive Benefits
              </h3>
              <p className="text-gray-600">
                We offer competitive salaries, health benefits, flexible work
                arrangements, and performance incentives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our current job opportunities and find the perfect role
              for your skills and career goals.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 text-black placeholder:text-gray-500"
                />
              </div>
              <Select
                value={selectedDepartment}
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm ||
              selectedDepartment !== "all" ||
              selectedType !== "all" ||
              selectedLocation !== "all") && (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {(searchTerm ||
            selectedDepartment !== "all" ||
            selectedType !== "all" ||
            selectedLocation !== "all") && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Active Filters:
              </h3>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800"
                  >
                    Search: {searchTerm}
                  </Badge>
                )}
                {selectedDepartment !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800"
                  >
                    Department: {selectedDepartment}
                  </Badge>
                )}
                {selectedType !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800"
                  >
                    Type: {selectedType}
                  </Badge>
                )}
                {selectedLocation !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800"
                  >
                    Location: {selectedLocation}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {filteredJobs.length} Jobs Found
            </h3>
          </div>

          {/* Job Cards */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job._id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleJobClick(job._id)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            {job.department}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.experience}
                          </span>
                        </div>
                        <p className="text-gray-600 line-clamp-2 mb-4">
                          {job.description}
                        </p>
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-1 text-amber-600" />
                          <span className="text-gray-600 mr-2">
                            Posted: {formatDate(job.postedDate)}
                          </span>
                          <span className="text-amber-600 font-medium">
                            {calculateDaysRemaining(job.deadline)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Button className="gradient-gold text-white">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No jobs found
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

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Fit?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume
            and we'll keep you in mind for future opportunities.
          </p>
          <Button
            size="lg"
            className="gradient-gold text-white"
            onClick={() => navigate("/careers/general-application")}
          >
            Submit General Application
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Careers;
