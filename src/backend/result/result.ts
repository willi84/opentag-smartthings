import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
const SMARTTHINGS_API_BASE = 'https://api.smartthings.com/v1';


const apiKey = process.env.SMART_PAT;
const locationID = process.env.LOCATION_ID;

const PERSONAL_ACCESS_TOKEN = apiKey;
async function getTagPosition(): Promise<any> {
  const response = await axios.get(`${SMARTTHINGS_API_BASE}/locations/${locationID}/`, {
    headers: {
      Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
    },
  });
  
  const location = response.data;
  return location
}

export const getProjects = async () => {
    const location = await getTagPosition();
    const result = {
      time: Math.floor(Date.now() / 1000),
      latitude: await location.latitude,
      longitude: await location.longitude

  }
    return result;
}