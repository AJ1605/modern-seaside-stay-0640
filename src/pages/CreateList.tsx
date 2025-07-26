import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Upload,
  X,
  Plus,
  Info,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { mockPlaces, mockUsers } from "@/data/mockData";
import { Place, CuratedList } from "@/types/models";

// Common identity tags
const identityTagOptions = [
  "palestinian-owned", "black-owned", "women-owned", "lgbtq+-owned", "asian-owned", "latinx", "indigenous", 
  "immigrant-owned", "muslim-owned", "arab-owned", "jewish-owned", "veteran-owned", "family-business", "bipoc-owned"
];

// Common values tags
const valuesTagOptions = [
  "sustainable", "eco-friendly", "fair-trade", "ethical", "community-focused",
  "handcrafted", "local", "traditional", "educational", "family-business", 
  "halal", "local-sourcing", "ethical-sourcing"
];

// Common cultural tags
const cultureTagOptions = [
  "middle-eastern", "soul-food", "halal", "kosher", "vegan", "regional", "authentic", 
  "cultural-heritage", "traditional-crafts", "music", "art", "literature", "mediterranean",
  "fusion", "north-african", "traditional-recipes", "modern-middle-eastern"
];

export default function CreateList() {
  const navigate = useNavigate();
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [identityTags, setIdentityTags] = useState<string[]>([]);
  const [valuesTags, setValuesTags] = useState<string[]>([]);
  const [cultureTags, setCultureTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Search results for places
  const searchResults = searchQuery.trim() === "" ? [] : mockPlaces.filter(place => 
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedPlaces.some(p => p.id === place.id)
  ).slice(0, 5); // Limit to first 5 results
  
  const handleAddPlace = (place: Place) => {
    setSelectedPlaces([...selectedPlaces, place]);
    setSearchQuery("");
  };
  
  const handleRemovePlace = (placeId: string) => {
    setSelectedPlaces(selectedPlaces.filter(place => place.id !== placeId));
  };
  
  const handleAddTag = (tag: string, type: 'identity' | 'values' | 'culture') => {
    if (tag.trim() === "") return;
    
    switch(type) {
      case 'identity':
        if (!identityTags.includes(tag)) {
          setIdentityTags([...identityTags, tag]);
        }
        break;
      case 'values':
        if (!valuesTags.includes(tag)) {
          setValuesTags([...valuesTags, tag]);
        }
        break;
      case 'culture':
        if (!cultureTags.includes(tag)) {
          setCultureTags([...cultureTags, tag]);
        }
        break;
    }
    
    setCustomTag("");
  };
  
  const handleRemoveTag = (tag: string, type: 'identity' | 'values' | 'culture') => {
    switch(type) {
      case 'identity':
        setIdentityTags(identityTags.filter(t => t !== tag));
        break;
      case 'values':
        setValuesTags(valuesTags.filter(t => t !== tag));
        break;
      case 'culture':
        setCultureTags(cultureTags.filter(t => t !== tag));
        break;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setError("Please enter a title for your list");
      return;
    }
    
    if (!description.trim()) {
      setError("Please enter a description for your list");
      return;
    }
    
    if (selectedPlaces.length === 0) {
      setError("Please add at least one place to your list");
      return;
    }
    
    // Clear any previous errors
    setError("");
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be the current authenticated user
      const currentUser = mockUsers[0]; 
      
      // Create a new list object conforming to CuratedList interface
      const newList: CuratedList = {
        id: `l${Date.now()}`, // Generate a temporary ID
        title,
        description,
        coverImage: coverImage || (selectedPlaces.length > 0 ? selectedPlaces[0].images[0] : undefined),
        places: selectedPlaces.map(place => place.id),
        identityTags,
        valuesTags,
        cultureTags,
        createdBy: {
          id: currentUser.id,
          name: currentUser.name,
          username: currentUser.username,
          avatar: currentUser.avatar,
          email: currentUser.email,
          createdAt: currentUser.createdAt,
          lists: currentUser.lists,
          savedLists: currentUser.savedLists,
          following: currentUser.following,
          followers: currentUser.followers
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likeCount: 0,
        saveCount: 0
      };
      
      // This would be an API call in a real app
      console.log("Creating list:", newList);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the list detail page (using the new list's ID)
      navigate(`/lists/${newList.id}`);
    } catch (err) {
      setError("Failed to create list. Please try again.");
      console.error("Error creating list:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-shoof-light/30 dark:bg-shoof-dark/10 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Create a New List</h1>
          
          <p className="text-muted-foreground mb-8">
            Create your own curated list of places and businesses to share with the Shoof community.
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* List Title */}
                  <div>
                    <Label htmlFor="title" className="text-base font-medium">
                      List Title*
                    </Label>
                    <Input 
                      id="title"
                      placeholder="e.g., 'My Favorite Palestinian-Owned Businesses'"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  {/* List Description */}
                  <div>
                    <Label htmlFor="description" className="text-base font-medium">
                      Description*
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Share what makes this list special..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                  
                  {/* Cover Image */}
                  <div>
                    <Label htmlFor="cover-image" className="text-base font-medium">
                      Cover Image (Optional)
                    </Label>
                    <div className="mt-2 flex items-center gap-4">
                      {coverImage ? (
                        <div className="relative h-32 w-48 rounded-md overflow-hidden">
                          <img 
                            src={coverImage} 
                            alt="Cover preview" 
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setCoverImage("")}
                            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="h-32 w-48 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-muted-foreground bg-white dark:bg-shoof-dark/20">
                          <Upload className="h-8 w-8 mb-2" />
                          <span className="text-sm">Upload Image</span>
                        </div>
                      )}
                      
                      <Input 
                        id="cover-image"
                        type="url"
                        placeholder="Or enter image URL..."
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      If no cover image is provided, the first place image will be used.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Places Section */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Add Places</h2>
                
                <div className="mb-4">
                  <Label htmlFor="place-search" className="text-base font-medium">
                    Search for Places*
                  </Label>
                  <div className="mt-2 relative">
                    <Input 
                      id="place-search"
                      placeholder="Search by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    
                    {searchResults.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white dark:bg-shoof-dark/90 shadow-lg rounded-md overflow-hidden border">
                        {searchResults.map(place => (
                          <div 
                            key={place.id}
                            className="p-3 hover:bg-shoof-light dark:hover:bg-shoof-dark/50 cursor-pointer flex items-center gap-3"
                            onClick={() => handleAddPlace(place)}
                          >
                            <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={place.images[0]} 
                                alt={place.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{place.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {place.address}
                              </div>
                            </div>
                            <Button type="button" size="sm" variant="ghost" className="ml-auto">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Selected Places */}
                <div className="mt-6">
                  <h3 className="text-base font-medium mb-2">Selected Places ({selectedPlaces.length})</h3>
                  
                  {selectedPlaces.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed rounded-md bg-white dark:bg-shoof-dark/20">
                      <p className="text-muted-foreground">No places added yet</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Search and add places to include in your list
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedPlaces.map((place, index) => (
                        <div 
                          key={place.id} 
                          className="flex items-center gap-4 p-3 border rounded-md bg-white dark:bg-shoof-dark/20"
                        >
                          <div className="font-semibold text-shoof-primary w-6">{index + 1}</div>
                          <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={place.images[0]} 
                              alt={place.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="font-medium">{place.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {place.address}
                            </div>
                          </div>
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemovePlace(place.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <p>You can reorder places by drag-and-drop (coming soon)</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Tags Section */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Add Tags</h2>
                <p className="text-muted-foreground mb-4">
                  Help others discover your list by adding relevant tags
                </p>
                
                {/* Identity Tags */}
                <div className="mb-6">
                  <Label className="text-base font-medium">Identity Tags</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Identities and backgrounds of business owners
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {identityTagOptions.map(tag => (
                      <Badge 
                        key={tag} 
                        variant={identityTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          identityTags.includes(tag) 
                            ? "bg-shoof-primary hover:bg-shoof-primary/80" 
                            : "hover:bg-shoof-primary/10"
                        }`}
                        onClick={() => 
                          identityTags.includes(tag) 
                            ? handleRemoveTag(tag, 'identity') 
                            : handleAddTag(tag, 'identity')
                        }
                      >
                        {tag}
                        {identityTags.includes(tag) && (
                          <X className="h-3 w-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Custom identity tag..."
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      className="flex-grow"
                    />
                    <Button 
                      type="button" 
                      onClick={() => handleAddTag(customTag, 'identity')}
                      disabled={!customTag.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                {/* Values Tags */}
                <div className="mb-6">
                  <Label className="text-base font-medium">Values Tags</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Values, ethics, and principles of the businesses
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {valuesTagOptions.map(tag => (
                      <Badge 
                        key={tag} 
                        variant={valuesTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          valuesTags.includes(tag) 
                            ? "bg-shoof-secondary hover:bg-shoof-secondary/80" 
                            : "hover:bg-shoof-secondary/10"
                        }`}
                        onClick={() => 
                          valuesTags.includes(tag) 
                            ? handleRemoveTag(tag, 'values') 
                            : handleAddTag(tag, 'values')
                        }
                      >
                        {tag}
                        {valuesTags.includes(tag) && (
                          <X className="h-3 w-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Custom values tag..."
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      className="flex-grow"
                    />
                    <Button 
                      type="button" 
                      onClick={() => handleAddTag(customTag, 'values')}
                      disabled={!customTag.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                {/* Cultural Tags */}
                <div>
                  <Label className="text-base font-medium">Cultural Tags</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Cultural aspects, traditions, and heritage
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {cultureTagOptions.map(tag => (
                      <Badge 
                        key={tag} 
                        variant={cultureTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          cultureTags.includes(tag) 
                            ? "bg-shoof-tertiary hover:bg-shoof-tertiary/80" 
                            : "hover:bg-shoof-tertiary/10"
                        }`}
                        onClick={() => 
                          cultureTags.includes(tag) 
                            ? handleRemoveTag(tag, 'culture') 
                            : handleAddTag(tag, 'culture')
                        }
                      >
                        {tag}
                        {cultureTags.includes(tag) && (
                          <X className="h-3 w-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Custom cultural tag..."
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      className="flex-grow"
                    />
                    <Button 
                      type="button" 
                      onClick={() => handleAddTag(customTag, 'culture')}
                      disabled={!customTag.trim()}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Submit Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-shoof-dark/20 p-6 rounded-lg">
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Ready to publish?
                </h3>
                <p className="text-muted-foreground">
                  Your list will be visible to everyone on Shoof
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  className="bg-shoof-primary hover:bg-shoof-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publishing..." : "Publish List"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
