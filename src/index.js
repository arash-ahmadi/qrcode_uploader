import React from "react";
import { theme } from './GlobalStyles.js';
import ImageUploading from "react-images-uploading";
import { Box, Button, Typography, CircularProgress, ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client';
import useStyles from './indexStyles.js'
import axios from 'axios'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import "./App.css";

function App() {
  const classes = useStyles();
  document.body.style = 'background: #f3f3f3;';
  const [images, setImages] = React.useState([]);
  const [uploaded, setUploaded] = React.useState(0)
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
    console.log(images[0]);
  };
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let authToken = params.authToken
  const onUpload = async () => {
    setUploaded(1)
    const image_string = images[0].data_url;
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'api-token':
              'd7b4d158b7eff08726a27584dfef336081f35d936858d686e5732d2c014748cf',
            Authorization: `Bearer ${authToken}`,
          },
        };
        await axios.post(
          'https://api.viubox.com:8000/uploadSelfie',
          {
            imageString: image_string
          },
          config
        );
        setTimeout(() => {
          setUploaded(2);
          setImages([])
        }, 1500);
      } catch (error) {
        console.log(error)
        setUploaded(-1)
      }
    };
  
  return (
    <div className="root">
    <ThemeProvider theme={theme}>
      <Box className={classes.page}>
        <ImageUploading
          maxFileSize={5*1000000}
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg", "jpeg", "png"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
            errors
          }) => (
            <>
            <Box className={classes.twobuttons}>
                {(images.length <= 0 && uploaded !== 2)
                && (
                    <Button
                          
                      variant="contained"
                      style={isDragging ? { color: "red" } : null}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Add your Selfie
                    </Button>
                )}
                  {/* {(images.length <= 0 && uploaded === 2)
                    && (
                      <Button

                        variant="contained"
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Change your Selfie
                      </Button>
                    )} */}
                {images.length > 0 && (
                    <Button
                      variant="contained"
                      onClick={onUpload}
                    >
                      Upload
                    </Button>
                )}
                {uploaded === 1 && (
                  <CircularProgress sx={{marginLeft: '5px'}}/>
                )}
                {uploaded === 2 && (
                  <CheckIcon sx={{marginLeft: '5px'}}/>
                )}
                {uploaded === -1 && (
                  <ClearIcon sx={{marginLeft: '5px'}}/>
                )}

            </Box>

            
              {uploaded !== 2 && (imageList.map((image, index) => (
                <Box key={index} className={classes.imageItem}>
                  <img src={image.data_url} alt="" width="100%" />
                  <Box className={classes.imageButtonWrapper}>
                    <Button sx={{marginRight: '5px'}} variant="outlined" onClick={() => onImageUpdate(index)}>RETRY</Button>
                    <Button sx={{ marginLeft: '5px' }} variant="outlined" onClick={() => onImageRemove(index)}>REMOVE</Button>
                  </Box>
                </Box>
              )))}
            {/* <Box className={classes.textWrapper}> */}
              {uploaded === 2 && (
                    <Typography marginBottom='40px'> Your image has been uploaded successfully, you can safely go back to the ViuBox SYZ app</Typography>
              )}
              {errors && <div>
                {errors.maxNumber && <Typography>Please upload only one image</Typography>}
                {errors.acceptType && <Typography>Your selected file type is not allowed</Typography>}
                {errors.maxFileSize && <Typography>Selected file size should be less than 2MB</Typography>}
                {/* {errors.resolution && <Typography>Selected file is not match your desired resolution</Typography>} */}
              </div>}
            {/* </Box> */}
            </>)}
          
            
        </ImageUploading>
        
      </Box>
    </ThemeProvider>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App/>);