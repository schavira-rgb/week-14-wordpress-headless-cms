import Link from 'next/link';
import { getSortedPostsData, getAllProjects, getAllTestimonials } from '../lib/posts';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import customStyles from '../styles/CustomHome.module.css';

export default function Home({ allPostsData, allProjects, allTestimonials }) {
  // Find Snippet Manager as featured project
  const featuredProject = allProjects.find(project => 
    project.title.toLowerCase().includes('snippet manager')
  ) || allProjects[0];
  
  // Remove featured from examples
  const exampleProjects = allProjects.filter(project => project.id !== featuredProject?.id);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      {/* ========== OUTSIDE CONTAINER ========== */}
      
      {/* HERO SECTION - Full Width */}
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
      </section>

      {/* NAVBAR - Full Width, Sticky */}
      <nav className={customStyles.navbar}>
        <a href="#about" className={customStyles.navLink}>About</a>
        <a href="#projects" className={customStyles.navLink}>Projects</a>
        <a href="#testimonials" className={customStyles.navLink}>Testimonials</a>
        <a href="#contacts" className={customStyles.navLink}>Contacts</a>
      </nav>

      {/* ABOUT & SKILLS - Full Width, 2 Columns */}
      <div className={customStyles.twoColumnSection} id="about">
        {/* About - Left Column */}
        <section className={customStyles.columnCard}>
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

        {/* Skills - Right Column */}
        <section className={customStyles.columnCard}>
          <h2 className={customStyles.sectionTitle}>Skills & Technologies</h2>
          <div className={customStyles.skillsStack}>
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
      </div>

      {/* ========== INSIDE CONTAINER ========== */}
      <div className={customStyles.container}>

        {/* PROJECTS SECTION */}
        <section className={customStyles.section} id="projects">
          <h2 className={customStyles.sectionTitle}>Projects</h2>
          <p className={customStyles.sectionSubtitle}>Portfolio of web development projects</p>
          
          {/* Featured Project */}
          {featuredProject && (
            <div className={customStyles.featuredProject}>
              <span className={customStyles.featuredBadge}>Featured Project</span>
              <Link href={`/projects/${featuredProject.id}`} className={customStyles.featuredLink}>
                <h3 className={customStyles.featuredTitle}>{featuredProject.title}</h3>
                <p className={customStyles.featuredDescription}>
                  {featuredProject.description}
                </p>
                <div className={customStyles.featuredMeta}>
                  {featuredProject.technologies && (
                    <span className={customStyles.projectTech}>
                      <strong>Tech:</strong> {featuredProject.technologies}
                    </span>
                  )}
                  {featuredProject.status && (
                    <span className={customStyles.statusBadge}>{featuredProject.status}</span>
                  )}
                </div>
              </Link>
            </div>
          )}

          {/* Other Projects Grid */}
          {exampleProjects.length > 0 && (
            <>
              <h3 className={customStyles.subsectionTitle}>More Projects</h3>
              <div className={customStyles.projectGrid}>
                {exampleProjects.map(({ id, title, technologies, status }) => (
                  <div key={id} className={customStyles.projectCard}>
                    <Link href={`/projects/${id}`} className={customStyles.cardLink}>
                      <h4 className={customStyles.cardTitle}>{title}</h4>
                      {technologies && (
                        <p className={customStyles.cardMeta}>{technologies}</p>
                      )}
                      {status && (
                        <span className={customStyles.statusBadge}>{status}</span>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className={customStyles.section} id="testimonials">
          <h2 className={customStyles.sectionTitle}>Testimonials</h2>
          <p className={customStyles.sectionSubtitle}>Client feedback and reviews</p>
          <div className={customStyles.testimonialGrid}>
            {allTestimonials.map(({ id, client_name, company, rating, quote }) => (
              <div key={id} className={customStyles.testimonialCard}>
                <Link href={`/testimonials/${id}`} className={customStyles.cardLink}>
                  <h4 className={customStyles.cardTitle}>{client_name}</h4>
                  {company && (
                    <p className={customStyles.cardMeta}>{company}</p>
                  )}
                  {rating && (
                    <div className={customStyles.rating}>
                      {'★'.repeat(parseInt(rating))}{'☆'.repeat(5 - parseInt(rating))}
                    </div>
                  )}
                  {quote && (
                    <p className={customStyles.quote}>
                      "{quote.substring(0, 120)}..."
                    </p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACTS SECTION */}
        <section className={customStyles.section} id="contacts">
          <h2 className={customStyles.sectionTitle}>Contact Directory</h2>
          <p className={customStyles.sectionSubtitle}>Professional contacts and connections</p>
          <div className={customStyles.contactGrid}>
            {allPostsData.map(({ id, first_name, last_name, company }) => (
              <div key={id} className={customStyles.contactCard}>
                <Link href={`/${id}`} className={customStyles.cardLink}>
                  <h4 className={customStyles.cardTitle}>
                    {first_name} {last_name}
                  </h4>
                  {company && (
                    <p className={customStyles.cardMeta}>{company}</p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT INFO */}
        <section className={customStyles.contactSection}>
          <h2 className={customStyles.sectionTitle}>Get In Touch</h2>
          <a href="mailto:schavira@bearcubs.santarosa.edu" className={customStyles.contactEmail}>
            schavira@bearcubs.santarosa.edu
          </a>
        </section>

      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  const allProjects = await getAllProjects();
  const allTestimonials = await getAllTestimonials();
  
  return {
    props: {
      allPostsData,
      allProjects,
      allTestimonials,
    },
    revalidate: 10,
  };
}