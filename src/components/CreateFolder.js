import { useState } from "react";
import { Flex, Input, IconButton, useToast, Button } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "./context/authContext";

const CreateFolder = ({ onFolderCreated, currentPath }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { authToken } = useAuth();
  const toast = useToast();

  const createFolder = async () => {
    const fullPath = `${currentPath}/${folderName.trim()}`.replace(
      /\/\/+/g,
      "/"
    );

    if (!folderName.trim()) {
      toast({
        title: "Error",
        description: "Folder name cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(
        "https://api.dropboxapi.com/2/files/create_folder_v2",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: fullPath,
            autorename: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onFolderCreated();
      setIsCreating(false);
      setFolderName("");
    } catch (error) {
      toast({
        title: "Error creating folder",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const cancelCreation = () => {
    setIsCreating(false);
    setFolderName("");
  };

  return (
    <Flex
      w="250px"
      h="100px"
      alignItems="center"
      justifyContent="center"
      gap="5px"
    >
      {isCreating ? (
        <>
          <Input
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="New folder name"
            size="md"
          />
          <IconButton
            aria-label="Create folder"
            icon={<CheckIcon />}
            onClick={createFolder}
          />
          <IconButton
            aria-label="Cancel create folder"
            icon={<CloseIcon />}
            onClick={cancelCreation}
          />
        </>
      ) : (
        <Button w="100%" onClick={() => setIsCreating(true)}>
          Create New Folder
        </Button>
      )}
    </Flex>
  );
};

export default CreateFolder;
