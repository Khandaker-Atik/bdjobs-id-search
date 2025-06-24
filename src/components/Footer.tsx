import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100vw',
        color: '#555',
        fontSize: '1.05rem',
        background: 'linear-gradient(90deg, #e3f2fd 0%, #fffde7 100%)',
        borderTop: '1.5px solid #e0e0e0',
        padding: '1.2rem 0 1.5rem 0',
        boxShadow: '0 -2px 12px #0001',
        letterSpacing: 0.2,
        fontWeight: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        zIndex: 1000,
      }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, type: 'spring', bounce: 0.4 }}
        style={{ marginBottom: 4 }}
      >
        &copy; 2025 BDJobs Custom Search. All rights reserved.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        Developed by{' '}
        <span style={{ fontWeight: 700, color: '#1976d2' }}>khandaker atik</span>
        , email:{' '}
        <a
          href="mailto:Khandakeratik43@gmail.com"
          style={{ color: '#1976d2', textDecoration: 'underline' }}
        >
          Khandakeratik43@gmail.com
        </a>
      </motion.div>
    </motion.footer>
  );
}
