import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListCard from "../components/ListCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { mockLists } from "@/data/mockData";
import { CuratedList } from "@/types/models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Lists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredLists, setFilteredLists] = useState<CuratedList[]>(mockLists);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Popular tags from all lists (normally you would aggregate these from your data)
  const popularTags = [
    "Black-owned", "Women-owned", "LGBTQ+-owned", "Latinx", "Asian-owned",
    "Eco-friendly", "Ethical", "Sustainable", "Community-focused", "Handcrafted"
  ];
  
  useEffect(() => {
    // Filter lists based on search query and selected tags
    const filtered = mockLists.filter(list => {
      // Filter by search query
      const matchesSearch = searchQuery === "" || 
        list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        list.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by selected tags
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => [...list.identityTags, ...list.valuesTags].includes(tag));
      
      return matchesSearch && matchesTags;
    });
    
    // Sort based on active tab
    let sortedLists = [...filtered];
    
    switch (activeTab) {
      case "trending":
        sortedLists.sort((a, b) => b.likeCount - a.likeCount);
        break;
      case "newest":
        sortedLists.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      // "all" tab uses the default order (no additional sorting)
    }
    
    setFilteredLists(sortedLists);
  }, [searchQuery, selectedTags, activeTab]);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-shoof-primary to-shoof-tertiary text-white py-14">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Curated Lists
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Browse collections of places and businesses that match your values and interests.
              </p>
              
              {/* Search */}
              <div className="relative max-w-lg mx-auto">
                <Input
                  type="search"
                  placeholder="Search for lists by name, description or tags..."
                  className="pr-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 text-white/70" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Filters and Lists */}
        <section className="py-12 bg-shoof-light/30 dark:bg-shoof-dark/10">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-shoof-dark/20 rounded-xl p-6 shadow-sm sticky top-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5" /> Filters
                    </h3>
                    {selectedTags.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedTags([])}
                        className="text-xs h-8"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">Popular Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedTags.includes(tag) 
                              ? "bg-shoof-primary hover:bg-shoof-primary/80" 
                              : "hover:bg-shoof-primary/10"
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                          {selectedTags.includes(tag) && (
                            <X className="h-3 w-3 ml-1" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3 text-muted-foreground">Selected Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="default"
                            className="bg-shoof-primary hover:bg-shoof-primary/80 cursor-pointer"
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                            <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Lists Content */}
              <div className="lg:col-span-3">
                {/* Tabs */}
                <Tabs defaultValue="all" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-white dark:bg-shoof-dark/20 p-1 shadow-sm">
                    <TabsTrigger value="all" className="flex-1">All Lists</TabsTrigger>
                    <TabsTrigger value="trending" className="flex-1">Trending</TabsTrigger>
                    <TabsTrigger value="newest" className="flex-1">Newest</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-6">
                    <ListResults lists={filteredLists} />
                  </TabsContent>
                  
                  <TabsContent value="trending" className="mt-6">
                    <ListResults lists={filteredLists} />
                  </TabsContent>
                  
                  <TabsContent value="newest" className="mt-6">
                    <ListResults lists={filteredLists} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// Helper component to display list results
function ListResults({ lists }: { lists: CuratedList[] }) {
  if (lists.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No lists found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters to find more lists</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {lists.map((list) => (
        <div key={list.id} className="animate-fade-in">
          <ListCard list={list} />
        </div>
      ))}
    </div>
  );
}
