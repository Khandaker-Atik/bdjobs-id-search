import JobSearch from './components/JobSearch';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <JobSearch />
      </main>
      <Footer />
    </div>
  );
}

export default App;
