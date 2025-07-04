"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../service/operations/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user and token from Redux store
  const user = useSelector((state: RootState) => state.auth?.user ?? null);
  const token = useSelector((state: RootState) => state.auth?.token ?? null);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Properties", href: "/properties" },
    { name: "News", href: "/blogs" },
    { name: "Career", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Get dashboard URL based on user role
  const getDashboardUrl = () => {
    if (!user) return "/";

    if (user.role === "admin") {
      return "/admin/dashboard";
    } else if (user.role === "vendor") {
      return "/vendor/dashboard";
    }
    return "/";
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setIsLoginDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="w-[95vw] mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {/* <img
                src="/lovable-uploads/logo.png"
                alt="PropEdge  Real Estate"
                className="h-20  w-auto"
              /> */}

              <p>Logo</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/vendor">
              <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded flex items-center gap-2 font-medium hover:bg-blue-50 transition">
                Post Property
                <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
                  FREE
                </span>
              </button>
            </Link>
            <Link to="/customer-support">
              <button className="text-white border bg-blue-600 hover:text-black border-blue-600  px-4 py-2 rounded flex items-center gap-2 font-medium hover:bg-blue-50 transition">
                Customer Support
              </button>
            </Link>

            {/* User Authentication Section */}
            {token && user ? (
              // Logged in user dropdown
              <div className="relative dropdown-container">
                <Button
                  className="bg-gradient-to-r gradient-gold text-white flex items-center"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <User className="w-4 h-4 mr-2" />
                  {user.name || user.email}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name || user.email}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>

                    <Link
                      to={getDashboardUrl()}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login dropdown for non-authenticated users
              <div className="relative dropdown-container">
                <Button
                  className="gradient-gold text-white flex items-center"
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                >
                  Login <ChevronDown className="w-4 h-4 ml-1" />
                </Button>

                {isLoginDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <Link
                      to="/admin/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Admin Login
                    </Link>
                    <Link
                      to="/vendor/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Vendor Login
                    </Link>
                    <Link
                      to="/vendor/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Vendor Register
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-amber-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                {/* <img
                  src="/lovable-uploads/logo.png"
                  alt="PropEdge  Real Estate"
                  className="h-20 w-auto"
                /> */}
                <p>Logo</p>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-amber-600 p-2"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col h-full overflow-y-auto">
                {/* User Info Section */}
                {token && user && (
                  <div className="p-4 border-b bg-gradient-to-r from-amber-50 to-orange-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 gradient-gold rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {user.name || user.email}
                        </p>
                        <p className="text-sm text-gray-600 capitalize">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <div className="py-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-6 py-3 text-base font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? "text-amber-600 bg-amber-50 border-r-4 border-amber-600"
                          : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link to="/vendor" className="flex justify-center mt-5">
                    <button className="bg-white  border border-blue-600 text-blue-600 px-4 py-2 rounded flex items-center gap-2 font-medium hover:bg-blue-50 transition">
                      Post Property
                      <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
                        FREE
                      </span>
                    </button>
                  </Link>

                  {/* Dashboard Link for authenticated users */}
                  {token && user && (
                    <Link
                      to={getDashboardUrl()}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-6 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 border-t mt-4"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3" />
                      Dashboard
                    </Link>
                  )}
                </div>

                {/* Auth Section */}
                <div className="border-t p-4 mt-auto">
                  {token && user ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/admin/login"
                        className="block w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Login
                      </Link>
                      <Link
                        to="/vendor/login"
                        className="block w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Vendor Login
                      </Link>
                      <Link
                        to="/vendor/register"
                        className="block w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Vendor Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
