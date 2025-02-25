import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error sending reset email.");
      }
      setMessage(data.message || "Reset link sent to your email.");
    } catch (error) {
      console.error("Error requesting password reset:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        {message ? (
          <p>{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <label htmlFor="email">Enter your account email</label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
