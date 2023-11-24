import { Flex, Text } from "@chakra-ui/react";
import FileItem from "./FileItem.js";

const FileList = ({ files, onChange }) => (
  <>
    {
      // Check if the files array is empty
      files.length === 0 ? (
        // If empty, display a message indicating the folder is empty
        <Text mt="30px">This folder is empty</Text>
      ) : (
        // If there are files, render a Flex container for the file items
        <Flex
          mt="30px"
          gap="15px"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {
            // Map through each file in the files array
            files.map((file) => (
              // Render a FileItem component for each file
              <FileItem key={file.id} file={file} onChange={onChange} />
            ))
          }
        </Flex>
      )
    }
  </>
);

export default FileList;
