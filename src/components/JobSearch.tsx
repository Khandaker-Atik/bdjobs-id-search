import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function JobSearch() {
  const [jobId, setJobId] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');
  const [hasSearchedOnce, setHasSearchedOnce] = useState(false); // Track if user searched at least once
  const inputRef = useRef<HTMLInputElement>(null);

  // Show preview by default if jobId is present on first load
  useEffect(() => {
    if (jobId) setShowPreview(true);
  }, []);

  const handleSearch = () => {
    if (!jobId) return;
    setShowPreview(true);
    setHasSearchedOnce(true); // User triggered search manually
    setError('');

    // Scroll preview into view after search
    setTimeout(() => {
      const preview = document.getElementById('bdjobs-preview');
      if (preview) preview.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  };

  const openInNewTab = () => {
    if (jobId) {
      window.open(`https://jobs.bdjobs.com/jobdetails/?id=${jobId}&ln=1`, '_blank');
    }
  };

  // Scroll when jobId changes AFTER the first manual search
  useEffect(() => {
    if (hasSearchedOnce && jobId && showPreview) {
      setTimeout(() => {
        const preview = document.getElementById('bdjobs-preview');
        if (preview) preview.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [jobId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
      handleSearch();
    } else if (e.key === 'Enter' && e.ctrlKey) {
      openInNewTab();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(255,255,255,0.97)',
        borderRadius: 18,
        boxShadow: '0 4px 24px #0001',
        padding: '2vw 2vw',
        margin: '2vw auto 0 auto',
        maxWidth: 600,
        width: '98vw',
        minHeight: 120,
        position: 'relative',
        top: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 14 }}>
        <a href="https://www.bdjobs.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="https://hotjobs.bdjobs.com/logos/bdjobslogo300-min.png"
            alt="BDJobs Logo"
            style={{
              width: 300,
              height: 100,
              objectFit: 'contain',
              marginBottom: 10,
              borderRadius: 12,
              boxShadow: '0 2px 12px #0001',
              background: '#fff',
            }}
          />
        </a>
        <h2
          style={{
            fontWeight: 800,
            fontFamily: 'Poppins, Segoe UI, Arial, sans-serif',
            fontSize: 'clamp(1.7rem, 4vw, 2.7rem)',
            marginBottom: 14,
            color: '#1a237e',
            letterSpacing: 1,
            marginTop: 0,
          }}
        >
          BDJobs Custom Search
        </h2>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
          marginBottom: 14,
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Job ID"
          value={jobId}
          onChange={e => setJobId(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            padding: '10px 14px',
            fontSize: 18,
            borderRadius: 8,
            border: '1.5px solid #90caf9',
            width: 'min(200px, 80vw)',
            outline: 'none',
            boxShadow: '0 2px 8px #90caf933',
            flex: '1 1 120px',
            minWidth: 100,
            fontFamily: 'Poppins, Segoe UI, Arial, sans-serif',
          }}
        />
        <button
          onClick={handleSearch}
          disabled={!jobId}
          style={{
            padding: '10px 16px',
            fontSize: 22,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #1976d2 60%, #00bcd4 100%)',
            color: '#fff',
            border: 'none',
            fontWeight: 700,
            cursor: !jobId ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #1976d233',
            flex: '0 0 48px',
            minWidth: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          title="Search (Enter)"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        <button
          onClick={openInNewTab}
          disabled={!jobId}
          style={{
            padding: '10px 16px',
            fontSize: 22,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #43a047 60%, #8bc34a 100%)',
            color: '#fff',
            border: 'none',
            fontWeight: 700,
            cursor: !jobId ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px #43a04733',
            flex: '0 0 48px',
            minWidth: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          title="Open in New Tab (Ctrl+Enter)"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9h6v6" />
            <path d="M15 9v6H9" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ color: 'red', marginBottom: 12, fontWeight: 600 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPreview && jobId && (
          <motion.div
            id="bdjobs-preview"
            key={jobId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            style={{
              background: '#f5f5f5',
              color: '#222',
              borderRadius: 12,
              padding: '2vw',
              marginTop: 10,
              textAlign: 'left',
              maxWidth: 700,
              margin: '0 auto',
              boxShadow: '0 2px 12px #0001',
              overflowX: 'auto',
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              minHeight: 400,
              minWidth: '90vw',
              height: 500,
            }}
          >
            <iframe
              src={`https://jobs.bdjobs.com/jobdetails/?id=${jobId}&ln=1`}
              title="BDJobs Preview"
              style={{ width: '100%', height: 470, border: 'none', borderRadius: 8, background: '#fff' }}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
