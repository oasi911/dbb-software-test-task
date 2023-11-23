// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/components/context/authContext";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#cccccc",
      },
    },
  },
});

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider initialToken={pageProps.token}>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
