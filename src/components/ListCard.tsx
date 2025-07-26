import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, Bookmark, MapPin } from "lucide-react";
import { CuratedList } from "@/types/models";
import { mockPlaces } from "@/data/mockData";

interface ListCardProps {
  list: CuratedList;
}

export default function ListCard({ list }: ListCardProps) {
  const { id, title, description, coverImage, createdBy, places, identityTags, valuesTags, cultureTags, likeCount, saveCount } = list;
  
  // Get the first few tags to display (prioritizing identity and values tags)
  const displayTags = [...identityTags, ...valuesTags].slice(0, 3);
  
  // Get the first place's image as fallback if cover image is not provided
  const firstPlaceImage = places.length > 0 
    ? mockPlaces.find(p => p.id === places[0])?.images[0] 
    : undefined;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/lists/${id}`} className="block">
        <div className="relative h-48 w-full">
          <img 
            src={coverImage || firstPlaceImage || "/placeholder-image.jpg"} 
            alt={title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge className="bg-shoof-secondary/90">
              <MapPin className="h-3 w-3 mr-1" /> {places.length} {places.length === 1 ? 'place' : 'places'}
            </Badge>
          </div>
        </div>
      </Link>
      
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          <Link to={`/profile/${createdBy.username}`} className="flex items-center gap-2 text-sm">
            <Avatar className="h-6 w-6">
              <AvatarImage src={createdBy.avatar} alt={createdBy.name} />
              <AvatarFallback>{createdBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">{createdBy.name}</span>
          </Link>
        </div>
        
        <Link to={`/lists/${id}`} className="block group">
          <h3 className="font-semibold text-lg group-hover:text-shoof-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {description}
          </p>
        </Link>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {displayTags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {identityTags.length + valuesTags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{identityTags.length + valuesTags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-3 flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
            <Heart className="h-4 w-4" />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-shoof-primary transition-colors">
            <Bookmark className="h-4 w-4" />
            <span>{saveCount}</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
