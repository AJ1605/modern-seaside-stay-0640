import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Bookmark, 
  Share2, 
  MapPin, 
  Calendar, 
  MessageSquare,
  Phone,
  Globe,
  Clock,
  ChevronLeft,
  Star
} from "lucide-react";
import { mockLists, mockPlaces } from "@/data/mockData";
import { CuratedList, Place } from "@/types/models";
import { Card, CardContent } from "@/components/ui/card";

export default function ListDetail() {
  const { id } = useParams<{ id: string }>();
  const [list, setList] = useState<CuratedList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Fetch the list data
    // In a real app, this would be an API call
    const fetchList = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const foundList = mockLists.find(l => l.id === id);
        setList(foundList || null);
        setIsLoading(false);
      }, 500); // Simulated API delay
    };
    
    fetchList();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-shoof-primary">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!list) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-12">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">List Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The list you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/lists">Browse Lists</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const { title, description, coverImage, createdBy, places: placeIds, identityTags, valuesTags, cultureTags, likeCount, saveCount, createdAt } = list;
  
  // Get full place objects from IDs
  const listPlaces = placeIds.map(placeId => {
    return mockPlaces.find(place => place.id === placeId) as Place;
  });
  
  // Combine all tags
  const allTags = [...identityTags, ...valuesTags, ...cultureTags];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          {/* Cover Image */}
          <div className="h-64 md:h-80 lg:h-96 relative">
            <img 
              src={coverImage || listPlaces[0]?.images[0]} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          {/* Back Button */}
          <Link 
            to="/lists"
            className="absolute top-4 left-4 bg-white/80 hover:bg-white text-black p-2 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          
          {/* List Info Overlay */}
          <div className="container relative -mt-24 md:-mt-32 z-10 pb-6">
            <div className="bg-white dark:bg-shoof-dark/90 p-6 md:p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={createdBy.avatar} alt={createdBy.name} />
                  <AvatarFallback>{createdBy.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">List by</p>
                  <Link to={`/profile/${createdBy.username}`} className="font-medium hover:text-shoof-primary">
                    {createdBy.name}
                  </Link>
                </div>
                
                <span className="text-muted-foreground mx-2 text-xs">•</span>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
              
              <p className="text-lg text-muted-foreground mb-6">{description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {allTags.map(tag => (
                  <Badge key={tag} variant="outline" className="hover:bg-shoof-primary/10">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-6">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>{likeCount}</span>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4" />
                    <span>{saveCount}</span>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 bg-shoof-light/50 dark:bg-shoof-dark/40 px-3 py-2 rounded-md">
                  <MapPin className="h-4 w-4 text-shoof-secondary" />
                  <span>{listPlaces.length} {listPlaces.length === 1 ? 'place' : 'places'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Places Section */}
        <section className="py-12 bg-shoof-light/30 dark:bg-shoof-dark/10">
          <div className="container">
            <Tabs defaultValue="places" className="mb-8">
              <TabsList>
                <TabsTrigger value="places">Places</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="places" className="pt-8">
                <div className="grid gap-8">
                  {listPlaces.map((place, index) => (
                    <PlaceCard key={place.id} place={place} index={index + 1} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="map" className="pt-8">
                <div className="bg-white dark:bg-shoof-dark/20 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-medium mb-4">Map View Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    We're working on integrating maps to show all places in this list.
                  </p>
                  <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center text-muted-foreground">
                    Map Placeholder
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="comments" className="pt-8">
                <div className="bg-white dark:bg-shoof-dark/20 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-medium mb-4">Comments Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    We're working on adding comments to curated lists.
                  </p>
                  <Button className="bg-shoof-primary hover:bg-shoof-primary/90">
                    <MessageSquare className="h-4 w-4 mr-2" /> Be the first to comment
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* More From Creator Section */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">More from {createdBy.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockLists
                .filter(l => l.createdBy.username === createdBy.username && l.id !== id)
                .slice(0, 3)
                .map(list => (
                  <Card key={list.id} className="hover:shadow-md transition-shadow">
                    <Link to={`/lists/${list.id}`} className="block">
                      <div className="aspect-[2/1] overflow-hidden">
                        <img 
                          src={list.coverImage || list.places[0]} 
                          alt={list.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <Link to={`/lists/${list.id}`} className="block hover:text-shoof-primary">
                        <h3 className="font-medium text-lg">{list.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {list.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

interface PlaceCardProps {
  place: Place;
  index: number;
}

function PlaceCard({ place, index }: PlaceCardProps) {
  const { name, description, images, address, phone, website, hours, tags } = place;
  
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left: Image */}
        <div className="relative">
          <img src={images[0]} alt={name} className="w-full h-full object-cover min-h-[200px]" />
          <div className="absolute top-3 left-3 bg-shoof-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
            {index}
          </div>
        </div>
        
        {/* Right: Content */}
        <div className="p-6 col-span-2">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
            <h3 className="text-xl font-semibold">{name}</h3>
            
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">4.8</span>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">{description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 mb-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-shoof-secondary mt-1" />
              <span className="text-sm">{address}</span>
            </div>
            
            {phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-shoof-secondary" />
                <a href={`tel:${phone}`} className="text-sm hover:text-shoof-primary">{phone}</a>
              </div>
            )}
            
            {website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-shoof-secondary" />
                <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-shoof-primary">
                  {website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
            
            {hours && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-shoof-secondary" />
                <span className="text-sm">{hours}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.slice(0, 5).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
