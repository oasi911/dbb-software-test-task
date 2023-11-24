import { Flex, Text } from "@chakra-ui/react";
import FileItem from "./FileItem.js";

const FileList = ({ files }) => (
  <>
    {files.length === 0 ? (
      <Text mt="30px">This folder is empty</Text>
    ) : (
      <Flex mt="30px" gap="15px" flexWrap="wrap" justifyContent="space-between">
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </Flex>
    )}
  </>
);

export default FileList;
