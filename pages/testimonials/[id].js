import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllTestimonialIds, getTestimonialData } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = await getAllTestimonialIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const testimonialData = await getTestimonialData(params.id);
  return {
    props: {
      testimonialData
    },
    revalidate: 10, // ISR: Regenerate every 10 seconds
  };
}

export default function Testimonial({ testimonialData }) {
  return (
    <Layout>
      <Head>
        <title>{testimonialData.client_name} - Testimonial</title>
      </Head>
      
      <article style={{maxWidth: '700px', margin: '0 auto', padding: '2rem'}}>
        <h1 style={{marginBottom: '0.5rem', color: '#333'}}>{testimonialData.title}</h1>
        
        <div style={{marginBottom: '2rem'}}>
          <p style={{fontSize: '1.1rem', fontWeight: '500', color: '#555', marginBottom: '0.25rem'}}>
            {testimonialData.client_name}
          </p>
          {testimonialData.company && (
            <p style={{color: '#666', fontSize: '0.95rem'}}>
              {testimonialData.company}
            </p>
          )}
        </div>
        
        {testimonialData.rating && (
          <div style={{marginBottom: '1.5rem', fontSize: '1.5rem', color: '#fbbf24'}}>
            {'★'.repeat(parseInt(testimonialData.rating))}
            {'☆'.repeat(5 - parseInt(testimonialData.rating))}
          </div>
        )}
        
        <div style={{
          background: '#f9f9f9',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          borderLeft: '4px solid #0070f3'
        }}>
          {testimonialData.quote && (
            <blockquote style={{
              margin: 0,
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              fontStyle: 'italic'
            }}>
              "{testimonialData.quote}"
            </blockquote>
          )}
        </div>
        
        {testimonialData.date && (
          <p style={{color: '#999', fontSize: '0.875rem', marginBottom: '2rem'}}>
            {testimonialData.date}
          </p>
        )}
        
        <div style={{marginTop: '2rem'}}>
          <Link href="/#testimonials" style={{color: '#0070f3', textDecoration: 'none', fontSize: '1rem'}}>
            ← Back to testimonials
          </Link>
        </div>
      </article>
    </Layout>
  );
}