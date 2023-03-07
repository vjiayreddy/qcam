export const getApiData2 = (urlPath) => {
    fetch(urlPath)
    .then((res) => res.json())
    .then((data) => {
      console.log("Recieved Data", data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };