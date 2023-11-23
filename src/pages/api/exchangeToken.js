export default async function handler(req, res) {
  const { code } = req.body;
  const CLIENT_ID = "s4ngwjneimiqbs2";
  const CLIENT_SECRET = "n2kfwfull5z25o5";
  const REDIRECT_URI = "http://localhost:3000/auth";

  try {
    const response = await fetch("https://api.dropboxapi.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `code=${code}&grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(500).json({ message: "Server error" });
  }
}
