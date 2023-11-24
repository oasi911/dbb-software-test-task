import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../components/context/authContext";

const AuthPage = () => {
  const router = useRouter();
  const { authToken, updateToken } = useAuth();

  // Redirect to the home page if already authenticated
  useEffect(() => {
    if (authToken) {
      router.push("/");
    }
  }, [authToken, router]);

  // Effect to handle the OAuth callback
  useEffect(() => {
    const code = router.query.code;
    // Fetch new token if we have a code and no authToken
    if (code && !authToken) {
      fetchToken(code);
    }
  }, [router.query.code, authToken, updateToken]);

  // Function to exchange the authorization code for an access token
  const fetchToken = async (code) => {
    try {
      const response = await fetch("/api/exchangeToken", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // Update the token in context if received
      if (data.accessToken) {
        updateToken(data.accessToken, data.refreshToken || null);
      }
    } catch (error) {
      // Log any errors during the token exchange process
      console.error("Error during token exchange:", error);
    }
  };

  return <div>Authorization...</div>;
};

export default AuthPage;
