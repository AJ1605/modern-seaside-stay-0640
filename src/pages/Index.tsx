import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Tag, Map, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockLists } from "@/data/mockData";
import ListCard from "@/components/ListCard";

export default function Index() {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Feature items for Shoof
  const features = [
    {
      icon: <Tag className="h-8 w-8 text-shoof-secondary" />,
      title: "Identity & Values",
      description: "Find and support businesses based on identity, values, and cultural significance."
    },
    {
      icon: <Map className="h-8 w-8 text-shoof-secondary" />,
      title: "Curated Lists",
      description: "Browse user-created collections of businesses, brands, and places with personal insights."
    },
    {
      icon: <Search className="h-8 w-8 text-shoof-secondary" />,
      title: "Discover",
      description: "Find new places and businesses that align with your values and interests."
    },
    {
      icon: <Users className="h-8 w-8 text-shoof-secondary" />,
      title: "Community",
      description: "Connect with others who share your interests and values."
    }
  ];

  // Featured lists - just using the first 3 from our mock data
  const featuredLists = mockLists.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-shoof-primary to-shoof-tertiary text-white py-20 pt-32">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                  <div className="absolute top-20 -right-5 w-24 h-24 rounded-full bg-teal-400/20 blur-xl"></div>
                  
                  <span className="inline-block text-teal-200 font-medium tracking-wider mb-2">DISCOVER • EXPLORE • CONNECT</span>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-100">Your Cultural Compass</span>
                    {/* <div className="flex items-center">
                      <div className="h-0.5 w-16 bg-teal-300 mr-3"></div>
                      <span className="italic">Where Identity Meets Discovery</span>
                    </div> */}
                  </h1>
                  
                  <p className="text-xl mb-8 opacity-90 relative">
                    Shoof lets you create and browse curated lists of businesses, brands, and places 
                    tagged by identity, values, and culture.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                    <Button asChild size="lg" className="bg-white text-shoof-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <Link to="/explore">
                        Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                      <Link to="/create-list">
                        Create a List
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-fade-in hidden lg:block">
                {/* Multi-circle image collage */}
                <div className="relative w-full max-w-md mx-auto h-[550px]">
                  {/* Main large circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-teal-600 p-2 rounded-full shadow-xl overflow-hidden">
                      <div className="w-72 h-72 overflow-hidden rounded-full">
                        <img 
                          src="/images/jamie-street-PE3JGtPVTY8-unsplash.jpg"
                          alt="Compass navigation" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Top right - Beach view */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white p-1.5 rounded-full shadow-lg border-4 border-teal-200 transform rotate-3">
                      <div className="w-40 h-40 overflow-hidden rounded-full">
                        <img 
                          src="/images/ruben-ramirez-xhKG01FN2uk-unsplash.jpg"
                          alt="Beach view" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Top left - Local architecture */}
                  <div className="absolute top-20 left-4 z-20">
                    <div className="bg-white p-1.5 rounded-full shadow-lg border-4 border-teal-200 transform ">
                      <div className="w-36 h-36 overflow-hidden rounded-full">
                        <img 
                          src="/images/trnava-university-BEEyeib-am8-unsplash.jpg"
                          alt="Local architecture" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom left - Local cuisine */}
                  <div className="absolute bottom-16 left-10 z-20">
                    <div className="bg-white p-1.5 rounded-full shadow-lg border-4 border-teal-200 transform rotate-12">
                      <div className="w-36 h-36 overflow-hidden rounded-full">
                        <img 
                          src="/images/dan-gold-E6HjQaB7UEA-unsplash.jpg"
                          alt="Local cuisine" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom right - Activities */}
                  <div className="absolute bottom-8 right-0 z-20">
                    <div className="bg-white p-1.5 rounded-full shadow-lg border-4 border-teal-200 transform">
                      <div className="w-44 h-44 overflow-hidden rounded-full">
                        <img 
                          src="/images/bruno-cervera-4rvc6HWITpY-unsplash.jpg"
                          alt="Local activities" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional circles */}
                  {/* Mid-right - small size */}
                  <div className="absolute top-1/3 right-0 z-20">
                    <div className="bg-white p-1 rounded-full shadow-lg border-4 border-teal-200 transform rotate-6">
                      <div className="w-28 h-28 overflow-hidden rounded-full">
                        <img 
                          src="/images/conor-brown-sqkXyyj4WdE-unsplash.jpg"
                          alt="Sunset view" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Mid-left - medium size */}
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20">
                    <div className="bg-white p-1.5 rounded-full shadow-lg border-4 border-teal-200 transform -rotate-8">
                      <div className="w-20 h-20 overflow-hidden rounded-full">
                        <img 
                          src="/images/prudence-earl-8F0I12ypHPA-unsplash.jpg"
                          alt="Thrifting" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Accent circle - made bigger and moved left */}
                  <div className="absolute top-10 left-1/3 z-20">
                    <div className="bg-white p-0.5 rounded-full shadow-md border-2 border-teal-200 transform rotate-12">
                      <div className="w-20 h-20 overflow-hidden rounded-full">
                        <img 
                          src="/images/kitera-dent-ABBblFwicU8-unsplash.jpg"
                          alt="Detail view" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Decorative floating elements */}
                  <div className="absolute top-1/3 right-1/4 z-0">
                    <div className="w-12 h-12 rounded-full bg-teal-400/30 animate-float"></div>
                  </div>
                  <div className="absolute bottom-1/3 left-1/4 z-0">
                    <div className="w-8 h-8 rounded-full bg-white/40 animate-float-slow"></div>
                  </div>
                  <div className="absolute bottom-1/4 right-1/3 z-0">
                    <div className="w-6 h-6 rounded-full bg-teal-300/20 animate-float-slow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="section bg-shoof-light dark:bg-shoof-dark/10">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-shoof-secondary font-medium uppercase tracking-wider">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-shoof-primary">
                Connect with places that align with your values
              </h2>
              <p className="text-muted-foreground">
                Shoof makes it easy to find and support businesses and places that match your 
                values, identity preferences, and cultural interests.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-shoof-dark/20 p-6 rounded-xl animate-fade-in flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="mb-4 p-3 rounded-full bg-shoof-light dark:bg-shoof-dark/40">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-shoof-primary">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Lists Section */}
        <section className="section">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-shoof-secondary font-medium uppercase tracking-wider">
                Featured Lists
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-shoof-primary">
                Popular Collections
              </h2>
              <p className="text-muted-foreground">
                Explore these curated lists of places created by our community members.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredLists.map((list, index) => (
                <div key={list.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                  <ListCard list={list} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-shoof-primary hover:bg-shoof-primary/90">
                <Link to="/lists">
                  View All Lists <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-24 bg-gradient-to-r from-shoof-secondary to-shoof-primary/90 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Share your own curated lists
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Create lists of your favorite places and businesses to share with the community.
                Help others discover hidden gems and support values-aligned businesses.
              </p>
              <Button asChild size="lg" className="bg-white text-shoof-primary hover:bg-white/90">
                <Link to="/create-list">Create Your First List</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
