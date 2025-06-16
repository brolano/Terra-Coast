// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import NewsletterSignup from './components/NewsletterSignup';

// import Music from './pages/Music';
// import Photos from './pages/Photos';
// import Merch from './pages/Merch';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Terra Coast</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/music">Music</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/photos">Photos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/merch">Merch</Link></li>
            </ul>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            {/* <Route path="/music" element={<Music />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/merch" element={<Merch />} /> */}
            <Route path="/" element={<NewsletterSignup />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
