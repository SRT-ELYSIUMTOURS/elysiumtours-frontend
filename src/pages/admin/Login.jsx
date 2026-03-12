import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/button';

import logoImg from '../../assets/images/LOGO.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For demo/dev purposes, we can mock the login if the backend isn't ready
    // But let's try to use the thunk
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-normal-default p-6 font-raleway">
      <div className="w-full max-w-md bg-white rounded-4xl shadow-xl border border-primary-dark-default p-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
             <img 
               src={logoImg} 
               alt="Elysium Tours" 
               className="h-[50px] w-auto object-contain"
             />
          </div>
          <h1 className="text-2xl font-bold text-tertiary-normal-default">Admin Portal</h1>
          <p className="text-primary-dark-active mt-2">Sign in to manage tours and partners</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <TextInput
            label="Email Address"
            id="email"
            type="email"
            placeholder="admin@elysiumtours.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
              {typeof error === 'string' ? error : 'Login failed. Please check your credentials.'}
            </div>
          )}

          <div className="mt-4">
            <Button 
              type="submit" 
              variant="secondary" 
              className="w-full py-4 text-md font-bold"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-primary-dark-active">
          <p>© {new Date().getFullYear()} Elysium Tours - Secure Admin Access</p>
        </div>
      </div>
      
      <Link to="/" className="mt-8 text-secondary-normal-default hover:underline text-sm font-medium">
        ← Back to Public Website
      </Link>
    </div>
  );
};

// Internal Link helper for React Router
const Link = ({ to, children, className }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(to)} className={className}>
      {children}
    </button>
  );
};

export default Login;
