import { Paper } from "@mui/material";
import { LoginForm } from "./form";

const Login = () => {
  return (
    <div className="flex items-center justify-center flex-grow [&>*]:z-0 h-screen w-screen fixed">
      <Paper
        sx={{
          width: "25%",
          height: "50%",
          borderRadius: 4,
          padding: 4,
        }}
      >
        <LoginForm />
      </Paper>
    </div>
  );
};

export default Login;
