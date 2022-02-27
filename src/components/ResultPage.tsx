import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import 심상정 from "../image/심상정.jpg";
import 안철수 from "../image/안철수.jpg";
import 윤석열 from "../image/윤석열.jpg";
import 이재명 from "../image/이재명.jpg";

const Container = styled.div`
  border: 1px solid black;
  width: 100vw;
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
  grid-template-rows: repeat(2, 1fr);

  grid-gap: 10px;
  width: 90%;
  height: 40vh;
  margin-top: 5rem;

  div {
    background-color: ${(props) => props.theme.colors.whiteColor};
    padding: 0.5rem;
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
`;

const MyAnswer = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    padding: 0.5rem;
    padding-left: 1rem;
    overflow-wrap: break-word;
    h3 {
      padding-bottom: 0.3rem;
    }
  }
`;

interface ISelectedData {
  id: string;
  questionList: {
    qName: string;
    answerList: {
      answer: string;
      candidate: string;
      link: string;
    }[];
  }[];
}
interface ICand {
  answer: string;
  candidate: string;
  link: string;
}

interface IChoicedCandidate {
  [index: string]: number; // 이렇게 한 줄만 써주면 된다
  이재명: number;
  윤석열: number;
  심상정: number;
  안철수: number;
  없음: number;
}

interface IOnepick {
  part: string;
  candidate: string[];
}

const ResultPage = () => {
  const location = useLocation();
  const state: any = location.state;
  const userChoice = state.userChoice;
  const selectedData = state.selectedData;
  const [selector, setSelector] = useState("");
  const [selectorPer, setSelectorPer] = useState("");
  const [onPick, setOnPick] = useState<IOnepick[]>([]);

  useEffect(() => {
    console.log(userChoice);
    let ChoicedCandidate: IChoicedCandidate = {
      이재명: 0,
      윤석열: 0,
      심상정: 0,
      안철수: 0,
      없음: 0,
    };
    // 파트별 원픽 보여주기
    userChoice.map((choiced: any) => {
      selectedData.map((data: any) => {
        if (choiced.part === data.id) {
        }
      });
    });

    // 최다득표 후보 보여주기
    userChoice.forEach((cand: ICand) => {
      switch (cand.candidate) {
        case "이재명":
          ChoicedCandidate.이재명 = ChoicedCandidate.이재명 + 1;
          break;
        case "윤석열":
          ChoicedCandidate.윤석열 = ChoicedCandidate.윤석열 + 1;
          break;
        case "심상정":
          ChoicedCandidate.심상정 = ChoicedCandidate.심상정 + 1;
          break;
        case "안철수":
          ChoicedCandidate.안철수 = ChoicedCandidate.안철수 + 1;
      }
    });
    let arr = Object.values(ChoicedCandidate);
    const maxVoted = Math.max(...arr);
    const maxCandidate = Object.keys(ChoicedCandidate).find((key: string) => {
      return ChoicedCandidate[key] === maxVoted;
    });
    setSelector(maxCandidate!);
    setSelectorPer(((maxVoted / userChoice.length) * 100).toFixed(2));
  }, []);
  return (
    <Container>
      <ResultName>{selector}</ResultName>
      <ResultSupport>지지 정도 : {selectorPer}%</ResultSupport>
      <ResultBoxes>
        {selectedData.map((data: ISelectedData) => (
          <div key={data.id}>
            <h3>{data.id} 부문</h3>
            <span>나의 원픽 : 이재명</span>
          </div>
        ))}
      </ResultBoxes>
      <MyResultBox>
        <h2>📝나의 답변 현황</h2>
        <MyAnswer>
          {userChoice.map((choice: any) => (
            <li>
              🔥
              <h3>{choice.answer}</h3>
              <span>
                팩트체크 : <a href={choice.link}>{choice.link}</a>
              </span>
            </li>
          ))}
        </MyAnswer>
      </MyResultBox>

      {/* <img src={심상정} alt="" /> */}
    </Container>
  );
};

export default ResultPage;
