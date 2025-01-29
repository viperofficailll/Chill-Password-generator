import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Button, Slider, Switch, FormControlLabel } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function generatePassword(length, includeNumbers, includeCharacters) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const characters = "!@#$%^&*()_+[]{}|;:,.<>?";

  let validChars = letters;
  if (includeNumbers) validChars += numbers;
  if (includeCharacters) validChars += characters;

  return Array.from({ length }, () =>
    validChars.charAt(Math.floor(Math.random() * validChars.length))
  ).join("");
}

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeCharacters, setIncludeCharacters] = useState(true);

  useEffect(() => {
    setPassword(generatePassword(length, includeNumbers, includeCharacters));
  }, [length, includeNumbers, includeCharacters]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  };

  return (
   
      <div
  className="flex flex-col min-h-screen p-6 text-white bg-cover bg-center"
  style={{ backgroundImage: "url('/bg.png')" }}
>

    
      
      <motion.h1
        className="text-5xl font-bold mb-6 absolute top-6 left-6 text-white"
        style={{ fontFamily: "'Pacifico', cursive" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        CHILL PASS GENERATOR
      </motion.h1>


      <motion.div
        className="flex justify-start items-center w-full max-w-4xl mt-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-blue-900/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-96 border border-white/30">
          <CardContent className="text-left">
           
            <Typography
              variant="h6"
              className="mb-4 bg-gray-700 p-3 rounded text-lg font-mono text-white select-all"
            >
              {password}
            </Typography>

            
            <Button
              onClick={copyToClipboard}
              variant="contained"
              sx={{ backgroundColor: "#8E44AD", "&:hover": { backgroundColor: "#6C3483" } }}
              className="mb-4"
              startIcon={<ContentCopyIcon />}
            >
              Copy Password
            </Button>

            
            <div className="mb-4">
              <Typography gutterBottom className="text-white">Length: {length}</Typography>
              <Slider
                value={length}
                onChange={(e, newValue) => setLength(newValue)}
                min={6}
                max={20}
                step={1}
                marks
                className="w-full"
                sx={{ color: "#8E44AD" }}
              />
            </div>

           
            <FormControlLabel
              control={<Switch checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />}
              label="Include Numbers"
              className="text-black"
            />
            <FormControlLabel
              control={<Switch checked={includeCharacters} onChange={() => setIncludeCharacters(!includeCharacters)} />}
              label="Include Special Characters"
              className="text-black"
            />
          </CardContent>
        </Card>
      </motion.div>

 
      <ToastContainer />
    </div>
  );
}

export default App;
