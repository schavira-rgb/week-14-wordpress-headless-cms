import got from 'got';

// WordPress REST API URL for contacts
const dataURL = "https://dev-wp-sql-assignment.pantheonsite.io/wp-json/twentytwentyfive-child/v1/contacts";

// Function 1: Get sorted list of all contacts
// Used on the homepage
export async function getSortedPostsData() {
  let jsonString;
  
  try {
    // Fetch data from WordPress API
    jsonString = await got(dataURL);
    console.log('Fetched contacts from WordPress');
  } catch(error) {
    console.error('Error fetching from WordPress:', error);
    return [];
  }

  // Parse the JSON response
  const jsonObj = JSON.parse(jsonString.body);
  
  // Map WordPress contact fields to our format
  return jsonObj.map(contact => {
    return {
      id: contact.ID.toString(),           // Contact ID
      name: contact.post_title,            // Full name (from post title)
      first_name: contact.first_name,      // First name
      last_name: contact.last_name,        // Last name
      company: contact.company             // Company name
    };
  }).sort((a, b) => {
    // Sort by last name alphabetically
    if (a.last_name > b.last_name) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Function 2: Get all contact IDs for static generation
// Used by Next.js to pre-generate pages
export async function getAllPostIds() {
  let jsonString;
  
  try {
    // Fetch data from WordPress API
    jsonString = await got(dataURL);
  } catch(error) {
    console.error('Error fetching from WordPress:', error);
    return [];
  }

  // Parse the JSON response
  const jsonObj = JSON.parse(jsonString.body);
  
  // Return array of contact IDs for static generation
  return jsonObj.map(contact => {
    return {
      params: {
        id: contact.ID.toString()  // Contact ID as string
      }
    };
  });
}

// Function 3: Get detailed data for a single contact
// Used on individual contact detail pages
export async function getPostData(id) {
  let jsonString;
  
  try {
    // Fetch data from WordPress API
    jsonString = await got(dataURL);
  } catch(error) {
    console.error('Error fetching from WordPress:', error);
    return null;
  }

  // Parse the JSON response
  const jsonObj = JSON.parse(jsonString.body);
  
  // Find the specific contact by ID
  const contact = jsonObj.find(c => c.ID.toString() === id);
  
  if (!contact) {
    return null;
  }

  // Return formatted contact data with ALL fields
  return {
    id: contact.ID.toString(),
    name: contact.post_title,           // Full name
    first_name: contact.first_name,     // First name
    last_name: contact.last_name,       // Last name
    email: contact.email,               // Email address
    phone: contact.phone,               // Phone number
    company: contact.company            // Company name
  };
}