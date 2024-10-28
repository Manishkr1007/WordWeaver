import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import authService from "../appwrite/auth";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await authService.resetPasswordWithToken(userId, secret, newPassword);
      setSuccess("Your password has been reset successfully!");
      setNewPassword("");
    } catch (err) {
      setError("Error resetting password. Please try again.");
      console.error("Reset Password Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Your Password
        </h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md font-semibold text-white ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } transition duration-300`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          {error && <p className="mt-2 text-red-600">{error}</p>}
          {success && <p className="mt-2 text-green-600">{success}</p>}
        </form>
        <p className="mt-4 text-center">
          Remember your password?
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
