import { Flex } from "@chakra-ui/react";
import Thumbnail from "./Thumbnail";
import { useRouter } from "next/router";
import FileText from "./FileText";
import FileMenu from "./FileMenu";
import { useAuth } from "./context/authContext";

const FileItem = ({ file, onChange }) => {
  const router = useRouter();
  const { authToken } = useAuth();

  // Function to get a temporary link for a file from Dropbox
  const getTemporaryLink = async (filePath) => {
    const response = await fetch(
      "https://api.dropboxapi.com/2/files/get_temporary_link",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: filePath }),
      }
    );

    const data = await response.json();
    return data.link;
  };

  // Event handler for clicking on a file item
  const handleFileClick = async () => {
    if (file[".tag"] === "file") {
      try {
        const link = await getTemporaryLink(file.path_lower, authToken);
        window.open(link, "_blank"); // Opens the file in a new tab
      } catch (error) {
        console.error("Error opening file:", error);
      }
    }
  };

  // Event handler for clicking on a folder item
  const handleFolderClick = () => {
    if (file[".tag"] === "folder") {
      const newPath = file.path_lower.startsWith("/")
        ? file.path_lower
        : `/${file.path_lower}`;
      router.push(`${newPath}`); // Navigates to the folder's path
    }
  };

  // Component layout
  return (
    <Flex direction="column" width="150px" height="190px" alignItems="center">
      <Flex
        onClick={file[".tag"] === "file" ? handleFileClick : handleFolderClick}
        cursor="pointer"
        boxSize="150px"
        alignItems="center"
        justifyContent="center"
        bg="#00000030"
        _hover={{
          bg: "#00000050",
        }}
      >
        <Thumbnail
          path={file.path_lower}
          isFolder={file[".tag"] === "folder"}
        />
      </Flex>
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        <FileText file={file} />
        <FileMenu file={file} onChange={onChange} />
      </Flex>
    </Flex>
  );
};

export default FileItem;
