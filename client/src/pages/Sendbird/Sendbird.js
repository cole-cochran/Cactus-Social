import React from "react";
import { App as SendbirdApp } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

import "./sendbird.css";
import { APP_ID, USER_ID, NICKNAME, THEME } from "./const";

export default function App() {
  return (
    <div className="customized-app">
      <SendbirdApp
        appId={APP_ID}
        userId={USER_ID}
        nickname={NICKNAME}
        theme={THEME}
        useReaction={true}
        useMessageGrouping={true}
      />
    </div>
  );
}