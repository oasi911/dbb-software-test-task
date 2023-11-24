import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/components/context/authContext";
import Main from "@/components/layout/Main";
import { Text } from "@chakra-ui/react";

const FolderContent = () => {
  const [folderContent, setFolderContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const { folderPath } = useRouter().query;
  const { authToken } = useAuth();

  const currentPath = Array.isArray(folderPath)
    ? "/" + folderPath.join("/")
    : "";

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
      setFolderContent(data.entries);
    } catch (error) {
      console.error("Error fetching folder content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken && folderPath) {
      fetchFolderContent(currentPath);
    }
  }, [folderPath, authToken, currentPath]);

  const onChange = () => {
    fetchFolderContent(currentPath);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Main
      title={folderPath}
      onChange={onChange}
      currentPath={currentPath}
      files={folderContent}
    />
  );
};

export default FolderContent;
