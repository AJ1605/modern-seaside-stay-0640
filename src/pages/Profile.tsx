import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar, 
  Users, 
  ListPlus,
  Bookmark,
  Heart,
  Mail,
  Link as LinkIcon,
  Twitter,
  Instagram,
  Linkedin,
  Facebook
} from "lucide-react";
import { mockUsers, mockLists } from "@/data/mockData";
import { User, CuratedList } from "@/types/models";
import ListCard from "@/components/ListCard";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [userLists, setUserLists] = useState<CuratedList[]>([]);
  const [savedLists, setSavedLists] = useState<CuratedList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Fetch user data
    const fetchUserData = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        // Find user
        const foundUser = mockUsers.find(u => u.username === username);
        setUser(foundUser || null);
        
        if (foundUser) {
          // Get user's created lists
          const createdLists = mockLists.filter(list => 
            list.createdBy.id === foundUser.id
          );
          setUserLists(createdLists);
          
          // Get user's saved lists
          const userSavedLists = mockLists.filter(list => 
            foundUser.savedLists.includes(list.id)
          );
          setSavedLists(userSavedLists);
        }
        
        setIsLoading(false);
      }, 500); // Simulated API delay
    };
    
    fetchUserData();
  }, [username]);
  
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
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-12">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The user you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/explore">Explore Lists</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Profile Header */}
        <section className="bg-gradient-to-r from-shoof-primary to-shoof-tertiary text-white py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <Avatar className="w-32 h-32 border-4 border-white/50">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.name}</h1>
                <p className="text-white/80 text-lg mb-4">@{user.username}</p>
                
                <p className="max-w-2xl mb-6">{user.bio}</p>
                
                <div className="flex flex-wrap gap-6 justify-center md:justify-start text-white/80 text-sm">
                  {user.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(user.joinedAt).toLocaleDateString(undefined, { 
                      year: 'numeric',
                      month: 'short'
                    })}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <ListPlus className="h-4 w-4" />
                    <span>{userLists.length} Lists Created</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{user.followers.length} Followers</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6 justify-center md:justify-start">
                  {user.email && (
                    <a href={`mailto:${user.email}`} className="hover:text-white/80" title="Email">
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                  {user.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-white/80" title="Website">
                      <LinkIcon className="h-5 w-5" />
                    </a>
                  )}
                  {user.social?.twitter && (
                    <a href={`https://twitter.com/${user.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white/80" title="Twitter">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {user.social?.instagram && (
                    <a href={`https://instagram.com/${user.social.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-white/80" title="Instagram">
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {user.social?.linkedin && (
                    <a href={`https://linkedin.com/in/${user.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-white/80" title="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Action buttons - only shown if not the current user's profile */}
              <div className="flex flex-col gap-3">
                <Button className="bg-white text-shoof-primary hover:bg-white/90">
                  <Users className="mr-2 h-4 w-4" /> Follow
                </Button>
                <Button variant="outline" className="border-white/30 hover:bg-white/10">
                  <Mail className="mr-2 h-4 w-4" /> Message
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Profile Content */}
        <section className="py-12 bg-shoof-light/30 dark:bg-shoof-dark/10">
          <div className="container">
            <Tabs defaultValue="lists" className="mb-8">
              <TabsList className="bg-white dark:bg-shoof-dark/20 p-1 shadow-sm">
                <TabsTrigger value="lists" className="flex-1">
                  <ListPlus className="h-4 w-4 mr-2" /> Lists
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">
                  <Bookmark className="h-4 w-4 mr-2" /> Saved
                </TabsTrigger>
                <TabsTrigger value="likes" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" /> Likes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="lists" className="mt-6">
                {userLists.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userLists.map((list) => (
                      <div key={list.id} className="animate-fade-in">
                        <ListCard list={list} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-shoof-dark/20 rounded-xl">
                    <h3 className="text-xl font-semibold mb-2">No lists yet</h3>
                    <p className="text-muted-foreground mb-6">
                      {user.name} hasn't created any lists yet.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved" className="mt-6">
                {savedLists.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedLists.map((list) => (
                      <div key={list.id} className="animate-fade-in">
                        <ListCard list={list} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white dark:bg-shoof-dark/20 rounded-xl">
                    <h3 className="text-xl font-semibold mb-2">No saved lists</h3>
                    <p className="text-muted-foreground mb-6">
                      {user.name} hasn't saved any lists yet.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="likes" className="mt-6">
                <div className="text-center py-12 bg-white dark:bg-shoof-dark/20 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">Liked lists coming soon</h3>
                  <p className="text-muted-foreground mb-4">
                    We're working on adding this feature to track liked lists.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Interest Tags Section */}
        {user.interests && user.interests.length > 0 && (
          <section className="py-12">
            <div className="container">
              <h2 className="text-2xl font-bold mb-6">Interests</h2>
              <div className="flex flex-wrap gap-3">
                {user.interests.map(interest => (
                  <Badge key={interest} className="px-3 py-1.5 bg-shoof-primary/10 text-shoof-primary border-shoof-primary/20 hover:bg-shoof-primary/20">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
