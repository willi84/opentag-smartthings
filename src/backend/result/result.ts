import axios, { AxiosResponse } from 'axios';
const locationID = 'e3315969-f9aa-4b73-92ab-01ac624c00bc'; 
const PERSONAL_ACCESS_TOKEN = '1f78f4e2-685a-46c4-8cca-2d87630faae7';
const SMARTTHINGS_API_BASE = 'https://api.smartthings.com/v1';

async function fetchHeaderInfo(): Promise<any> {
  try {
    // Make a GET request to the sample API
    const response: AxiosResponse = await axios.get('https://example.com/');

    // Get the 'Content-Type' header from the response
    const contentTypeHeader: string | undefined = response.headers['content-type'];

    // Check if the header exists and log its value
    if (contentTypeHeader) {
      console.log(`Content-Type Header: ${contentTypeHeader}`);
    } else {
      console.log('Content-Type Header not found in the response.');
    }
    console.log(contentTypeHeader)
    return await contentTypeHeader;
  } catch (error) {
    console.error('Error making the request:', error);
  }
}
async function getTagPosition(): Promise<any> {
  const response = await axios.get(`${SMARTTHINGS_API_BASE}/locations/${locationID}/`, {
    headers: {
      Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
    },
  });
  
  const location = response.data;
  console.log(location)
//         'x-ratelimit-limit': '250',
//   'x-ratelimit-remaining': '250',
//   'x-ratelimit-reset': '52413',
  console.log(`ratelimit: ${response.headers["x-ratelimit-limit"]}`)
  console.log(`remaining: ${response.headers["x-ratelimit-remaining"]}`)
  console.log(`reset: ${response.headers["x-ratelimit-reset"]}`)
  // console.log(response.headers)

  return location
}

// Call the function to fetch header information
// fetchHeaderInfo();


export const getProjects = async () => {
    const location = await getTagPosition();
    console.log(location)
    const result = {
      time: Math.floor(Date.now() / 1000),
      latitude: await location.latitude,
      longitude: await location.longitude

  }
    return result;
}