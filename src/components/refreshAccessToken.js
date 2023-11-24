const refreshAccessToken = async (refreshToken) => {
  // Your Dropbox app's client ID and secret
  const CLIENT_ID = "s4ngwjneimiqbs2";
  const CLIENT_SECRET = "n2kfwfull5z25o5";

  try {
    // Make a POST request to Dropbox API to refresh the access token
    const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // Using URLSearchParams to encode the body as x-www-form-urlencoded data
      body: new URLSearchParams({
        grant_type: "refresh_token", // Indicating that we want to refresh the token
        refresh_token: refreshToken, // The refresh token obtained from initial authentication
        client_id: CLIENT_ID, // Your app's client ID
        client_secret: CLIENT_SECRET, // Your app's client secret
      }),
    });

    // Throw an error if the response is not successful
    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    // Parse the JSON response to extract the new access token
    const data = await response.json();

    // Store the new access token in localStorage for future requests
    localStorage.setItem("access_token", data.access_token);
  } catch (error) {
    // Log any errors that occur during the refresh process
    console.error("Error refreshing access token:", error);
  }
};

export default refreshAccessToken;
