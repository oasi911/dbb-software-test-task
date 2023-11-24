import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useAuth } from "@/components/context/authContext";
import refreshAccessToken from "@/components/refreshAccessToken";
import Main from "@/components/layout/Main";

export default function Home() {
  // State to store files fetched from Dropbo
  const [files, setFiles] = useState([]);

  // State to check if the component has mounted on the client
  const [isClient, setIsClient] = useState(false);

  // Auth context to manage authentication tokens
  const { authToken, refreshToken, updateToken } = useAuth();

  // Function to sort files: first folders, then other files, both alphabetically
  const sortFiles = (files) => {
    const folders = files.filter((file) => file[".tag"] === "folder");
    const otherFiles = files.filter((file) => file[".tag"] !== "folder");

    folders.sort((a, b) => a.name.localeCompare(b.name));
    otherFiles.sort((a, b) => a.name.localeCompare(b.name));

    return [...folders, ...otherFiles];
  };

  // Function to fetch files from Dropbox
  const fetchFiles = async () => {
    try {
      const response = await fetch(
        "https://api.dropboxapi.com/2/files/list_folder",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: "",
          }),
        }
      );

      // Handle expired access token
      if (!response.ok && response.status === 401) {
        if (refreshToken) {
          // Attempt to refresh the access token
          const newToken = await refreshAccessToken(refreshToken);
          if (newToken) {
            updateToken(newToken, refreshToken); // Update tokens in context
            return fetchFiles(); // Retry fetching files after updating the token
          }
        }
      }

      const data = await response.json();
      setFiles(sortFiles(data.entries)); // Update state with sorted files
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // useEffect to fetch files on component mount if authToken is available
  useEffect(() => {
    if (authToken) {
      fetchFiles();
    }
    setIsClient(true);
  }, [authToken]); // Depend on authToken to refetch files if it change

  const onChange = () => {
    fetchFiles();
  };

  // Render a loading text until the client-side script runs
  if (!isClient) {
    return <Text>Loading...</Text>;
  }

  return (
    <Main title={"Main"} files={files} currentPath={""} onChange={onChange} />
  );
}
