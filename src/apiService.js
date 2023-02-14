export const getApiData = (urlPath, state, setIsDataLoading) => {
  setIsDataLoading(false);
  fetch(urlPath)
    .then((res) => res.json())
    .then((data) => {
      state(data);
      setIsDataLoading(true);
    })
    .catch((error) => {
      setIsDataLoading(false)
    });
};
