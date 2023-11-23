import { Flex } from "@chakra-ui/react";
import FileItem from "./FileItem.js";

const FileList = ({ files }) => (
  <>
    <Flex gap="15px" flexWrap="wrap" justifyContent="space-between">
      {files.map((file) => (
        <FileItem key={file.id} file={file} />
      ))}
    </Flex>
  </>
);

export default FileList;
