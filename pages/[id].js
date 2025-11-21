import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getAllPostIds, getPostData } from '../lib/posts';

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.name}</title>
      </Head>
      
      <article style={{maxWidth: '600px', margin: '0 auto', padding: '2rem'}}>
        <h1 style={{marginBottom: '2rem', color: '#333'}}>{postData.name}</h1>
        
        <div style={{
          background: '#f9f9f9',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            padding: '0.75rem 0',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span style={{fontWeight: 'bold', width: '120px', color: '#666'}}>First Name:</span>
            <span style={{flex: 1, color: '#333'}}>{postData.first_name}</span>
          </div>
          
          <div style={{
            display: 'flex',
            padding: '0.75rem 0',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span style={{fontWeight: 'bold', width: '120px', color: '#666'}}>Last Name:</span>
            <span style={{flex: 1, color: '#333'}}>{postData.last_name}</span>
          </div>
          
          {postData.email && (
            <div style={{
              display: 'flex',
              padding: '0.75rem 0',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <span style={{fontWeight: 'bold', width: '120px', color: '#666'}}>Email:</span>
              <span style={{flex: 1}}>
                <a href={`mailto:${postData.email}`} style={{color: '#0070f3', textDecoration: 'none'}}>
                  {postData.email}
                </a>
              </span>
            </div>
          )}
          
          {postData.phone && (
            <div style={{
              display: 'flex',
              padding: '0.75rem 0',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <span style={{fontWeight: 'bold', width: '120px', color: '#666'}}>Phone:</span>
              <span style={{flex: 1}}>
                <a href={`tel:${postData.phone}`} style={{color: '#0070f3', textDecoration: 'none'}}>
                  {postData.phone}
                </a>
              </span>
            </div>
          )}
          
          {postData.company && (
            <div style={{display: 'flex', padding: '0.75rem 0'}}>
              <span style={{fontWeight: 'bold', width: '120px', color: '#666'}}>Company:</span>
              <span style={{flex: 1, color: '#333'}}>{postData.company}</span>
            </div>
          )}
        </div>
        
        <div style={{marginTop: '2rem'}}>
          <Link href="/" style={{color: '#0070f3', textDecoration: 'none', fontSize: '1rem'}}>
            ← Back to home
          </Link>
        </div>
      </article>
    </Layout>
  );
}