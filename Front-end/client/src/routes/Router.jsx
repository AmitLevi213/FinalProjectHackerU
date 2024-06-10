import { Routes, Route } from "react-router-dom";
import ROUTES from "./routesModel";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import MusicPage from "../music-cards/pages/MusicPage";
import LoginPage from "../users/pages/LoginPage";
import SignupPage from "../users/pages/SignupPage";
import CreateMusicPage from "../music-cards/pages/CreateMusicPage";
import UserMusicPage from "../music-cards/pages/UserMusicPage";
import UserFavoriteMusicPage from "../music-cards/pages/UserFavoriteMusicPage";
import MusicDetailsPage from "../music-cards/pages/MusicDetailsPage";
import EditUserInfo from "../users/pages/EditUserInfo";
import UserProfile from "../users/pages/UserProfile";
import EditUserMusicPage from "../music-cards/pages/EditUserMusicPage";
import CrmPage from "../users/pages/CrmPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<MusicPage />}></Route>
      <Route path={ROUTES.ABOUT} element={<AboutPage />}></Route>
      <Route path={ROUTES.LOGIN} element={<LoginPage />}></Route>
      <Route path={ROUTES.SIGNUP} element={<SignupPage />}></Route>
      <Route path={ROUTES.USER_PROFILE} element={<UserProfile />}></Route>

      <Route path={ROUTES.CREATE_MUSIC} element={<CreateMusicPage />}></Route>
      <Route path={ROUTES.MY_MUSIC} element={<UserMusicPage />}></Route>
      <Route
        path={`${ROUTES.MUSIC_DETAILS}/:id`}
        element={<MusicDetailsPage></MusicDetailsPage>}
      ></Route>
      <Route
        path={ROUTES.FAV_MUSIC}
        element={<UserFavoriteMusicPage />}
      ></Route>
      <Route path={ROUTES.EDIT_USER} element={<EditUserInfo />}></Route>
      <Route
        path={`${ROUTES.EDIT_MUSIC}/:id`}
        element={<EditUserMusicPage />}
      ></Route>
      <Route path={ROUTES.CRM} element={<CrmPage />} />

      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
};
export default Router;
