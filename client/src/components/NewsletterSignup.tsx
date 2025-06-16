import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SUBSCRIBER } from '../graphql/mutations';

const NewsletterSignup = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [addSubscriber, { data, loading, error }] = useMutation(ADD_SUBSCRIBER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSubscriber({ variables: formData });
    setFormData({ name: '', email: '' });
  };

  return (
    <form className="p-3 border rounded bg-light" onSubmit={handleSubmit}>
      <h4>Sign up for updates</h4>
      <div className="mb-2">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-2">
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control" required />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Submitting...' : 'Subscribe'}
      </button>
      {error && <p className="text-danger mt-2">Error: {error.message}</p>}
      {data && <p className="text-success mt-2">Thank you for subscribing!</p>}
    </form>
  );
};

export default NewsletterSignup;
