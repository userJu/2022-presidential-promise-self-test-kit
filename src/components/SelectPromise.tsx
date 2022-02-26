import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import promiseData from "../promiseData.json";

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

const PartName = styled.h1`
  font-size: 25px;
  width: 90%;
  text-align: center;
  margin: 0.3rem 0;
  color: ${(props) => props.theme.colors.accentColorPurple};
`;

const QuestionBoxes = styled.div`
  border: 1px solid black;
  display: flex;
  height: 40vh;
  width: auto;
  left: 0;
`;

const QuestionBox = styled.div`
  border: 1px solid pink;
  padding: 3rem 0;
  transform-origin: left;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.whiteColor};
`;

const QuestionName = styled.h2`
  font-size: 20px;
  text-align: center;
  margin-left: 1rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.accentColorDarkPurple};
`;

const AnswerList = styled.ul`
  padding: 1rem;
`;
const Answer = styled.li`
  margin: 10px 0;
  padding: 0.5rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.btnColor};

  &:hover {
    background-color: ${(props) => props.theme.colors.subBgColor};
  }
`;
interface ILocation {
  promises: string[];
}

interface IAnswerList {
  answer: string;
  candidater: string;
  link: string;
}
interface IQuestionInfo {
  qName: string;

  answerList: IAnswerList[];
}

interface IQuestionList {
  id: string;
  questionList?: IQuestionInfo[];
}
interface IPromises {
  promiseList?: IQuestionList;
}

const SelectPromise = () => {
  const location = useLocation();
  const state: any = location.state; // state를 any로 두면 동작하긴 하는데 이게 맞는지..
  const selectedIdArr = state.promises;
  const data = promiseData.promiseList;
  const selectedData = data.filter((item) => selectedIdArr.includes(item.id));
  const [order, setOrder] = useState(0);
  const [qNumber, setQNumber] = useState(0);
  const qList = selectedData[order];
  const [resultBtn, setResultBtn] = useState(false);
  const navigate = useNavigate();

  const answerClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (qList.questionList !== undefined) {
      if (qList.questionList?.length - 1 > qNumber) {
        setQNumber((prev) => prev + 1);
      } else if (qList.questionList?.length - 1 === qNumber) {
        console.log("새로운 id가 들어올 예정");
        setOrder((prev) => prev + 1);
        setQNumber(0);
      }
    }
  };

  useEffect(() => {
    console.log(order);
    console.log(selectedData.length);
    if (qList === undefined) {
      navigate("/result");
    }
  }, [order]);

  return (
    <Container>
      {qList !== undefined && (
        <>
          <PartName>{qList.id}</PartName>
          <QuestionBoxes>
            {qList.questionList !== undefined ? (
              <QuestionBox>
                <QuestionName key={qList.questionList[qNumber].qName}>
                  {qList.questionList[qNumber].qName}
                </QuestionName>
                <AnswerList>
                  {qList.questionList[qNumber].answerList.map((selector) => (
                    <Answer
                      onClick={answerClick}
                      data-value={selector.candidater}
                    >
                      {selector.answer}
                    </Answer>
                  ))}
                </AnswerList>
              </QuestionBox>
            ) : null}
          </QuestionBoxes>
          {/* {resultBtn && <button>결과 보기</button>} */}
        </>
      )}
    </Container>
  );
};

export default SelectPromise;
