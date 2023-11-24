import { useState, useEffect } from "react";
import { CircularProgress } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useAuth } from "./context/authContext";

const Thumbnail = ({ path, isFolder }) => {
  // State for the thumbnail URL and loading status
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Auth context for access token
  const { authToken } = useAuth();

  // Function to fetch the thumbnail image from Dropbox
  async function fetchThumbnail(path, authToken) {
    try {
      const response = await fetch(
        "https://content.dropboxapi.com/2/files/get_thumbnail",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Dropbox-API-Arg": JSON.stringify({
              path: path,
              format: "jpeg",
              size: "w128h128",
            }),
          },
        }
      );

      // Fallback to a default image if fetching fails
      if (!response.ok) {
        return "/file.png";
      }

      // Create a URL from the response blob (image data)
      return URL.createObjectURL(await response.blob());
    } catch (error) {
      console.error("Error fetching thumbnail:", error);
      return "/file.png";
    }
  }

  // Effect to fetch the thumbnail on component mount or update
  useEffect(() => {
    if (isFolder) {
      // If it's a folder, use a default folder icon
      setThumbnailUrl("/folder.png");
      setIsLoading(false);
    } else {
      // Fetch the thumbnail from Dropbox
      fetchThumbnail(path, authToken)
        .then((url) => {
          setThumbnailUrl(url);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching thumbnail:", error);
          setIsLoading(false);
        });
    }
  }, [path, authToken, isFolder]);

  // Show a loading spinner while the thumbnail is being fetched
  if (isLoading) {
    return <CircularProgress isIndeterminate color="green" />;
  }

  // Render the thumbnail image
  return <Image src={thumbnailUrl} alt="Thumbnail" />;
};

export default Thumbnail;
