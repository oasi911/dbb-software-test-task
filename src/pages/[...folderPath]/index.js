import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Container, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "@/components/context/authContext";
import FileList from "@/components/FileList";

const FolderContent = () => {
  const [folderContent, setFolderContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const { folderPath } = useRouter().query;
  const { authToken } = useAuth();

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
      const path = Array.isArray(folderPath) ? "/" + folderPath.join("/") : "";
      fetchFolderContent(path);
    }
  }, [folderPath, authToken]);

  return (
    <>
      <Head>
        <title>{folderPath}</title>
        <meta name="description" content={`Viewing folder: ${folderPath}`} />
      </Head>
      <Container as="main" maxW="container.lg">
        <Heading>Folder: {folderPath}</Heading>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FileList authToken={authToken} files={folderContent} />
        )}
      </Container>
    </>
  );
};

export default FolderContent;
