import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Chip, TableCell } from "@mui/material";
import LoadingIcon from "../../synchronize.gif";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { tableContent, tableHead } from "../../data";
import Typography from "@mui/material/Typography";
import { useInterval } from "../../useInterval";
import { getApiData } from "../../apiService";

const StyledMainSection = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 65px)",
  display: "flex",
  overflowY: "hidden",
}));
const StyledLeftSideSection = styled(Box)(({ theme }) => ({
  height: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
  width: "400px",
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const StyledLeftSideSectionFooter = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  padding: 10,
}));
const StyledLeftSideSectionContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
  overflowX: "hidden",
}));

const StyledRightSideSection = styled(Box)(({ theme }) => ({
  flexGrow: "1",
  height: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
}));

const StyledRightSideContent = styled(Box)(({ theme }) => ({
  flexGrow: "1",
  overflowY: "auto",
  overflowX: "hidden",
}));

const StyledRightSideHeaderSection = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "10px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const DashboardPage = () => {
  const [scannedData, setScannedData] = useState([]);
  const [imageData, setImageData] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const host = "http://localhost:8081"
  const self_host = ""
  const usedHost = self_host
  useInterval(() => {
    getApiData(`${usedHost}/getDetectedData`, setScannedData, setIsDataLoading);
    getApiData(`${usedHost}/getLatestDetectedImage`, setImageData, setIsDataLoading);
  }, 5000);


  return (
    <StyledMainSection>
      <StyledLeftSideSection>
        <StyledLeftSideSectionContent>
          {imageData && (
            <Box>
              <img
                alt="scanned_image"
                width="100%"
                src={imageData?.image
                  ? `data:image/jpeg;base64,${imageData?.image.split("'")[1]})`
                  : "https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg"
                }
              />
            </Box>
          )}
        </StyledLeftSideSectionContent>
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
      </StyledLeftSideSection>
      <StyledRightSideSection>
        <StyledRightSideHeaderSection>
          <Typography sx={{ fontWeight: "bold" }} variant="body2">
            Product Details
          </Typography>
        </StyledRightSideHeaderSection>
        <StyledRightSideContent>
          <TableContainer>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  {tableHead.map((item, index) => (
                    <TableCell key={index}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {scannedData.map((item: any, index) => (
                  <TableRow>
                    <TableCell>{item.ilpn}</TableCell>
                    <TableCell align="left">{item.gstn}</TableCell>
                    <TableCell align="left">{item.lot}</TableCell>
                    <TableCell align="left">{item.lotExpiration}</TableCell>
                    <TableCell align="left">{item.serialNumber}</TableCell>
                    <TableCell align="left">{item.businessUnit}</TableCell>
                    <TableCell align="left">{item.businessProcess}</TableCell>
                    <TableCell align="left">{item.site}</TableCell>
                    <TableCell align="left">{item.QuarantineId}</TableCell>
                    <TableCell align="left">{item.lpnNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledRightSideContent>
        {/* <StyledRightSideFooterSection>
          <Box pr={1}>
            <Button disableElevation size="small" variant="contained">
              Edit
            </Button>
          </Box>
          <Box>
            <Button
              color="success"
              disableElevation
              size="small"
              variant="contained"
            >
              Done
            </Button>
          </Box>
        </StyledRightSideFooterSection> */}
      </StyledRightSideSection>
    </StyledMainSection>
  );
};

export default DashboardPage;
