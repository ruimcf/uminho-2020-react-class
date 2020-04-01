export const getInterestPoints = () => {
  return fetch("/interest-points")
    .then((response) => response.json())
    .then((json) => json.interestPoints);
};
