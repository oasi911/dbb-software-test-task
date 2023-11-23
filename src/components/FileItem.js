import { Flex, Text, Tooltip } from "@chakra-ui/react";
import Thumbnail from "./Thumbnail";
import { useRouter } from "next/router";
import FileText from "./FileText";

const FileItem = ({ file }) => {
  const router = useRouter();

  const handleFolderClick = () => {
    if (file[".tag"] === "folder") {
      const newPath = file.path_lower.startsWith("/")
        ? file.path_lower
        : `/${file.path_lower}`;
      router.push(`${newPath}`);
    }
  };

  return (
    <Flex direction="column" width="150px" height="190px" alignItems="center">
      <Flex
        onClick={handleFolderClick}
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
      <FileText file={file} />
    </Flex>
  );
};

export default FileItem;
