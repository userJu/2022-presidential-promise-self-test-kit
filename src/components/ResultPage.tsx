import React from "react";
import styled from "styled-components";
import 심상정 from "../image/심상정.jpg";
import 안철수 from "../image/안철수.jpg";
import 윤석열 from "../image/윤석열.jpg";
import 이재명 from "../image/이재명.jpg";

const Container = styled.div`
  border: 1px solid black;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.mainBgColor};
  overflow-x: hidden;
  cursor: default;
`;

const ResultName = styled.h1`
  font-size: 25px;
  width: 90%;
  text-align: center;
  margin: 0.3rem 0;
  color: ${(props) => props.theme.colors.accentColorPurple};
`;

const ResultSupport = styled.h2`
  font-size: 20px;
  color: ${(props) => props.theme.colors.accentColorDarkPurple};
`;

const ResultBoxes = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  width: 90%;
  height: 40vh;
  margin-top: 5rem;

  div {
    background-color: ${(props) => props.theme.colors.whiteColor};
  }
`;

const MyResultBox = styled.div`
  border: 2px solid ${(props) => props.theme.colors.subBgColor};
  width: 90%;
  padding: 3rem 0;
  margin-top: 3rem;
  h2 {
    font-size: 17px;
    color: ${(props) => props.theme.colors.accentColorDarkPurple};
    padding: 0.6rem;
  }
  li {
    padding-left: 1rem;
    display: flex;
  }
`;

const ResultPage = () => {
  return (
    <Container>
      <ResultName>이재명</ResultName>
      <ResultSupport>지지 정도 : 질문 수 대비 이재명 비율</ResultSupport>
      <ResultBoxes>
        <div>
          <h3>경제 부문</h3>
          <span>나의 원픽 : 이재명</span>
        </div>
        <div>
          <h3>성평등 부문</h3>
          <span>나의 원픽 : 심상정</span>
        </div>
        <div>후생관리 부문</div>
        <div>기타 부문</div>
      </ResultBoxes>
      <MyResultBox>
        <h2>나의 답변 현황</h2>
        <ul>
          <li>답변 내용 보여주기 1</li>
          <li>답변 내용 보여주기 2</li>
          <li>답변 내용 보여주기 3</li>
          <li>답변 내용 보여주기 4</li>
        </ul>
      </MyResultBox>

      {/* <img src={심상정} alt="" /> */}
    </Container>
  );
};

export default ResultPage;
