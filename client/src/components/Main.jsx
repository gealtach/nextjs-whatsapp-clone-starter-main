import React, { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";
import Empty from "./Empty";

export default () => {

  const [redirectLogin, setRedirectLogin] = useState(false);
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const router = useRouter();

  useEffect(() => {
    if(redirectLogin) router.push('login');
  },[redirectLogin])

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if(!currentUser) setRedirectLogin(true);
    if(!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, { email: currentUser.email} );
      if(!data.status) router.push('/login');
      if(data?.data){
        const { id, name, email, profilePicture: profileImage, status } = data.data;
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: { id, name, email, profileImage, status }
        })
      }
    }
  });
  useEffect(() => {
    const getMessages = async () => {
      try {
        console.log('im here cesar')
        console.log(userInfo, currentChatUser);
        console.log(`${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`);
        const { data } = await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`);
        console.log(data,'holactm');
      } catch (err) {
        console.log(err);
      }
    }
    if(currentChatUser?.id){
      console.log('estoy en el if');
      getMessages();
    }
  },[currentChatUser])

  return(
    <div className="grid grid-cols-main h-screen w-screen max-h-full max-w-full over">
      <ChatList />
      {
        currentChatUser ?  <Chat /> : <Empty />
      }
    </div>
  );
}
