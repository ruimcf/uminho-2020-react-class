export const getInterestPoints = () => {
  return fetch("/interest-points").then(response => response.json()).then(json => json.interestPoints)
}

export const createInterestPoint = (title, latitude, longitude) => {
  return fetch("/interest-points", { method: "POST", body: JSON.stringify({ title, latitude, longitude }) }).then(response => response.json()).then(json => json.interestPoint)
}