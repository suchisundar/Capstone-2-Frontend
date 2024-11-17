import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class Api {
  static token;

  // Sets the token for authenticated requests
  static setToken(token) {
    this.token = token;
  }

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = method === "get" ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      const message = err.response?.data?.error?.message || "Unknown API error";
      throw Array.isArray(message) ? message : [message];
    }
  }

  // User API calls
  static async login(data) {
    const res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async signup(data) {
    const res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  // Trip-related API calls


  static async createTrip(tripData) {
    const res = await this.request(`trips`, tripData, "post"); 
    return res.trip;
  }
 

   static async getTrips(username) {
    if (!username) throw new Error("Username is required to fetch trips");
    const res = await this.request(`users/${username}/trips`); 
    return res.trips; // Return trips array
  }
  static async getTrip(tripId) {
    if (!tripId) throw new Error("Trip ID is required to fetch trip details");
    const res = await this.request(`trips/${tripId}`);
    return res.trip; // Return the trip details
  }
  
  
  static async getTripWeather(tripId) {
    const res = await this.request(`trips/${tripId}/weather`);
    return res.weather;
  }

  static async addPackingItem(tripId, item) {
    const res = await this.request(`trips/${tripId}/packinglist`, item, "post");
    return res.packingListItem;
  }

  static async getPackingList(tripId) {
    const res = await this.request(`trips/${tripId}/packinglist`); 
    return res.packingList;
  }
  

  static async getActivities(tripId) {
    const res = await this.request(`trips/${tripId}/activities`);
    return res.activities;
  }
}

export default Api;
