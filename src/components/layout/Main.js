import Head from "next/head";
import { Container } from "@chakra-ui/layout";
import { Button, Flex, Text } from "@chakra-ui/react";
import CreateFolder from "../CreateFolder";
import { useAuth } from "../context/authContext";
import FileList from "../FileList";

const Main = ({ title, files, onFolderCreated, currentPath }) => {
  const { authToken } = useAuth();

  const handleLogin = () => {
    const CLIENT_ID = "s4ngwjneimiqbs2";
    const REDIRECT_URI = "http://localhost:3000/auth";
    window.location.href = `https://www.dropbox.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code`;
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container maxW="container.lg">
        {!authToken ? (
          <Flex
            width="100%"
            height="100vh"
            alignItems="center"
            justifyContent="center"
            direction="column"
            gap="25px"
          >
            <Text>Please login with Dropbox to continue.</Text>
            <Button align="center" onClick={handleLogin}>
              Login with Dropbox
            </Button>
          </Flex>
        ) : (
          <>
            <Flex>
              <CreateFolder
                onFolderCreated={onFolderCreated}
                currentPath={currentPath}
              />
            </Flex>
            <FileList files={files} />
          </>
        )}
      </Container>
    </>
  );
};

export default Main;

// {
//   !authToken ? (
//     <Flex
//       width="100%"
//       height="100vh"
//       alignItems="center"
//       justifyContent="center"
//       direction="column"
//       gap="25px"
//     >
//       <Text>Please login with Dropbox to continue.</Text>
//       <Button align="center" onClick={handleLogin}>
//         Login with Dropbox
//       </Button>
//     </Flex>
//   ) : (
//     <>
//       <Flex>
//         <CreateFolder
//           onFolderCreated={onFolderCreated}
//           currentPath={""}
//         />
//       </Flex>
//       <FileList files={files} />
//     </>
//   );
// }
