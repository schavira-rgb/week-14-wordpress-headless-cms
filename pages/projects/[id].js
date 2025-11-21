import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllProjectIds, getProjectData } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = await getAllProjectIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const projectData = await getProjectData(params.id);
  return {
    props: {
      projectData
    },
    revalidate: 10, // ISR: Regenerate every 10 seconds
  };
}

export default function Project({ projectData }) {
  return (
    <Layout>
      <Head>
        <title>{projectData.title}</title>
      </Head>
      
      <article style={{maxWidth: '800px', margin: '0 auto', padding: '2rem'}}>
        <h1 style={{marginBottom: '1rem', color: '#333'}}>{projectData.title}</h1>
        
        {projectData.status && (
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '1.5rem',
            background: projectData.status === 'Completed' ? '#dcfce7' : '#fef3c7',
            color: projectData.status === 'Completed' ? '#166534' : '#92400e'
          }}>
            {projectData.status}
          </span>
        )}
        
        <div style={{
          background: '#f9f9f9',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          {projectData.description && (
            <div style={{marginBottom: '1.5rem'}}>
              <h3 style={{color: '#666', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
                Description:
              </h3>
              <p style={{color: '#333', lineHeight: '1.6'}}>
                {projectData.description}
              </p>
            </div>
          )}
          
          {projectData.technologies && (
            <div style={{
              padding: '1rem 0',
              borderTop: '1px solid #e0e0e0'
            }}>
              <span style={{fontWeight: 'bold', color: '#666'}}>Technologies:</span>
              <span style={{marginLeft: '0.5rem', color: '#333'}}>{projectData.technologies}</span>
            </div>
          )}
          
          {projectData.project_url && (
            <div style={{
              padding: '1rem 0',
              borderTop: '1px solid #e0e0e0'
            }}>
              <span style={{fontWeight: 'bold', color: '#666'}}>Project URL:</span>
              <span style={{marginLeft: '0.5rem'}}>
                <a 
                  href={projectData.project_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{color: '#0070f3', textDecoration: 'none'}}
                >
                  {projectData.project_url}
                </a>
              </span>
            </div>
          )}
          
          {projectData.github_link && (
            <div style={{
              padding: '1rem 0',
              borderTop: '1px solid #e0e0e0'
            }}>
              <span style={{fontWeight: 'bold', color: '#666'}}>GitHub:</span>
              <span style={{marginLeft: '0.5rem'}}>
                <a 
                  href={projectData.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{color: '#0070f3', textDecoration: 'none'}}
                >
                  {projectData.github_link}
                </a>
              </span>
            </div>
          )}
        </div>
        
        <div style={{marginTop: '2rem'}}>
          <Link href="/#projects" style={{color: '#0070f3', textDecoration: 'none', fontSize: '1rem'}}>
            ← Back to projects
          </Link>
        </div>
      </article>
    </Layout>
  );
}