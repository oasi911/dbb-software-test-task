import { MenuItem, useToast } from "@chakra-ui/react";
import { useAuth } from "@/components/context/authContext";

const DeleteMenuItem = ({ filePath, onChange }) => {
  // useAuth hook to access the authentication token
  const { authToken } = useAuth();
  // useToast hook from Chakra UI for showing feedback messages
  const toast = useToast();

  // Function to handle the deletion of an item
  const handleDelete = async () => {
    try {
      // Making a POST request to Dropbox API to delete the file at filePath
      const response = await fetch(
        "https://api.dropboxapi.com/2/files/delete_v2",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`, // Use authToken for authorization
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: filePath, // Path of the file to be deleted
          }),
        }
      );

      // If response is not OK, throw an error
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Show success toast message on successful deletion
      toast({
        title: "Item deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Invoke onChange callback to update the parent component's state
      onChange();
    } catch (error) {
      // Show error toast message in case of failure
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Return a menu item that, when clicked, triggers the handleDelete function
  return <MenuItem onClick={handleDelete}>Delete</MenuItem>;
};

export default DeleteMenuItem;
