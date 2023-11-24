import { Flex, Text, Tooltip } from "@chakra-ui/react";

const FileText = ({ file }) => (
  // Flex container to align the text in the center
  <Flex height="40px" width="100%" justifyContent="center" alignItems="center">
    {
      // Check if the file name is longer than 14 characters
      file.name.length > 14 ? (
        // If it is, wrap the text in a tooltip
        <Tooltip label={file.name}>
          {/* 
            Display the text with the first 6 and last 6 characters,
            omitting the middle part with ellipsis for brevity
          */}
          <Text>{`${file.name.slice(0, 6)}...${file.name.slice(-6)}`}</Text>
        </Tooltip>
      ) : (
        // If the file name is short, display it in full
        <Text>{file.name}</Text>
      )
    }
  </Flex>
);

export default FileText;
