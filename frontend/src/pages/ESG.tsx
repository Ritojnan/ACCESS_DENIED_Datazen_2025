import { Navbar } from '@/components/layout/navbar';
import React from 'react';

const ESGIframe = () => {
  return (
    <div>
        <Navbar />
    <div style={{ position: 'relative', paddingBottom: '56.25%',marginTop: '55px', overflow: 'hidden', maxWidth: '100%', height: '100%' }}>
      <iframe
        src="http://localhost:8505"  // Replace this with your deployed Streamlit URL
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        frameBorder="0"
        title="ESG"
      />
    </div>
    </div>
  );
};

export default ESGIframe;
