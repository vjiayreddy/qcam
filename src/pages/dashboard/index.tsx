/* eslint-disable react/jsx-no-undef */
import {
  styled,
  Box,
  Typography,
  Grid,
  InputBase,
  InputLabel,
  Button,
  Checkbox,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getApiData } from "../../apiService";
import Logo from "../../cardinal.png";
import LoadingIcon from "../../synchronize.gif";
import { useInterval } from "../../useInterval";
import 'reactjs-popup/dist/index.css';
import { SubmitHandler, useForm } from "react-hook-form";
import DialogBox from "../side-components/dialog";
import { FormValues } from "../../data";
import { getApiData2 } from "../../apiService2";
import { io } from "socket.io-client";
import axios from "axios";
import AlertBox from "../side-components/alert";


const StyledMainContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  backgroundColor: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
}));
const StyledAppBar = styled(Box)(({ theme }) => ({
  height: "70px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: 30,
  paddingRight: 30,
}));

const StyledContentBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  display: "flex",
  height: `calc(100vh - 70px)`,
}));

const StyledLeftSideBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const StyledRightSideBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

const StyledFormBox = styled(Box)(({ theme }) => ({}));
const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 800,
  marginBottom: 10,
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: "100%",
  padding: 5,
  height: 35,
  borderRadius: 5,
  fontSize: 14,
}));

const StyledHeadingSection = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderTop: `1px solid ${theme.palette.divider}`,
  fontWeight: 800,
  fontSize: 14,
}));

const StyledTableSection = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowX: "hidden",
  overflowY: "auto",
}));
const StyledActionsSection = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  height: "50px",
  display: "flex",
  alignItems: "center",
}));
const StyledRightSectionContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  height: "80%",
}));

const StyledLiveViewVideo = styled(Box)(({ theme }) => ({
  flex: 1.2,
  position: "relative",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "top center",
}));

const StyledLiveIndication = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 10,
  left: 10,
  padding: 5,
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  fontSize: 12,
  letterSpacing: 1,
}));

const StyledCapturedImage = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.grey[100],
  overflowX: "hidden",
  overflowY: "auto",
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 32,
}));

const StyledLeftSideSectionFooter = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  padding: 10,
}));


// const data = [
//   {
//     barcode: "(12)23456789456",
//     product: "Flecanide Acelete Tab",
//     ILPN: "(12)23456789456",
//   },
//   {
//     barcode: "(12)23456789456",
//     product: "Flecanide Acelete Tab",
//     ILPN: "(12)23456789456",
//   },
//   {
//     barcode: "(12)23456789456",
//     product: "Flecanide Acelete Tab",
//     ILPN: "(12)23456789456",
//   },
// ];

const socket = io("http://localhost:8081/");
const DashboardPage = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    mode: "onBlur"
  });
  const [imageBase64, setImageBase64] : any = useState("");
  const [isAlertOpen, setIsAlertOpen] : any = useState(false);

  // Dialog Props
  const [openDialog, setOpenDialog] : any = useState(false);
  const [dialogtitle, setDialogtitle] : any = useState("");
  const [dialogText, setDialogText] : any = useState("");

  // Alert Props
  const [openAlertBox, setOpenAlertBox] : any = useState(false);
  const [alertTitle, setAlertTitle] : any = useState("");
  const [alertType, setAlertType] : any = useState("success");


  const [scannedData, setScannedData] : any = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const host = "http://localhost:8081";

  const onFormSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setDialogtitle("Success")
    setDialogText("Successfully submitted to EAI!!")
    setOpenDialog(true)
  }

  const onErrors = (error: any) => {
    console.log(error);
    
    setDialogtitle("Error")
    setDialogText("Something went wrong!!", error?.message)
    setOpenDialog(true)
  }
  const checkBox = (scanStatus: string) => {
    return scanStatus === "DETECTED"
  }
  const requiredTrue = () => true
  const isScanAgained = useMemo(() => {
    if(scannedData.scanAgainStatus === "DETECTED") {
      setOpenAlertBox(true)
      setAlertTitle("Scan Again done Successfully!!")
    }
    return () => null
  }, [scannedData.scanAgainStatus])
  useInterval(() => {
    getApiData(`${host}/getDetectedData`, setScannedData, setIsDataLoading);
    isScanAgained()
    
    // getApiData(
    //   `${usedHost}/getLatestDetectedImage`,
    //   setImageData,
    //   setIsDataLoading
    // );
  }, 5000);


  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected to socket!!");
    });

    socket.on('disconnect', () => {
      console.log("disconnected to socket!!");
    });
    socket.on('message', (data) => {
      console.log("data", data);
      
      setImageBase64("data:image/jpeg;base64,"+data)
      
    })

    socket.on('handleError', (error) => {
      const { errorMessage } = error
      setOpenAlertBox(false)
      setAlertTitle(errorMessage)
      setAlertType("error")
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, [])
 
  const getData = async()=>{
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
}
  const handleClick = () => {
    getApiData2(`${host}/scan-again?pid=${scannedData.pid}`,)
  }
  const handleClick1 = () => {
    socket.emit("message", "Message from server")
  }
  return (
    <StyledMainContainer>
      {/* <Box sx={{ width: '100%' }}>
      <Collapse in={isAlertOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Scan Again done Successfully!!
        </Alert>
      </Collapse>
    </Box> */}
      <StyledAppBar>
        <Typography variant="h6">Qcam Exception Scan Results</Typography>
        <img alt="logo" width="150px" src={Logo} />
      </StyledAppBar>
      <StyledContentBox>
        <form onSubmit={ handleSubmit(onFormSubmit, onErrors) }>
        <StyledLeftSideBox>
          <StyledFormBox pl={4} pt={2} pb={2} pr={4}>
            <Grid container spacing={2}>
              <Grid item md={6} lg={6} sm={6} xl={6}>
                <StyledInputLabel>Business Unit</StyledInputLabel>
                <StyledInputBase required={requiredTrue()} {...register('businessUnit', {required: "Business Unit is required", minLength: 3})} placeholder="Business Unit" />
              </Grid>
              <Grid item md={6} lg={6} sm={6} xl={6}>
                <StyledInputLabel>Site</StyledInputLabel>
                <StyledInputBase required={requiredTrue()} {...register('site', { required: "Site value is required" })} placeholder="Site" />
              </Grid>
              <Grid item xs={12}>
                <StyledInputLabel>Business Process</StyledInputLabel>
                <StyledInputBase required={requiredTrue()} {...register('businessProcess', {required: "Business Process is required"})} placeholder="Business Process" />
              </Grid>
            </Grid>
          </StyledFormBox>
          <StyledHeadingSection pl={4} pt={1} pb={1}>
            Scan Results
          </StyledHeadingSection>
          <StyledTableSection>
            <table style={{ width: "100%" }}>
              <thead>
                <tr className="liteGray">
                  <th style={{ paddingLeft: "32px" }}>Scanned</th>
                  <th>Barcode</th>
                  <th>Product</th>
                  <th>ILPN</th>
                </tr>
              </thead>
              <tbody>
                {scannedData?.barcodeData?.map((item: any, index: any) => (
                  <tr key={index}>
                    <td style={{ paddingLeft: "32px" }}>
                      <Checkbox checked={checkBox(item.scan_status)} />
                    </td>
                    <td>{item.barcode}</td>
                    <td>{item.item_name ? item.item_name : "Anonaymous"}</td>
                    <td>{item.ilpn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </StyledTableSection>
          {isDataLoading && (
          <StyledLeftSideSectionFooter>
            <Box>
              <img width={20} src={LoadingIcon} alt="loading_icon" />
            </Box>
            <Box ml={1} mb={0.5}>
              <Typography sx={{ fontWeight: "bold" }} variant="body2">
                Fetching...
              </Typography>
            </Box>
          </StyledLeftSideSectionFooter>
        )}
        <DialogBox  openDialog={openDialog} setOpenDialog={setOpenDialog}  text= {dialogText} title= {dialogtitle}></DialogBox>
        <AlertBox  openAlertBox={openAlertBox} setOpenAlertBox={setOpenAlertBox}  title= {alertTitle} alertType= {alertType}></AlertBox>

          <StyledActionsSection pl={4} pt={2} pb={2} pr={4}>
            <Box flexGrow={1}>
              <Typography sx={{ fontSize: 15 }} variant="h6">
                Action On The Scanned Items
              </Typography>
            </Box>
            <Box mr={1}>
              <Button type="submit" size="small" variant="contained">
                Submit
              </Button>
            </Box>
            <Button size="small" color="error" variant="contained" onClick={handleClick}>
              Scan Again
            </Button>
          </StyledActionsSection>
        </StyledLeftSideBox>
        </form>
        <StyledRightSideBox>
          <StyledHeadingSection
            sx={{ borderTop: "none", textAlign: "right" }}
            pr={4}
            pt={1}
            pb={1}
          >
            Live View
          </StyledHeadingSection>
          <StyledRightSectionContent>
            <StyledLiveViewVideo sx={{ backgroundImage: `url(data:image/jpeg;base64,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)`}}> 
              <StyledLiveIndication>LIVE</StyledLiveIndication>
              {/* <img src={imageBase64} alt="Live preview to be presented!!"  /> */}
            </StyledLiveViewVideo>
            <StyledHeadingSection
              sx={{ borderTop: "none", textAlign: "left" }}
              pl={2}
              pt={1}
              pb={1}
            >
              Captured Images
            </StyledHeadingSection>
            <StyledCapturedImage>
              <Grid container spacing={2}>
                <Grid item sm={4} md={4} lg={4} xl={4}>
                  <img
                    alt="1"
                    width="100%"
                    src={scannedData.status === "SCANNING" ? 
                    (scannedData.image_a ? `data:image/jpeg;base64,${scannedData?.image_a.split("'")[1]}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuqL-_eufoeGDEeZ-VDPxHZc8L0NVCqwLAw&usqp=CAU")
                    : (scannedData.status === "DETECTED" ? 
                    (scannedData.detected_image_a ? `data:image/jpeg;base64,${scannedData?.detected_image_a.split("'")[1]}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuqL-_eufoeGDEeZ-VDPxHZc8L0NVCqwLAw&usqp=CAU"): "")
                  }
                  />
                  <StyledInputLabel>Side-1</StyledInputLabel>
                </Grid>
                <Grid item sm={4} md={4} lg={4} xl={4}>
                  <img
                    alt="2"
                    width="100%"
                    src={scannedData.status === "SCANNING" ? 
                    (scannedData.image_b ? `data:image/jpeg;base64,${scannedData?.image_b.split("'")[1]}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuqL-_eufoeGDEeZ-VDPxHZc8L0NVCqwLAw&usqp=CAU")
                    : (scannedData.status === "DETECTED" ? 
                    (scannedData.detected_image_b ? `data:image/jpeg;base64,${scannedData?.detected_image_b.split("'")[1]}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuqL-_eufoeGDEeZ-VDPxHZc8L0NVCqwLAw&usqp=CAU"): "")
                  }
                    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuqL-_eufoeGDEeZ-VDPxHZc8L0NVCqwLAw&usqp=CAU"
                  />
                  <StyledInputLabel>Side-2</StyledInputLabel>
                </Grid>
                <Grid item sm={4} md={4} lg={4} xl={4}>
                  <img
                    alt="3"
                    width="100%"
                    src={scannedData.status === "SCANNING" ? 
                    (scannedData.image_c ? `data:image/jpeg;base64,${scannedData?.image_c.split("'")[1]}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuqL-_eufoeGDEeZ-VDPxHZc8L0NVCqwLAw&usqp=CAU")
                    : (scannedData.status === "DETECTED" ? 
                    (scannedData.detected_image_c ? `data:image/jpeg;base64,${scannedData?.detected_image_c.split("'")[1]}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuqL-_eufoeGDEeZ-VDPxHZc8L0NVCqwLAw&usqp=CAU"): "")
                  }
                    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYCKpmH5_Ymq7V26kKyx6gnOvwffHHCWBmQA&usqp=CAU"
                  />
                  <StyledInputLabel>Side-3</StyledInputLabel>
                </Grid>
              </Grid>
            </StyledCapturedImage>
          </StyledRightSectionContent>
        </StyledRightSideBox>
        
      </StyledContentBox>
      
    </StyledMainContainer>
    
  );
};

export default DashboardPage;
