import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  Layout,
  Calendar,
  Users,
  Shield,
} from "lucide-react";
import { Button } from "../components/ui";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg px-5">
          <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Manage your projects with ease and efficiency
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Stay organized, track progress, and collaborate with your team -
                all in one place.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  size="lg"
                  className="bg-blue hover:bg-blue-50"
                  iconRight={<ArrowRight size={18} />}
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className=" hover:bg-blue-700"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Task Management"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Everything you need to manage your projects
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive task management platform helps you stay on top
                of your projects and collaborate effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <Layout className="w-12 h-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Intuitive Dashboard
                </h3>
                <p className="text-gray-600">
                  Get a clear overview of all your projects with our beautifully
                  designed dashboard.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <CheckCircle className="w-12 h-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Task Management
                </h3>
                <p className="text-gray-600">
                  Create, assign, and track tasks with powerful yet simple
                  tools.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <Calendar className="w-12 h-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Progress Tracking
                </h3>
                <p className="text-gray-600">
                  Track progress and celebrate milestones as you complete tasks
                  and projects.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <Users className="w-12 h-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  User Management
                </h3>
                <p className="text-gray-600">
                  Create personal or team accounts with secure access and
                  permissions.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <Shield className="w-12 h-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  Secure & Reliable
                </h3>
                <p className="text-gray-600">
                  Your data is always secure and available whenever you need it.
                </p>
              </div>

              <div className="bg-blue-600 p-8 rounded-lg text-white hover:bg-blue-700 transition-colors">
                <h3 className="text-xl font-semibold mb-3">
                  Ready to get started?
                </h3>
                <p className="mb-4">
                  Sign up today and transform the way you manage projects.
                </p>
                <Button
                  className=" text-blue-700 hover:bg-blue-50"
                  iconRight={<ArrowRight size={16} />}
                  onClick={() => navigate("/register")}
                >
                  Create Free Account
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Ready to boost your productivity?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Join thousands of users who have transformed the way they manage
              projects with TaskMaster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                iconRight={<ArrowRight size={18} />}
                onClick={() => navigate("/register")}
              >
                Get Started for Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
