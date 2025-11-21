import got from 'got';

// WordPress REST API URLs for all 3 post types
const contactsURL = "https://dev-wp-sql-assignment.pantheonsite.io/wp-json/twentytwentyfive-child/v1/contacts";
const projectsURL = "https://dev-wp-sql-assignment.pantheonsite.io/wp-json/twentytwentyfive-child/v1/projects";
const testimonialsURL = "https://dev-wp-sql-assignment.pantheonsite.io/wp-json/twentytwentyfive-child/v1/testimonials";

// ============================================================
// CONTACTS FUNCTIONS
// ============================================================

// Function 1: Get sorted list of all contacts
export async function getSortedPostsData() {
  let jsonString;
  
  try {
    jsonString = await got(contactsURL);
    console.log('Fetched contacts from WordPress');
  } catch(error) {
    console.error('Error fetching contacts:', error);
    return [];
  }

  const jsonObj = JSON.parse(jsonString.body);
  
  return jsonObj.map(contact => {
    return {
      id: contact.ID.toString(),
      name: contact.post_title,
      first_name: contact.first_name,
      last_name: contact.last_name,
      company: contact.company
    };
  }).sort((a, b) => {
    if (a.last_name > b.last_name) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Function 2: Get all contact IDs for static generation
export async function getAllPostIds() {
  let jsonString;
  
  try {
    jsonString = await got(contactsURL);
  } catch(error) {
    console.error('Error fetching contacts:', error);
    return [];
  }

  const jsonObj = JSON.parse(jsonString.body);
  
  return jsonObj.map(contact => {
    return {
      params: {
        id: contact.ID.toString()
      }
    };
  });
}

// Function 3: Get detailed data for a single contact
export async function getPostData(id) {
  let jsonString;
  
  try {
    jsonString = await got(contactsURL);
  } catch(error) {
    console.error('Error fetching contacts:', error);
    return null;
  }

  const jsonObj = JSON.parse(jsonString.body);
  const contact = jsonObj.find(c => c.ID.toString() === id);
  
  if (!contact) {
    return null;
  }

  return {
    id: contact.ID.toString(),
    name: contact.post_title,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone,
    company: contact.company
  };
}

// ============================================================
// PROJECTS FUNCTIONS (NEW for Week 14)
// ============================================================

// Get all projects
export async function getAllProjects() {
  let jsonString;
  
  try {
    jsonString = await got(projectsURL);
    console.log('Fetched projects from WordPress');
  } catch(error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  const jsonObj = JSON.parse(jsonString.body);
  
  return jsonObj.map(project => {
    return {
      id: project.ID.toString(),
      title: project.post_title,
      description: project.description,
      technologies: project.technologies,
      project_url: project.project_url,
      github_link: project.github_link,
      status: project.status
    };
  });
}

// Get all project IDs for static generation
export async function getAllProjectIds() {
  let jsonString;
  
  try {
    jsonString = await got(projectsURL);
  } catch(error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  const jsonObj = JSON.parse(jsonString.body);
  
  return jsonObj.map(project => {
    return {
      params: {
        id: project.ID.toString()
      }
    };
  });
}

// Get detailed data for a single project
export async function getProjectData(id) {
  let jsonString;
  
  try {
    jsonString = await got(projectsURL);
  } catch(error) {
    console.error('Error fetching projects:', error);
    return null;
  }

  const jsonObj = JSON.parse(jsonString.body);
  const project = jsonObj.find(p => p.ID.toString() === id);
  
  if (!project) {
    return null;
  }

  return {
    id: project.ID.toString(),
    title: project.post_title,
    description: project.description,
    technologies: project.technologies,
    project_url: project.project_url,
    github_link: project.github_link,
    status: project.status
  };
}

// ============================================================
// TESTIMONIALS FUNCTIONS (NEW for Week 14)
// ============================================================

// Get all testimonials
export async function getAllTestimonials() {
  let jsonString;
  
  try {
    jsonString = await got(testimonialsURL);
    console.log('Fetched testimonials from WordPress');
  } catch(error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  const jsonObj = JSON.parse(jsonString.body);
  
  return jsonObj.map(testimonial => {
    return {
      id: testimonial.ID.toString(),
      title: testimonial.post_title,
      client_name: testimonial.client_name,
      company: testimonial.company,
      quote: testimonial.quote,
      rating: testimonial.rating,
      date: testimonial.date
    };
  });
}

// Get all testimonial IDs for static generation
export async function getAllTestimonialIds() {
  let jsonString;
  
  try {
    jsonString = await got(testimonialsURL);
  } catch(error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  const jsonObj = JSON.parse(jsonString.body);
  
  return jsonObj.map(testimonial => {
    return {
      params: {
        id: testimonial.ID.toString()
      }
    };
  });
}

// Get detailed data for a single testimonial
export async function getTestimonialData(id) {
  let jsonString;
  
  try {
    jsonString = await got(testimonialsURL);
  } catch(error) {
    console.error('Error fetching testimonials:', error);
    return null;
  }

  const jsonObj = JSON.parse(jsonString.body);
  const testimonial = jsonObj.find(t => t.ID.toString() === id);
  
  if (!testimonial) {
    return null;
  }

  return {
    id: testimonial.ID.toString(),
    title: testimonial.post_title,
    client_name: testimonial.client_name,
    company: testimonial.company,
    quote: testimonial.quote,
    rating: testimonial.rating,
    date: testimonial.date
  };
}