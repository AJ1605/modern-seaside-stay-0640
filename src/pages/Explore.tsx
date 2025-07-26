import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Filter } from "lucide-react";
import { mockLists } from "@/data/mockData";
import ListCard from "../components/ListCard";
import { Badge } from "@/components/ui/badge";

const popularTags = [
  "restaurants", "halal", "palestinian-owned", "women-owned", "muslim-owned", 
  "arab-owned", "family-business", "sustainable", "educational", "traditional"
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Simple filter function for demo purposes
  const filteredLists = mockLists.filter(list => {
    const matchesQuery = searchQuery === "" || 
      list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => 
        list.identityTags.includes(tag) || 
        list.valuesTags.includes(tag) || 
        list.cultureTags.includes(tag)
      );
    
    return matchesQuery && matchesTags;
  });

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
      
      <main className="flex-1 bg-shoof-light dark:bg-shoof-dark/10">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-shoof-primary to-shoof-tertiary text-white py-12">
          <div className="container">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Explore Curated Lists</h1>
            <p className="text-xl mb-8 max-w-3xl">
              Discover businesses, brands, and places tagged by identity, values, and culture.
            </p>
            
            {/* Search Box */}
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  className="pl-10 bg-white/90 text-gray-800 border-none"
                  placeholder="Search for lists..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="bg-white text-shoof-primary">
                  <MapPin className="mr-2 h-4 w-4" /> Near Me
                </Button>
                <Button variant="secondary" className="bg-white text-shoof-primary">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="section">
          <div className="container">
            {/* Popular Tags */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer ${selectedTags.includes(tag) ? "bg-shoof-secondary" : ""}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Lists</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new">Newest</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLists.map((list) => (
                    <ListCard key={list.id} list={list} />
                  ))}
                </div>
                
                {filteredLists.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No lists found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="trending" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLists
                    .sort((a, b) => b.likeCount - a.likeCount)
                    .map((list) => (
                      <ListCard key={list.id} list={list} />
                    ))
                  }
                </div>
              </TabsContent>
              
              <TabsContent value="new" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLists
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((list) => (
                      <ListCard key={list.id} list={list} />
                    ))
                  }
                </div>
              </TabsContent>
              
              <TabsContent value="saved" className="pt-6">
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">Sign in to see your saved lists</h3>
                  <p className="text-muted-foreground mb-4">Create an account to save your favorite lists.</p>
                  <Button className="bg-shoof-primary hover:bg-shoof-primary/90">Sign In</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
