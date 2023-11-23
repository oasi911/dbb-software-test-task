import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../components/context/authContext";

const AuthPage = () => {
  const router = useRouter();
  const { authToken, updateToken } = useAuth();

  useEffect(() => {
    if (authToken) {
      router.push("/");
    }
  }, [authToken, router]);

  useEffect(() => {
    const code = router.query.code;
    if (code && !authToken) {
      fetchToken(code);
    }
  }, [router.query.code, authToken, updateToken]);

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

      if (data.accessToken) {
        updateToken(data.accessToken, data.refreshToken || null);
      }
    } catch (error) {
      console.error("Error during token exchange:", error);
    }
  };

  return <div>Authorization...</div>;
};

export default AuthPage;
