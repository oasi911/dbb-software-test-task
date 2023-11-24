import { MenuItem, useToast } from "@chakra-ui/react";
import { useAuth } from "@/components/context/authContext";

const DeleteMenuItem = ({ filePath, onChange }) => {
  const { authToken } = useAuth();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "https://api.dropboxapi.com/2/files/delete_v2",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: filePath,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      toast({
        title: "Item deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      onChange();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return <MenuItem onClick={handleDelete}>Delete</MenuItem>;
};

export default DeleteMenuItem;
