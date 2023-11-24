export default async function handler(req, res) {
  // Extract the authorization code from the request body
  const { code } = req.body;

  // Your Dropbox app's client ID and secret
  const CLIENT_ID = "s4ngwjneimiqbs2";
  const CLIENT_SECRET = "n2kfwfull5z25o5";

  // The redirect URI that was used in the initial authorization request
  const REDIRECT_URI = "http://localhost:3000/auth";

  try {
    // Make a POST request to the Dropbox API to exchange the authorization code for an access token
    const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // Constructing the request body as a URL-encoded string
      body: `code=${code}&grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}`,
    });

    // Throw an error if the response from Dropbox API is not OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response containing the access token
    const data = await response.json();

    // Send the access token and refresh token back to the client
    res.status(200).json({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });
  } catch (error) {
    // Log the error and send a server error response to the client
    console.error("Error exchanging code for token:", error);
    res.status(500).json({ message: "Server error" });
  }
}
