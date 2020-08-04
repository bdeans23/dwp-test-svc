export let getUsersForCityQuery = (cityName: string) => {
  return `/city/${cityName}/users`;
};

export let getAllUsersQuery = () => {
  return `/users`;
};
