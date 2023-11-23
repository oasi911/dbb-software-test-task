import { Flex, Text, Tooltip } from "@chakra-ui/react";

const FileText = ({ file }) => (
  <Flex height="40px" width="100%" justifyContent="center" alignItems="center">
    {file.name.length > 18 ? (
      <Tooltip label={file.name}>
        <Text>{`${file.name.slice(0, 8)}...${file.name.slice(-7)}`}</Text>
      </Tooltip>
    ) : (
      <Text>{file.name}</Text>
    )}
  </Flex>
);

export default FileText;
