import React, { useState } from 'react';
import api from '../services/api';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const AuthPage = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('reader@ethereal.library');
  const [password, setPassword] = useState('libraryPass123');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      if (isSignUp) {
        const regRes = await api.register(name || 'New Reader', email, password);
        setStatusMessage({
          type: 'success',
          text: regRes.message || 'Account created! Signing you in...'
        });
        setTimeout(async () => {
          try {
            await api.login(email, password);
            onAuthSuccess(api.getToken(), api.getUser());
          } catch (err) {
            setIsSignUp(false);
          }
        }, 800);
      } else {
        await api.login(email, password);
        setStatusMessage({
          type: 'success',
          text: 'Welcome back! Opening your library...'
        });
        setTimeout(() => {
          onAuthSuccess(api.getToken(), api.getUser());
        }, 500);
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Incorrect email or password. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl md:max-w-[720px] mx-auto rounded-3xl overflow-hidden shadow-notebook flex flex-col md:flex-row bg-white border border-[#D5D5D8] max-h-[90vh] md:max-h-[425px] md:h-[425px] relative">
      
      {/* LEFT COLUMN: Deep Blue with Book-Tower Illustration (Matching Mockup 1) */}
      <div className="w-full md:w-1/2 bg-[#2C64AC] relative flex items-center justify-center overflow-hidden min-h-[160px] md:min-h-0 self-stretch">
        {/* Mockup Illustration */}
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center bg-[#2C64AC]">
          <img 
            src="/assets/Login-sample.png" 
            alt="Reading Adventure Tower" 
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Yellow 8-Point Starburst (Straddling the center seam at the bottom, exactly as in mockup) */}
      <div className="absolute -bottom-3.5 md:-bottom-4 left-6 md:left-1/2 md:-translate-x-1/2 z-20 pointer-events-none">
        <svg className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] md:w-[94px] md:h-[94px] text-[#EDCE4B]" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="56.7,2.5 60.2,32.8 88.3,21.1 69.4,45 97.5,56.7 67.2,60.2 78.9,88.3 55,69.4 43.3,97.5 39.8,67.2 11.7,78.9 30.6,55 2.5,43.3 32.8,39.8 21.1,11.7 45,30.6" />
        </svg>
      </div>

      {/* RIGHT COLUMN: Crisp White Form with Whimsical Retro Pop Accents */}
      <div className="w-full md:w-1/2 bg-white px-5 py-4 sm:px-8 sm:py-5 flex flex-col justify-center relative select-none overflow-y-auto no-scrollbar">
        
        {/* Pink 8-Point Starburst (Top Right Corner, matching size and position in mockup) */}
        <div className="absolute -top-2.5 sm:-top-3 right-2.5 sm:right-4 pointer-events-none z-10">
          <svg className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] md:w-[94px] md:h-[94px] text-[#ED7CA5]" viewBox="0 0 100 100" fill="currentColor">
            <polygon points="60,3 61.3,33.5 90.3,23.9 69.7,46.4 97,60 66.5,61.3 76.1,90.3 53.6,69.7 40,97 38.7,66.5 9.7,76.1 30.3,53.6 3,40 33.5,38.7 23.9,9.7 46.4,30.3" />
          </svg>
        </div>

        {/* Floating Musical Notes */}
        <div className="absolute top-6 left-3 font-bold text-lg text-[#1E1B2E] select-none pointer-events-none">
          ♪
        </div>
        <div className="absolute top-12 right-3 font-bold text-lg text-[#1E1B2E] select-none pointer-events-none">
          ♫
        </div>

        {/* Form Container */}
        <div className="max-w-[280px] sm:max-w-[320px] w-full mx-auto relative z-10">
          
          {/* Title in Showcard Gothic */}
          <div className="mb-2 sm:mb-2.5">
            <h1 className="font-showcard text-3xl sm:text-4xl font-normal text-[#EDCE4B] tracking-wide uppercase drop-shadow-[2px_2px_0px_rgba(30,27,46,0.15)] leading-tight">
              {isSignUp ? 'REGISTER' : 'LOGIN'}
            </h1>
            <p className="font-papabear text-[11px] sm:text-xs text-[#595667] font-semibold mt-0.5 tracking-wide">
              {isSignUp ? 'Create your reader identity' : 'Enter your credentials to open the notebook'}
            </p>
          </div>

          {/* Feedback message */}
          {statusMessage && (
            <div className={`mb-2 p-2 rounded-xl font-papabear text-[11px] flex items-center gap-2 ${
              statusMessage.type === 'success' 
                ? 'bg-[#EAF7EE] text-[#1E6B34] border border-[#A7E3B6]' 
                : 'bg-[#FDE5E2] text-[#8C2216] border border-[#F6A59D]'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="font-bold">{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5">
            {isSignUp && (
              <div>
                <label className="block font-papabear text-xs sm:text-sm font-bold text-[#ED7CA5] uppercase tracking-wider mb-0.5">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name..."
                  className="pill-input w-full py-1.5 sm:py-2 px-3.5 sm:px-4 text-xs sm:text-sm"
                />
              </div>
            )}

            <div>
              <label className="block font-papabear text-xs sm:text-sm font-bold text-[#ED7CA5] uppercase tracking-wider mb-0.5">
                EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@library.com"
                className="pill-input w-full py-1.5 sm:py-2 px-3.5 sm:px-4 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block font-papabear text-xs sm:text-sm font-bold text-[#ED7CA5] uppercase tracking-wider mb-0.5">
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="pill-input w-full py-1.5 sm:py-2 px-3.5 sm:px-4 text-xs sm:text-sm"
              />
            </div>

            {/* Blue Pill SUBMIT Button in Showcard Gothic */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1.5 py-2 sm:py-2.5 px-5 rounded-full bg-[#2C64AC] hover:bg-[#205191] active:scale-[0.98] text-white font-showcard tracking-widest text-base sm:text-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>SUBMIT</span>
              )}
            </button>
          </form>

          {/* Toggle with Red Sketched Circle around REGISTER */}
          <div className="mt-2.5 sm:mt-3 text-center">
            <p className="font-papabear text-[11px] sm:text-xs text-[#1E1B2E] uppercase tracking-wider font-semibold">
              {isSignUp ? "ALREADY HAVE ACCOUNT? " : "DON'T HAVE ACCOUNT? "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setStatusMessage(null);
                }}
                className="sketch-circle text-[#2C64AC] hover:text-[#EE523F] transition-colors uppercase font-bold focus:outline-none text-[11px] sm:text-xs"
              >
                {isSignUp ? 'LOGIN' : 'REGISTER'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
