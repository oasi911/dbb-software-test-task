import { useState, useEffect } from "react";
import { CircularProgress } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useAuth } from "./context/authContext";

export async function fetchThumbnail(path, accessToken) {
  try {
    const response = await fetch(
      "https://content.dropboxapi.com/2/files/get_thumbnail",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Dropbox-API-Arg": JSON.stringify({
            path: path,
            format: "jpeg",
            size: "w128h128",
          }),
        },
      }
    );

    if (!response.ok) {
      return "/file.png";
    }

    return URL.createObjectURL(await response.blob());
  } catch (error) {
    console.error("Error fetching thumbnail:", error);
    return "/file.png";
  }
}

const Thumbnail = ({ path, isFolder }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authToken } = useAuth();

  useEffect(() => {
    if (isFolder) {
      setThumbnailUrl("/folder.png");
      setIsLoading(false);
    } else {
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

  if (isLoading) {
    return <CircularProgress isIndeterminate color="green" />;
  }

  return <Image src={thumbnailUrl} alt="Thumbnail" />;
};

export default Thumbnail;
