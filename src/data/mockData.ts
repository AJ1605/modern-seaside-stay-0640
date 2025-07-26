import { CuratedList, Place, User } from "../types/models";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Sara Ahmed",
    username: "saraexplores",
    bio: "Exploring cultural gems and supporting diverse businesses.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    email: "sara@example.com",
    location: "New York, NY",
    website: "https://saraexplores.com",
    joinedAt: "2022-12-01",
    createdAt: new Date("2022-12-01"),
    lists: [],
    followers: ["u2"],
    following: ["u2", "u3"],
    savedLists: ["l2", "l3"],
    interests: ["food", "culture", "travel", "sustainability"],
    social: {
      twitter: "@saraexplores",
      instagram: "saraexplores",
      linkedin: "sara-ahmed"
    }
  },
  {
    id: "u2",
    name: "Malik Johnson",
    username: "malikj",
    bio: "Food enthusiast and community advocate.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    email: "malik@example.com",
    location: "San Francisco, CA",
    website: "https://malikjohnson.com",
    joinedAt: "2022-11-15",
    createdAt: new Date("2022-11-15"),
    lists: [],
    followers: ["u1", "u3"],
    following: ["u1"],
    savedLists: ["l1"],
    interests: ["food", "restaurants", "community", "social-justice"],
    social: {
      twitter: "@malikj",
      instagram: "malikjcooks"
    }
  },
  {
    id: "u3",
    name: "Layla Hassan",
    username: "layla_h",
    bio: "Travel blogger highlighting hidden cultural spots.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    email: "layla@example.com",
    location: "Chicago, IL",
    website: "https://laylahtravels.com",
    joinedAt: "2022-10-20",
    createdAt: new Date("2022-10-20"),
    lists: [],
    followers: ["u1"],
    following: ["u2"],
    savedLists: ["l1", "l2"],
    interests: ["travel", "books", "photography", "culture"],
    social: {
      instagram: "layla_travels",
      twitter: "@laylahassan"
    }
  }
];

// Mock Places
export const mockPlaces: Place[] = [
  {
    id: "p1",
    name: "Olive & Fig",
    description: "Family-owned Mediterranean restaurant featuring recipes passed down through generations.",
    address: "123 Main St, New York, NY 10001",
    website: "https://oliveandfig.example.com",
    phone: "+1-212-555-1234",
    hours: "Mon-Sat: 11am-10pm, Sun: 12pm-8pm",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
    ],
    location: {
      lat: 40.7128,
      lng: -74.006
    },
    tags: ["restaurant", "mediterranean", "dining"],
    identityTags: ["palestinian-owned", "family-business"],
    valuesTags: ["sustainable", "local-sourcing"],
    cultureTags: ["traditional-recipes", "middle-eastern"]
  },
  {
    id: "p2",
    name: "The Spice Route",
    description: "Specialty shop offering authentic spices, herbs and ingredients from across the Middle East.",
    address: "456 Market St, San Francisco, CA 94103",
    website: "https://spiceroute.example.com",
    phone: "+1-415-555-2345",
    hours: "Tue-Sat: 10am-6pm, Sun: 11am-4pm",
    images: [
      "https://images.unsplash.com/photo-1467453678174-768ec283a940?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=800&h=600&fit=crop"
    ],
    location: {
      lat: 37.7749,
      lng: -122.4194
    },
    tags: ["specialty-shop", "spices", "ingredients"],
    identityTags: ["arab-owned", "women-owned"],
    valuesTags: ["fair-trade", "ethical-sourcing"],
    cultureTags: ["authentic", "traditional"]
  },
  {
    id: "p3",
    name: "Crescent Books",
    description: "Independent bookstore specializing in literature from and about the Middle East and North Africa.",
    address: "789 Oak St, Chicago, IL 60607",
    website: "https://crescentbooks.example.com",
    phone: "+1-312-555-6789",
    hours: "Mon-Sat: 9am-8pm, Sun: 10am-6pm",
    images: [
      "https://images.unsplash.com/photo-1521056787327-246ed5f5fcfe?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop"
    ],
    location: {
      lat: 41.8781,
      lng: -87.6298
    },
    tags: ["bookstore", "literature", "cultural"],
    identityTags: ["muslim-owned", "bipoc-owned"],
    valuesTags: ["community-focused", "educational"],
    cultureTags: ["middle-eastern", "north-african"]
  },
  {
    id: "p4",
    name: "Halal Grill House",
    description: "Family-friendly restaurant serving halal dishes with modern twists on classic recipes.",
    address: "321 Pine St, Seattle, WA 98101",
    website: "https://halalgrillhouse.example.com",
    phone: "+1-206-555-4321",
    hours: "Daily: 11am-9pm",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop"
    ],
    location: {
      lat: 47.6062,
      lng: -122.3321
    },
    tags: ["restaurant", "halal", "family-friendly"],
    identityTags: ["muslim-owned", "family-business"],
    valuesTags: ["halal", "sustainable"],
    cultureTags: ["fusion", "modern-middle-eastern"]
  },
  {
    id: "p5",
    name: "Atlas Café",
    description: "Cozy café offering authentic Arabic coffee, tea, and homemade pastries in a welcoming atmosphere.",
    address: "567 Elm St, Austin, TX 78701",
    website: "https://atlascafe.example.com",
    phone: "+1-512-555-8765",
    hours: "Mon-Fri: 7am-7pm, Sat-Sun: 8am-6pm",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1463797221720-6b07e6426c24?w=800&h=600&fit=crop"
    ],
    location: {
      lat: 30.2672,
      lng: -97.7431
    },
    tags: ["cafe", "coffee", "pastries"],
    identityTags: ["arab-owned", "immigrant-owned"],
    valuesTags: ["community-focused", "ethical-sourcing"],
    cultureTags: ["traditional", "authentic"]
  }
];

// Mock Curated Lists
export const mockLists: CuratedList[] = [
  {
    id: "l1",
    title: "My Favorite Palestinian-Owned Restaurants",
    description: "A collection of amazing Palestinian-owned restaurants serving authentic cuisine with family recipes.",
    coverImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    places: ["p1", "p4"],
    identityTags: ["palestinian-owned", "arab-owned"],
    valuesTags: ["family-business", "authentic"],
    cultureTags: ["middle-eastern", "mediterranean"],
    createdBy: {
      id: "u1",
      name: "Sara Ahmed",
      username: "saraexplores",
      email: "sara@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      createdAt: new Date("2022-12-01"),
      lists: [],
      savedLists: [],
      following: [],
      followers: []
    },
    createdAt: "2023-06-15",
    updatedAt: "2023-07-10",
    likeCount: 42,
    saveCount: 18
  },
  {
    id: "l2",
    title: "Halal Spots in Seattle",
    description: "The best halal food options around Seattle for every occasion.",
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    places: ["p4", "p5"],
    identityTags: ["muslim-owned", "family-business"],
    valuesTags: ["halal", "ethical"],
    cultureTags: ["middle-eastern", "fusion"],
    createdBy: {
      id: "u2",
      name: "Malik Johnson",
      username: "malikj",
      email: "malik@example.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      createdAt: new Date("2022-11-15"),
      lists: [],
      savedLists: [],
      following: [],
      followers: []
    },
    createdAt: "2023-05-20",
    updatedAt: "2023-07-05",
    likeCount: 37,
    saveCount: 25
  },
  {
    id: "l3",
    title: "Middle Eastern Cultural Gems",
    description: "From bookstores to cafés, these spots celebrate Middle Eastern heritage and culture.",
    coverImage: "https://images.unsplash.com/photo-1521056787327-246ed5f5fcfe?w=800&h=600&fit=crop",
    places: ["p2", "p3", "p5"],
    identityTags: ["arab-owned", "muslim-owned"],
    valuesTags: ["community-focused", "educational"],
    cultureTags: ["middle-eastern", "traditional"],
    createdBy: {
      id: "u3",
      name: "Layla Hassan",
      username: "layla_h",
      email: "layla@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      createdAt: new Date("2022-10-20"),
      lists: [],
      savedLists: [],
      following: [],
      followers: []
    },
    createdAt: "2023-04-10",
    updatedAt: "2023-06-30",
    likeCount: 29,
    saveCount: 16
  }
];
