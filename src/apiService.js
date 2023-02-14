export const getApiData = (urlPath, state, setIsDataLoading) => {
  setIsDataLoading(false);
  fetch(urlPath)
    .then((res) => res.json())
    .then((data) => {
      console.log("Recieved Data", data.data);
      state(data.data);
      setIsDataLoading(true);
    })
    .catch((error) => {
      setIsDataLoading(false)
    });
};
