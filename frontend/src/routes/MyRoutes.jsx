import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from '../components/welcomepage/WelcomePage';
import RegistrationPage from '../components/registerpage/RegistrationPage';
import MapsMainPage from '../components/maps/MapsMainPage';
import EventCard from '../components/evets/EventCard';
import EventsCategoryPage from '../components/evets/EventsCategoryPage';
import SavedEventsPage from '../components/savedEvents/SavedEvents';
import UserProfilePage from '../components/userpage/UserProfilePage';
import SignUp from '../components/registerpage/SignUp';
import CreatPostPage from '../components/evets/CreatePostPage';

const PUBLIC_ROUTES = [
  { id: 1, link: "/", element: <MapsMainPage /> }, 
  { id: 2, link: "/sign-in", element: <RegistrationPage /> }, 
  { id: 3, link: "/mapsmainpage", element: <MapsMainPage /> }, 
  { id: 4, link: "/eventsitem/:eventId", element: <EventCard /> }, 
  { id: 5, link: "/eventcategorypage", element: <EventsCategoryPage /> }, 
  { id: 6, link: "/savedeventspage", element: <SavedEventsPage /> }, 
  { id: 7, link: "/userprofile", element: <UserProfilePage /> }, 
  { id: 8, link: "/sign-up", element: <SignUp /> }, 
  { id: 8, link: "/createPost", element: <CreatPostPage/> },

];

const MyRoutes = () => {
  return (
    <Routes>
      {PUBLIC_ROUTES.map((elem) => (
        <Route path={elem.link} element={elem.element} key={elem.id} />
      ))}
    </Routes>
  );
};

export default MyRoutes;
