import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useAuth } from "@/components/context/authContext";
import refreshAccessToken from "@/components/refreshAccessToken";
import Main from "@/components/layout/Main";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const { authToken, refreshToken, updateToken } = useAuth();

  const sortFiles = (files) => {
    const folders = files.filter((file) => file[".tag"] === "folder");
    const otherFiles = files.filter((file) => file[".tag"] !== "folder");

    folders.sort((a, b) => a.name.localeCompare(b.name));
    otherFiles.sort((a, b) => a.name.localeCompare(b.name));

    return [...folders, ...otherFiles];
  };

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

      if (!response.ok && response.status === 401) {
        if (refreshToken) {
          const newToken = await refreshAccessToken(refreshToken);
          if (newToken) {
            updateToken(newToken, refreshToken);
            return fetchFiles();
          }
        }
      }

      const data = await response.json();

      setFiles(sortFiles(data.entries));
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchFiles();
    }
    setIsClient(true);
  }, [authToken]);

  const onChange = () => {
    fetchFiles();
  };

  if (!isClient) {
    return <Text>Loading...</Text>;
  }

  return (
    <Main title={"Main"} files={files} currentPath={""} onChange={onChange} />
  );
}
