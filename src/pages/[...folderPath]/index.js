import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/context/authContext";
import Main from "@/components/layout/Main";
import { Text } from "@chakra-ui/react";

const FolderContent = () => {
  // State to store the content of the current folder
  const [folderContent, setFolderContent] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // Using Next.js router to get the folder path from the URL
  const { folderPath } = useRouter().query;
  // State to track if the component has mounted on the client
  const [isClient, setIsClient] = useState(false);
  // Accessing the authentication token from the auth context
  const { authToken } = useAuth();

  // Constructing the current path from the folderPath array
  const currentPath = Array.isArray(folderPath)
    ? "/" + folderPath.join("/")
    : "";

  // Function to fetch the content of the current folder from Dropbox
  const fetchFolderContent = async (path) => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.dropboxapi.com/2/files/list_folder",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFolderContent(data.entries); // Update state with the folder's content
    } catch (error) {
      console.error("Error fetching folder content:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of outcome
    }
  };

  // Effect to fetch folder content when the path or auth token changes
  useEffect(() => {
    setIsClient(true);
    if (authToken && folderPath) {
      fetchFolderContent(currentPath);
    }
  }, [folderPath, authToken, currentPath]);

  // Function to refresh the folder content
  const onChangeFolder = () => {
    fetchFolderContent(currentPath);
  };

  // Show loading text when the content is being fetched
  if (loading || !isClient) {
    return <Text>Loading...</Text>;
  }

  // Render the Main component with the folder's content
  return (
    <Main
      title={folderPath}
      onChange={onChangeFolder}
      currentPath={currentPath}
      files={folderContent}
    />
  );
};

export default FolderContent;
