import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token"); // from ?token=xyz in the URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error resetting password.");
      }

      setMessage(data.message || "Password reset successful!");

      // Redirect to login page after a short delay (or immediately)
      setTimeout(() => {
        navigate("/login"); 
      }, 2000); 
      // 2-second delay so user can see the success message, 
      // then navigate to /login.

    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2>Reset Password</h2>

        {message ? (
          <p>{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="reset-password-form">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
