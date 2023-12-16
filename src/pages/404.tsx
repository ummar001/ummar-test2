import AnimationData from "@/common/assets/404.json"; // Replace with your Lottie animation JSON file
import { Box, Button, Typography } from "@mui/material";
import Lottie from "lottie-react"; // Correct import for Lottie
import dynamic from "next/dynamic";

const MyLottieComponent = dynamic(() => import("lottie-web"), {
  ssr: false, // This ensures that the component is only loaded on the client side
});

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f2f2f2",
      }}
    >
      <MyLottieComponent
        animationData={AnimationData}
        style={{
          width: "400px",
        }}
      />

      <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        404 Error: Brew-tifully Lost!
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Looks like the page took a coffee break and decided to disappear like a
        hidden coffee bean. Please refill your cup and try again!
      </Typography>

      <Button variant="contained" color="primary" href="/">
        Your lost, go home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
