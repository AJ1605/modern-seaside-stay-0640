// Core data models for Shoof

// Represents a business, place, or brand in a list
export interface Place {
  id: string;
  name: string;
  description: string;
  address: string;
  website?: string;
  phone?: string;
  hours?: string;
  images: string[];
  location: {
    lat: number;
    lng: number;
  };
  tags: string[];
  identityTags: string[];
  valuesTags: string[];
  cultureTags: string[];
}

// Represents a curated list created by a user
export interface CuratedList {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  places: string[];
  identityTags: string[];
  valuesTags: string[];
  cultureTags: string[];
  likeCount: number;
  saveCount: number;
}

// Represents a user
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedAt?: string;
  createdAt: Date;
  lists: CuratedList[];
  savedLists: string[]; // IDs of saved lists
  following: string[]; // IDs of users they follow
  followers: string[]; // IDs of users who follow them
  interests?: string[];
  social?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

// For search and filtering
export interface SearchFilters {
  query?: string;
  tags?: string[];
  identityTags?: string[];
  valuesTags?: string[];
  cultureTags?: string[];
  location?: {
    lat: number;
    lng: number;
    radius: number; // in km
  };
}
