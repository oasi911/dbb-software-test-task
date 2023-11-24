import { Button, useToast } from "@chakra-ui/react";
import { useAuth } from "@/components/context/authContext";

const UploadFile = ({ currentPath, onChange }) => {
  const { authToken } = useAuth();
  const toast = useToast();

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://content.dropboxapi.com/2/files/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Dropbox-API-Arg": JSON.stringify({
              path: `${currentPath}/${file.name}`,
              mode: "add",
              autorename: true,
              mute: false,
            }),
            "Content-Type": "application/octet-stream",
          },
          body: file,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onChange();
    } catch (error) {
      toast({
        title: "Error uploading file",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <Button
      as="label"
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
