import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Footer from './Footer.js';


const Profile = (props) => {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <>
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="avatar" onClick={props.onEditAvatar}>
            <div className="avatar__image" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
            <button className="btn btn_type_avatar-edit" type="button"></button>
          </div>
          <div className="profile__text">
            <button className="btn btn_type_edit" type="button" onClick={props.onEditProfile}></button>
            <div>
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__activity">{currentUser.about}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
};

export {Profile};