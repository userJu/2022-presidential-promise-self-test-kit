import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import promiseData from "../promiseData.json";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.mainBgColor};
  overflow-x: hidden;
  cursor: default;
`;

const PartName = styled.h1`
  width: 90%;
  text-align: center;
  margin: 3rem 0;
  color: ${(props) => props.theme.colors.accentColorPurple};
`;

const QuestionBox = styled.div`
  padding: 3rem 0;
  transform-origin: left;
  width: 90%;
  max-width: 1200px;
  background-color: ${(props) => props.theme.colors.whiteColor};
  border: 2px solid ${(props) => props.theme.colors.subBgColor};
`;
const QuestionName = styled.h2`
  text-align: center;
  margin-left: 1rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.accentColorDarkPurple};
`;

const AnswerList = styled.ul`
  padding: 1rem;
  font-family: ${(props) => props.theme.font.basicFont};
  font-weight: bold;
`;
const Answer = styled.li`
  margin: 10px 0;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.btnColor};
  box-shadow: ${(props) => props.theme.shadow.clickedBtn};

  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.subBgColor};
  }
`;

const PrevBtn = styled.button`
  margin-bottom: 5rem;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.colors.btnColor};
  border: 1px solid ${(props) => props.theme.colors.subBgColor};
  color: ${(props) => props.theme.colors.accentColorDarkPurple};
  box-shadow: ${(props) => props.theme.shadow.clickedBtn};
  padding: 5px 7px;
  cursor: pointer;
`;
interface ILocation {
  promises: string[];
}

interface IQuestionInfo {
  qName: string;
  answerList: { answer: string; candidater: string; link: string }[];
}

interface IQuestionList {
  id: string;
  questionList?: IQuestionInfo[];
}
interface IPromises {
  promiseList?: IQuestionList;
}

interface IUserChoice {
  answer: string;
  candidate: string[];
  link: string;
}

export interface ISelectedData {
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

const SelectPromise = () => {
  const location = useLocation();
  const state: any = location.state || []; // state??? any??? ?????? ???????????? ????????? ?????? ?????????..
  const selectedIdArr = state.promises || [];
  const data = promiseData.promiseList;
  const selectedData = data.filter((item) => selectedIdArr.includes(item.id));
  const [order, setOrder] = useState(0);
  const [qNumber, setQNumber] = useState(0);
  const qList = selectedData[order];
  const navigate = useNavigate();
  const [userChoice, setUserChoice] = useState<IUserChoice[]>([]);

  const answerClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (qList.questionList !== undefined) {
      // ???????????? ???????????? ?????? ????????? ????????? ?????? ???????????? ?????? ????????? ????????? ?????????
      // answerClick??? ?????? ??? ?????? ???????????? ????????? 1??? ?????????
      if (qList.questionList?.length - 1 > qNumber) {
        setQNumber((prev) => prev + 1);
      } else if (qList.questionList?.length - 1 === qNumber) {
        setOrder((prev) => prev + 1);
        setQNumber(0);
      }
      const choose = qList.questionList[qNumber].answerList.filter(
        (list) => list.answer === e.currentTarget.innerHTML
      );
      if (userChoice.length === 0) {
        setUserChoice([choose[0]]);
      } else {
        setUserChoice((prev) => [...prev, choose[0]]);
      }
    }
  };
  const prevBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (qList.questionList !== undefined) {
      if (order === 0 && qNumber === 0) {
        navigate("/");
      } else {
        if (qNumber === 0) {
          setOrder((prev) => prev - 1);
          setQNumber(selectedData[order - 1].questionList.length - 1);
        } else if (qNumber !== 0) {
          setQNumber((prev) => prev - 1);
        }
      }
      const deleteChoiceArr = [...userChoice];
      deleteChoiceArr.pop();
      setUserChoice([...deleteChoiceArr]);
    }
  };

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    }
    if (qList === undefined) {
      navigate("/result", { state: { userChoice, selectedData } });
    }
  }, [order]);

  return (
    <Container>
      {qList !== undefined && (
        <>
          <PartName>{qList.id}</PartName>
          {qList.questionList !== undefined ? (
            <QuestionBox>
              <QuestionName key={qList.questionList[qNumber].qName}>
                {qList.questionList[qNumber].qName}
              </QuestionName>
              <AnswerList>
                {/* ?????? ???????????? ?????? */}
                {qList.questionList[qNumber].answerList
                  .sort(() => Math.random() - 0.5)
                  .map((selector) => (
                    <Answer
                      onClick={answerClick}
                      data-value={selector.candidate}
                      key={selector.answer}
                    >
                      {selector.answer}
                    </Answer>
                  ))}
              </AnswerList>
            </QuestionBox>
          ) : null}
          <PrevBtn onClick={prevBtnClick}>?????? ?????????</PrevBtn>
        </>
      )}
    </Container>
  );
};

export default SelectPromise;
