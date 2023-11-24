import { Button, useToast } from "@chakra-ui/react";
import { useAuth } from "@/components/context/authContext";

const UploadFile = ({ currentPath, onChange }) => {
  const { authToken } = useAuth(); // Accessing the authentication token
  const toast = useToast(); // Toast is used for showing notifications

  // Function to handle the file upload process
  const uploadFile = async (file) => {
    try {
      // Preparing Dropbox API arguments
      const dropboxArgs = {
        path: `${currentPath}/${encodeURIComponent(file.name)}`,
        mode: "add",
        autorename: true,
        mute: false,
      };

      // Making a POST request to Dropbox API to upload the file
      const response = await fetch(
        "https://content.dropboxapi.com/2/files/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Dropbox-API-Arg": JSON.stringify(dropboxArgs),
            "Content-Type": "application/octet-stream",
          },
          body: file,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error_summary || "Network response was not ok"
        );
      }

      // Handle successful response
      onChange();
    } catch (error) {
      // Handle error
      toast({
        title: "Error uploading file",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file); // Upload the selected file
    }
  };

  // Return a styled button that opens the file selector when clicked
  return (
    <Button
      as="label" // Make the button act as a file input label
      bg="#3d67ff"
      color="white"
      _hover={{ bg: "#3153cc" }}
      w="250px"
      h="40px"
    >
      Upload File
      <input type="file" hidden onChange={handleFileChange} />
    </Button>
  );
};

export default UploadFile;
