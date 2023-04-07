import React from "react";
import "./App.css";
import ChartView from "./components/charts/ChartView";
import {MainLogo, Root, TitleView} from "./styles/theme";
import ArsenalLogo from "./assets/arsenal_logo.svg";

function App() {
  return (
    <Root>
      <TitleView>
        <MainLogo src={ArsenalLogo} alt="Arsenal" />
      </TitleView>
      <ChartView />
    </Root>
  );
}

export default App;
