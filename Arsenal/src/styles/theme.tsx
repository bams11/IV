import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const ChartBody = styled.body`
  flex: 4;
  flex-direction: row;
  display: flex;
  align-items: center;
`;

export const TitleView = styled.body`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #ea574d;
`;

export const MainLogo = styled.img`
  width: 120px;
`;

export const ChartFrame = styled.div`
  flex: 1;
  width: 100%;
  height: 50vh;
  display: flex;
`;

export const Square = styled.div`
  width: 16px;
  height: 16px;
  display: inline-block;
  margin: 2px;
`;
