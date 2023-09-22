import axios, { AxiosResponse } from 'axios';

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

// Call the function to fetch header information
fetchHeaderInfo();


export const getProjects = async () => {
    const data = await fetchHeaderInfo();
    console.log('data')
    console.log(data);
    return {
        time: Math.floor(Date.now() / 1000),
        latitude: 123,
        longditude: 28,
        data: data
    }
}