import { useState } from "react";
import { Input, IconButton, useToast, Button, Flex } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "./context/authContext";

const CreateFolder = ({ onChange, currentPath }) => {
  // State to control the folder creation UI
  const [isCreating, setIsCreating] = useState(false);
  // State to store the new folder name
  const [folderName, setFolderName] = useState("");
  // Auth context to access the authentication token
  const { authToken } = useAuth();
  // Chakra UI's toast for showing messages
  const toast = useToast();

  const createFolder = async () => {
    // Constructing the full path for the new folder
    const fullPath = `${currentPath}/${folderName.trim()}`.replace(
      /\/\/+/g, // Replacing double slashes with a single slash
      "/"
    );
    const validNameRegex = /^[A-Za-z0-9]+$/;
    // Validate folder name to ensure it's not empty
    if (!folderName.trim() || !validNameRegex.test(folderName.trim())) {
      toast({
        title: "Invalid Folder Name",
        description:
          "Folder name must consist of English letters or digits only.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Making API call to create a new folder in Dropbox
      const response = await fetch(
        "https://api.dropboxapi.com/2/files/create_folder_v2",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`, // Using authToken for Dropbox API authorization
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: fullPath, // The path where the folder will be created
            autorename: true, // Auto-renaming in case of name conflicts
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Triggering the onChange callback to refresh the folder content
      onChange();
      // Resetting state to close the creation UI
      setIsCreating(false);
      setFolderName("");
    } catch (error) {
      // Showing error message in case of failure
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
    <>
      {isCreating ? (
        <Flex w="250px" gap="5px">
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
        </Flex>
      ) : (
        <Button w="250px" onClick={() => setIsCreating(true)}>
          Create New Folder
        </Button>
      )}
    </>
  );
};

export default CreateFolder;
