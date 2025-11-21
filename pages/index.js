import Link from 'next/link';
import Date from '../components/date';
import { getSortedPostsData, getAllProjects, getAllTestimonials } from '../lib/posts';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import customStyles from '../styles/CustomHome.module.css';

export default function Home({ allPostsData, allProjects, allTestimonials }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <div className={customStyles.container}>
        <section className={customStyles.heroSection}>
          <div className={customStyles.profileImageContainer}>
            <img
              src="/images/profile.jpg"
              className={customStyles.profileImage}
              alt="Estevan Chavira"
              width={200}
              height={200}
            />
          </div>
          <h1 className={customStyles.heroTitle}>Estevan Chavira</h1>
          <p className={customStyles.heroSubtitle}>Cybersecurity Student & Web Developer</p>
          <a href="#contacts" className={customStyles.blogLink}>
            View Contact Directory
          </a>
        </section>

        <section className={customStyles.section}>
          <h2 className={customStyles.sectionTitle}>About</h2>
          <p className={customStyles.aboutText}>
            I'm a cybersecurity student at SRJC learning how technology works at every level. 
            After completing web development coursework in HTML and CSS, I'm now exploring 
            server-side technologies to build a complete understanding of web systems from a 
            security perspective. I want a deeper understanding of the technology we use and 
            go beyond just the code. I want to understand why it does what it does and how to 
            build innovative solutions with it.
          </p>
        </section>

        <section className={customStyles.section}>
          <h2 className={customStyles.sectionTitle}>Skills & Technologies</h2>
          <div className={customStyles.skillsGrid}>
            <div className={customStyles.skillCategory}>
              <h3 className={customStyles.skillCategoryTitle}>Security & Networking</h3>
              <ul className={customStyles.skillsList}>
                <li className={customStyles.skillItem}>Security+ Certified</li>
                <li className={customStyles.skillItem}>Cybersecurity Principles</li>
                <li className={customStyles.skillItem}>Network Fundamentals</li>
                <li className={customStyles.skillItem}>Protocol Analysis</li>
              </ul>
            </div>
            <div className={customStyles.skillCategory}>
              <h3 className={customStyles.skillCategoryTitle}>Server Technologies</h3>
              <ul className={customStyles.skillsList}>
                <li className={customStyles.skillItem}>Linux Administration</li>
                <li className={customStyles.skillItem}>Virtualization/Cloud</li>
                <li className={customStyles.skillItem}>Server-Side Development</li>
              </ul>
            </div>
            <div className={customStyles.skillCategory}>
              <h3 className={customStyles.skillCategoryTitle}>Programming</h3>
              <ul className={customStyles.skillsList}>
                <li className={customStyles.skillItem}>Python</li>
                <li className={customStyles.skillItem}>HTML & CSS</li>
                <li className={customStyles.skillItem}>JavaScript</li>
                <li className={customStyles.skillItem}>Next.js</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={customStyles.section}>
          <h2 className={customStyles.sectionTitle}>Education</h2>
          <ul className={customStyles.educationList}>
            <li className={customStyles.educationItem}>
              <div className={customStyles.courseTitle}>Current Coursework (Fall 2025)</div>
              <div className={customStyles.courseDescription}>
                CS180.3 (Virtualization/Cloud Computing), CS55.13 (Server-Side Web Development), ETHS20 (Ethnic Studies)
              </div>
            </li>
            <li className={customStyles.educationItem}>
              <div className={customStyles.courseTitle}>Completed Certifications & Courses</div>
              <div className={customStyles.courseDescription}>
                Security+ Certification, Linux Administration 1 & 2, Python Programming, 
                Networking Fundamentals (2 courses), Web Development (HTML/CSS)
              </div>
            </li>
          </ul>
        </section>

        <section className={customStyles.section}>
          <div className={customStyles.contactInfo}>
            <h2 className={customStyles.sectionTitle}>Contact</h2>
            <a href="mailto:schavira@bearcubs.santarosa.edu" className={customStyles.contactEmail}>
              schavira@bearcubs.santarosa.edu
            </a>
          </div>
        </section>

        {/* PROJECTS SECTION - Week 14 Assignment */}
        <section className={customStyles.section} id="projects">
          <h2 className={customStyles.sectionTitle}>Projects</h2>
          <p style={{marginBottom: '1rem', color: '#666'}}>
            Portfolio of web development projects
          </p>
          <div className="project-list">
            <ul style={{listStyle: 'none', padding: 0}}>
              {allProjects.map(({ id, title, technologies, status }) => (
                <li key={id} style={{
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  transition: 'background 0.2s'
                }}>
                  <Link href={`/projects/${id}`} style={{
                    textDecoration: 'none',
                    color: '#0070f3',
                    display: 'block'
                  }}>
                    <strong style={{fontSize: '1.1rem'}}>
                      {title}
                    </strong>
                    {technologies && (
                      <span style={{color: '#666', fontSize: '0.9rem', marginLeft: '0.5rem'}}>
                        - {technologies}
                      </span>
                    )}
                    {status && (
                      <span style={{
                        color: status === 'Completed' ? '#22c55e' : '#f59e0b',
                        fontSize: '0.85rem',
                        marginLeft: '0.5rem',
                        fontWeight: '500'
                      }}>
                        ({status})
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* TESTIMONIALS SECTION - Week 14 Assignment */}
        <section className={customStyles.section} id="testimonials">
          <h2 className={customStyles.sectionTitle}>Testimonials</h2>
          <p style={{marginBottom: '1rem', color: '#666'}}>
            Client feedback and reviews
          </p>
          <div className="testimonial-list">
            <ul style={{listStyle: 'none', padding: 0}}>
              {allTestimonials.map(({ id, title, client_name, company, rating }) => (
                <li key={id} style={{
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  transition: 'background 0.2s'
                }}>
                  <Link href={`/testimonials/${id}`} style={{
                    textDecoration: 'none',
                    color: '#0070f3',
                    display: 'block'
                  }}>
                    <strong style={{fontSize: '1.1rem'}}>
                      {client_name}
                    </strong>
                    {company && (
                      <span style={{color: '#666', fontSize: '0.9rem', marginLeft: '0.5rem'}}>
                        - {company}
                      </span>
                    )}
                    {rating && (
                      <span style={{color: '#fbbf24', marginLeft: '0.5rem'}}>
                        {'★'.repeat(parseInt(rating))}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACTS SECTION - Week 13 Assignment */}
        <section className={customStyles.section} id="contacts">
          <h2 className={customStyles.sectionTitle}>Contact Directory</h2>
          <p style={{marginBottom: '1rem', color: '#666'}}>
            Professional contacts and connections
          </p>
          <div className="contact-list">
            <ul style={{listStyle: 'none', padding: 0}}>
              {allPostsData.map(({ id, name, first_name, last_name, company }) => (
                <li key={id} style={{
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  transition: 'background 0.2s'
                }}>
                  <Link href={`/${id}`} style={{
                    textDecoration: 'none',
                    color: '#0070f3',
                    display: 'block'
                  }}>
                    <strong style={{fontSize: '1.1rem'}}>
                      {first_name} {last_name}
                    </strong>
                    {company && (
                      <span style={{color: '#666', fontSize: '0.9rem', marginLeft: '0.5rem'}}>
                        - {company}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Fetch data from all 3 WordPress REST API endpoints
  const allPostsData = await getSortedPostsData();
  const allProjects = await getAllProjects();
  const allTestimonials = await getAllTestimonials();
  
  return {
    props: {
      allPostsData,
      allProjects,
      allTestimonials,
    },
    revalidate: 10, // ISR: Regenerate page every 10 seconds if there's a request
  };
}