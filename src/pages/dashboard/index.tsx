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
import { useRef, useState } from "react";
import { getApiData } from "../../apiService";
import Logo from "../../cardinal.png";
import LoadingIcon from "../../synchronize.gif";
import { useInterval } from "../../useInterval";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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
  backgroundColor: theme.palette.grey[600],
  position: "relative",
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


const data = [
  {
    barcode: "(12)23456789456",
    product: "Flecanide Acelete Tab",
    ILPN: "(12)23456789456",
  },
  {
    barcode: "(12)23456789456",
    product: "Flecanide Acelete Tab",
    ILPN: "(12)23456789456",
  },
  {
    barcode: "(12)23456789456",
    product: "Flecanide Acelete Tab",
    ILPN: "(12)23456789456",
  },
];

const DashboardPage = () => {
  const businessUnitRef = useRef<HTMLInputElement>()
  const siteRef = useRef<HTMLInputElement>()
  const businessProcessRef = useRef<HTMLInputElement>()
  const [scannedData, setScannedData] : any = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const host = "http://localhost:8081";
  const onSubmit = () => {
    console.log("Clicked!!");
    if(businessProcessRef.current && siteRef.current && businessUnitRef.current) {
      console.log(businessProcessRef.current.value);
      console.log(siteRef.current.value);
      console.log(businessUnitRef.current.value);
    }
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }

  const checkBox = (scanStatus: string) => {
    return scanStatus === "DETECTED"
  }
  const requiredTrue = () => true
  useInterval(() => {
    getApiData(`${host}/getDetectedData`, setScannedData, setIsDataLoading);
    // getApiData(
    //   `${usedHost}/getLatestDetectedImage`,
    //   setImageData,
    //   setIsDataLoading
    // );
  }, 5000);

  return (
    <StyledMainContainer>
      <StyledAppBar>
        <Typography variant="h6">Qcam Exception Scan Results</Typography>
        <img alt="logo" width="150px" src={Logo} />
      </StyledAppBar>
      <StyledContentBox>
        <StyledLeftSideBox>
          <StyledFormBox pl={4} pt={2} pb={2} pr={4}>
            <Grid container spacing={2}>
              <Grid item md={6} lg={6} sm={6} xl={6}>
                <StyledInputLabel>Business Unit</StyledInputLabel>
                <StyledInputBase required={requiredTrue()} inputRef={businessUnitRef} placeholder="Business Unit" />
              </Grid>
              <Grid item md={6} lg={6} sm={6} xl={6}>
                <StyledInputLabel>Site</StyledInputLabel>
                <StyledInputBase required={requiredTrue()} inputRef={siteRef} placeholder="Site" />
              </Grid>
              <Grid item xs={12}>
                <StyledInputLabel>Business Process</StyledInputLabel>
                <StyledInputBase required={requiredTrue()} inputRef={businessProcessRef} placeholder="Business Process" />
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
          <StyledActionsSection pl={4} pt={2} pb={2} pr={4}>
            <Box flexGrow={1}>
              <Typography sx={{ fontSize: 15 }} variant="h6">
                Action On The Scanned Items
              </Typography>
            </Box>
            <Box mr={1}>
              <Button size="small" variant="contained" onClick={onSubmit}>
                Submit
              </Button>
            </Box>
            <Button size="small" color="error" variant="contained">
              Scan Again
            </Button>
          </StyledActionsSection>
        </StyledLeftSideBox>
        
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
            <StyledLiveViewVideo>
              <StyledLiveIndication>LIVE</StyledLiveIndication>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Success"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Successfully submitted to EAI!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>
    </StyledMainContainer>
    
  );
};

export default DashboardPage;
