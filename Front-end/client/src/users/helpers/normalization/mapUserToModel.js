const mapUserToModel = (user) => ({
  ...{ ...user.name },
  phone: user.phone,
  email: user.email,
  password: user.password,
  ...{ ...user.address },
  ...{ ...user.image },
  isBusiness: user.isBusiness,
});
export const mapEditUserToModel = (user) => {
  const rtn = {
    ...{ ...user.name },
    phone: user.phone,
    ...{ ...user.address },
    ...{ ...user.image },
  };
  delete rtn._id;
  return rtn;
};

export default mapUserToModel;
