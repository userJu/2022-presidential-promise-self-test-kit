import { render } from "@testing-library/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.mainBgColor};
  cursor: default;
`;
const MainName = styled.h1`
  width: 90%;
  text-align: center;
  margin: 0.3rem 0;
  margin-top: 8rem;
  color: ${(props) => props.theme.colors.accentColorPurple};
`;
const SubName = styled.h2`
  color: ${(props) => props.theme.colors.accentColorDarkPurple};
`;
const MainBorder = styled.div`
  text-align: center;
  width: 90%;
  height: 40vh;
  margin-top: 3.3rem;
  max-width: 1200px;
  h3 {
    margin-bottom: 0.7rem;
  }
`;
const Borders = styled.div`
  display: grid;
  height: 90%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;

  div {
    background-color: ${(props) => props.theme.colors.whiteColor};
    cursor: pointer;

    /* border: 2px solid ${(props) => props.theme.colors.subBgColor}; */

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    background-color: ${(props) => props.color};
    box-shadow: ${(props) => props.theme.shadow.clickedBtn};

    &:hover {
      background-color: ${(props) => props.theme.colors.subBgColor};
    }
  }
`;
const StartBtnBox = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.whiteColor};
  h3 {
    border-right: 1px solid black;
    padding: 7px 10px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
`;

const Svg = styled.svg`
  width: 20px;
  height: 20px;
  display: flex;
`;

const Notice = styled.div`
  width: 90%;
  bottom: 3.5rem;
  max-width: 1200px;
  margin-top: 8rem;
  margin-bottom: 2rem;
  font-family: ${(props) => props.theme.font.basicFont};
  font-weight: bold;
  h3 {
    margin-bottom: 0.1rem;
  }
  span {
  }
`;

const ChooseRange = () => {
  const [promises, setPromises] = useState<string[]>([]);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const bordersClick = (e: any) => {
    const {
      target: { title },
    } = e;
    if (title !== "" && promises.includes(title) !== true) {
      const style = e.target.style;
      style.backgroundColor = "#d1ccc0";
      setPromises((prevPromise) => [...prevPromise, title]);
    }
  };

  const startBtnClick = () => {
    if (promises.length > 0) {
      navigate("/select_promise", { state: { promises } });
    } else {
      console.log("아니 다시보라고!");
      setAlert((prev) => !prev);
    }
  };
  console.log(promises);
  // 이렇게 하려면 모든 div에 다 설정해야 한다
  // const borderClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   console.dir(e.currentTarget.innerText);
  // };
  return (
    <Container>
      <MainName>2022 대선 공약 선호도 자가진단 키트</MainName>
      <SubName>당신의 정책에 투표하세요</SubName>
      <MainBorder>
        <h3>관심있는 정책들을 '중복 선택' 후 버튼을 눌러주세요</h3>
        <Borders onClick={bordersClick}>
          <div title="경제">경제</div>
          <div title="일자리">일자리</div>
          <div title="환경">환경</div>
          <div title="후생 발전">후생 발전(출생, 육아, 교육)</div>
          <div title="국방">국방</div>
          <div title="성평등">성평등</div>
          <div title="노후">노후</div>
          {/* <div title="지역균형">지역균형 발전</div>
          <div title="기타">기타</div> */}
        </Borders>
      </MainBorder>
      {alert && <h4>정책을 선택해주세요</h4>}
      <StartBtnBox>
        <h3>시작하기👉</h3>
        <Button onClick={startBtnClick}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="레이어_1"
            x="0px"
            y="0px"
            width="1000px"
            height="1000px"
            viewBox="0 0 1000 1000"
          >
            <path
              // 선에 가있을때만 작동됨
              fill="#E83828"
              d="M960.692,305.367c-25.187-59.546-61.233-113.015-107.138-158.92   c-45.906-45.906-99.375-81.954-158.921-107.139C632.968,13.225,567.482,0,500,0c-67.484,0-132.968,13.225-194.635,39.308   c-59.544,25.185-113.013,61.233-158.919,107.139c-45.906,45.906-81.953,99.375-107.139,158.92C13.225,367.032,0,432.517,0,500   c0,67.482,13.225,132.969,39.307,194.633c25.186,59.547,61.233,113.014,107.139,158.922   c45.905,45.902,99.374,81.952,158.919,107.139C367.033,986.774,432.518,1000,500,1000c67.481,0,132.966-13.226,194.634-39.307   c59.546-25.187,113.015-61.236,158.921-107.139c45.904-45.908,81.951-99.375,107.138-158.922   C986.775,632.965,1000,567.482,1000,500C1000,432.518,986.775,367.034,960.692,305.367z M462.543,927.031   C242.336,908.183,71.886,723.773,71.886,501.01c0-13.923,0.666-27.696,1.968-41.287c0.977-10.195,2.311-20.287,3.992-30.264   c2.24-13.304,5.094-26.402,8.533-39.267c1.72-6.432,3.586-12.805,5.594-19.116c1.004-3.154,2.043-6.295,3.119-9.418   C148.839,205.489,290.508,89.713,462.543,74.987V927.031z M536.439,927.023V590.211l238.014,238.014   C707.189,884.785,623.65,919.459,536.439,927.023z M826.71,775.974L536.439,485.705V74.987   C729.119,91.481,883.706,234.73,919.343,419.52c0.634,3.3,1.232,6.613,1.793,9.939c1.68,9.977,3.015,20.069,3.992,30.264   c1.303,13.591,1.968,27.364,1.968,41.287C927.096,601.861,891.548,698.937,826.71,775.974z"
            />
          </Svg>
        </Button>
      </StartBtnBox>
      <Notice>
        <h3>
          각 후보의 비위, 인성 관련 자료는 담지 않았습니다. 순수 정책만으로
          여러분의 후보를 찾아보세요.
        </h3>
        <span>
          ※해당 테스트는 다음 자료에 기반해 마련됐음을 알립니다. <br />
          1번 각 후보 정책 공약집, 2번 뉴스레터 뉴닉의 '대선키트 특집'
          <br /> 1번과 2번의 자료가 부족할 경우 뉴스 보도로 대체했습니다.
        </span>
      </Notice>
    </Container>
  );
};

export default ChooseRange;
