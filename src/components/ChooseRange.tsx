import { render } from "@testing-library/react";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid black;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: default;
`;
const MainName = styled.h1`
  font-size: 25px;
  width: 90%;
  text-align: center;
  margin: 0.3rem 0;
`;
const SubName = styled.span`
  font-size: 20px;
`;
const MainBorder = styled.div`
  text-align: center;
  width: 90%;
  height: 40vh;
  margin-top: 3.3rem;
  h3 {
    font-size: 16px;
    margin-bottom: 0.7rem;
  }
`;
const Borders = styled.div`
  display: grid;
  height: 90%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
  cursor: pointer;

  div {
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px;
    background-color: ${(props) => props.color};

    &:hover {
      background-color: gray;
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
  h3 {
    border-right: 1px solid black;
    padding: 7px 10px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
  }
`;

interface IPromises {
  promise: string;
}

const ChooseRange = () => {
  const [promises, setPromises] = useState<IPromises[]>([]);
  const [clicked, setClicked] = useState("white");
  const bordersClick = (e: any) => {
    const {
      target: { title },
    } = e;
    if (title !== "") {
      const style = e.target.style;
      style.backgroundColor = "pink";
      setPromises((prevPromise) => [title, ...prevPromise]);
    }
  };

  const startBtnClick = () => {};
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
        <h3>관심있는 정책들을 중복 선택 후 버튼을 눌러주세요</h3>
        <Borders onClick={bordersClick} color={clicked}>
          <div title="경제">경제(주식, 부동산)</div>
          <div title="일자리">일자리(노동, 일자리)</div>
          <div title="환경">환경(기후위기, 환경, 동물권)</div>
          <div title="후생 발전">후생 발전(출생, 육아, 교육)</div>
          <div title="국방">국방(군인 처우, 사드 배치)</div>
          <div title="성평등">성평등(여성, 차별금지법, 생활동반자법)</div>
          <div title="노후">노후(연기금, 노인공약)</div>
          <div title="지역균형">지역균형 발전</div>
          <div title="기타">기타</div>
        </Borders>
      </MainBorder>
      <StartBtnBox>
        <h3>?</h3>
        <h3>자가진당</h3>
        <h3>김정책</h3>
        <Button onClick={startBtnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="레이어_1"
            x="0px"
            y="0px"
            width="1000px"
            height="1000px"
            viewBox="0 0 1000 1000"
          >
            <g>
              <path
                fill="#E83828"
                d="M960.692,305.367c-25.187-59.546-61.233-113.015-107.138-158.92   c-45.906-45.906-99.375-81.954-158.921-107.139C632.968,13.225,567.482,0,500,0c-67.484,0-132.968,13.225-194.635,39.308   c-59.544,25.185-113.013,61.233-158.919,107.139c-45.906,45.906-81.953,99.375-107.139,158.92C13.225,367.032,0,432.517,0,500   c0,67.482,13.225,132.969,39.307,194.633c25.186,59.547,61.233,113.014,107.139,158.922   c45.905,45.902,99.374,81.952,158.919,107.139C367.033,986.774,432.518,1000,500,1000c67.481,0,132.966-13.226,194.634-39.307   c59.546-25.187,113.015-61.236,158.921-107.139c45.904-45.908,81.951-99.375,107.138-158.922   C986.775,632.965,1000,567.482,1000,500C1000,432.518,986.775,367.034,960.692,305.367z M462.543,927.031   C242.336,908.183,71.886,723.773,71.886,501.01c0-13.923,0.666-27.696,1.968-41.287c0.977-10.195,2.311-20.287,3.992-30.264   c2.24-13.304,5.094-26.402,8.533-39.267c1.72-6.432,3.586-12.805,5.594-19.116c1.004-3.154,2.043-6.295,3.119-9.418   C148.839,205.489,290.508,89.713,462.543,74.987V927.031z M536.439,927.023V590.211l238.014,238.014   C707.189,884.785,623.65,919.459,536.439,927.023z M826.71,775.974L536.439,485.705V74.987   C729.119,91.481,883.706,234.73,919.343,419.52c0.634,3.3,1.232,6.613,1.793,9.939c1.68,9.977,3.015,20.069,3.992,30.264   c1.303,13.591,1.968,27.364,1.968,41.287C927.096,601.861,891.548,698.937,826.71,775.974z"
              />
            </g>
          </svg>
        </Button>
      </StartBtnBox>
    </Container>
  );
};

export default ChooseRange;
