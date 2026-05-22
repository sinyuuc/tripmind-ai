// Activity type for itinerary activities
export interface Activity {
  name: string;
  description: string;
  image?: string;
}

// DayItinerary type for daily itinerary
export interface DayItinerary {
  day: number;
  activities: Activity[];
}

// ItineraryData type for complete itinerary
export interface ItineraryData {
  destination: string;
  itinerary: DayItinerary[];
}

// TravelHistory type for database records
export interface TravelHistory {
  id: string;
  user_id: string;
  question: string;
  ai_response: ItineraryData;
  created_at: string;
}

// API request type
export interface GenerateItineraryRequest {
  destination: string;
  days: number;
  budget?: string;
}

// API response type
export interface GenerateItineraryResponse {
  data?: ItineraryData;
  error?: string;
  history_id?: string;
}
