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
        <section className="bg-gradient-to-r from-shoof-primary to-shoof-tertiary text-white py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Discover places that matter
                </h1>
                <p className="text-xl mb-8 opacity-90">
                  Shoof lets you create and browse curated lists of businesses, brands, and places 
                  tagged by identity, values, and culture.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-white text-shoof-primary hover:bg-white/90">
                    <Link to="/explore">
                      Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/create-list">
                      Create a List
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-fade-in hidden lg:block">
                <div className="aspect-square relative">
                  {/* Main image */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl rotate-3 z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=800&fit=crop"
                      alt="Restaurant scene" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlapping images */}
                  <div className="absolute -bottom-8 -left-8 w-2/3 rounded-2xl overflow-hidden shadow-xl -rotate-6 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1521056787327-246ed5f5fcfe?w=600&h=400&fit=crop"
                      alt="Bookstore" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-8 -right-8 w-1/2 rounded-2xl overflow-hidden shadow-xl rotate-12 z-20">
                    <img 
                      src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop"
                      alt="Café" 
                      className="w-full h-full object-cover"
                    />
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
