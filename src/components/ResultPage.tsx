import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.mainBgColor};
  overflow-x: hidden;
  cursor: default;
`;

const CandidateImg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
`;

const ResultName = styled.h1`
  width: 90%;
  text-align: center;
  margin: 0.3rem 0;
  margin-top: 5rem;
  color: ${(props) => props.theme.colors.accentColorPurple};
`;

const ResultSupport = styled.h2`
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.accentColorDarkPurple};
`;

const ShareBtnBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  button {
    outline: none;
    border: none;
    background-color: transparent;
    width: 40px;
    height: 40px;
    padding: 0;
    margin: 0 0.5rem;
    background-color: ${(props) => props.theme.colors.btnColor};
    border: 1px solid ${(props) => props.theme.colors.subBgColor};
    border-radius: 50%;
    box-shadow: ${(props) => props.theme.shadow.clickedBtn};
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
`;

const RestartBtn = styled.div`
  margin-bottom: 5rem;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.colors.btnColor};
  border: 1px solid ${(props) => props.theme.colors.subBgColor};
  color: ${(props) => props.theme.colors.accentColorDarkPurple};
  box-shadow: ${(props) => props.theme.shadow.clickedBtn};
  padding: 5px 7px;
  cursor: pointer;
`;

const ResultBoxes = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  width: 90%;
  height: 40vh;
`;

const ResultCard = styled.div`
  background-color: ${(props) => props.theme.colors.whiteColor};
  padding: 0.5rem;
  box-shadow: ${(props) => props.theme.shadow.clickedBtn};
  position: relative;
  overflow: hidden;
`;
const ResultCardImg = styled(CandidateImg)<{ bgPhoto: string }>`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.bgPhoto});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const MyResultBox = styled.div`
  border: 2px solid ${(props) => props.theme.colors.subBgColor};
  width: 90%;
  padding: 3rem 0;
  h2 {
    color: ${(props) => props.theme.colors.accentColorDarkPurple};
    padding: 0.6rem;
  }
  h4 {
    padding: 0 1.5rem;
    margin-bottom: 2rem;
  }
`;

const MyAnswer = styled.ul`
  display: flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.font.basicFont};
  font-weight: bold;
  border-bottom: 1px solid ${(props) => props.theme.colors.subBgColor};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  li {
    padding: 0.5rem;
    padding-left: 1rem;
    overflow-wrap: break-word;
    h3 {
      padding-bottom: 0.3rem;
      line-height: 120%;
      a {
        color: ${(props) => props.theme.colors.accentColorDarkPurple};
      }
    }
  }
`;

const Connect = styled.h4`
  a {
    color: black;
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
  candidate: string[];
  part: string;
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

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 외부 경로에서 들어와서 state에 값이 없을 경우에는 일단 다 빈 배열로 만들고
  // useEffect를 작동시켜서 첫 페이지로 돌려보낸다
  const state: any = location.state || [];
  const userChoice = state.userChoice || [];
  const selectedData = state.selectedData || [];
  const [selector, setSelector] = useState<string | string[]>(""); // 전체 최다 득표 후보자
  const [selectorPer, setSelectorPer] = useState("");
  // 파트별 최다 득표 후보자
  const [candidate, setCandidate] = useState<
    { part: string; freCandidate: string }[]
  >([]);
  //원래는 click으로 하려고 했음
  // const onePickClick = (e: React.MouseEvent<HTMLDivElement>) => {
  // const part = e.currentTarget.dataset.value;
  // let obj: any = {};
  // userChoice.map((choiced: any) => {
  //   if (choiced.part === part) {
  //     obj[choiced.candidate] = (obj[choiced.candidate] || 0) + 1;
  //   }
  // });
  // const frequency: number[] = Object.values(obj);
  // const freCandidate = Object.keys(obj).find((key: string) => {
  //   return obj[key] === Math.max(...frequency);
  // });
  // setCandidate((prev: any) => [...prev, { part: part, freCandidate }]);
  // };
  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    }
  }, []);

  // 카카오톡 공유하기
  const shareKakao = () => {
    window.Kakao.Link.sendCustom({
      templateId: 72020,
    });
  };

  // 링크 공유하기
  const shareLink = async () => {
    try {
      await navigator.clipboard
        .writeText("https://jindanpolicy.netlify.app/")
        .then(() => {
          alert("링크가 클립보드에 복사되었습니다.");
        });
    } catch (error) {
      alert("다시 시도해주세요.");
    }
  };

  // 다시 시작히기
  const restartBtn = () => {
    navigate("/");
  };

  useEffect(() => {
    let ChoicedCandidate: IChoicedCandidate = {
      이재명: 0,
      윤석열: 0,
      심상정: 0,
      안철수: 0,
      없음: 0,
    };

    let obj: any = {};
    for (let i = 0; i < selectedData.length; i++) {
      userChoice.forEach((cand: ICand) => {
        // 원픽 부분 설정하기.
        if (cand.part === selectedData[i].id) {
          cand.candidate.map((c: any) => (obj[c] = (obj[c] || 0) + 1));
        }
        // 최다득표 후보 보여주기
        cand.candidate.map((c: any) => {
          switch (c) {
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
              break;
            case "없음":
              ChoicedCandidate.없음 = ChoicedCandidate.없음 + 1;
              break;
          }
        });
      });
      const frequency: number[] = Object.values(obj);
      const freCandidate = Object.keys(obj).filter((key: string) => {
        return obj[key] === Math.max(...frequency);
      });
      const partCandidate = freCandidate.join();
      setCandidate((prev: any) => [
        ...prev,
        { part: selectedData[i].id, freCandidate: partCandidate },
      ]);
    }
    //
    let arr = Object.values(ChoicedCandidate);
    const maxVoted = Math.max(...arr);
    // 원래는 find로 찾았지만 같은 점수를 받은 후보가 2명 이상일 경우를 위해 filter 사용
    const maxCandidate = Object.keys(ChoicedCandidate).filter((key: string) => {
      return ChoicedCandidate[key] === maxVoted;
    });
    // 후보가 중복될 경우
    setSelector(maxCandidate.join());
    setSelectorPer(
      (((maxVoted / userChoice.length) * 100) / selectedData.length).toFixed(2)
    );
  }, []);

  return (
    <Container>
      <CandidateImg>
        <ResultName>{selector}</ResultName>
        <ResultSupport>공약 지지율 : {selectorPer}%</ResultSupport>
        <ShareBtnBox>
          <button onClick={shareKakao}>
            <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
              alt="카카오링크 보내기 버튼"
            />
          </button>
          <button onClick={shareLink}>🔗</button>
        </ShareBtnBox>
        <RestartBtn onClick={restartBtn}>다시하기</RestartBtn>
        <ResultBoxes
          // 반응형
          style={{
            gridTemplateRows: `repeat(${
              selectedData.length % 2 !== 0
                ? selectedData.length / 2 + 1
                : selectedData.length / 2
            }, 1fr)`,
          }}
        >
          {selectedData.map((data: ISelectedData) => (
            <ResultCard key={data.id}>
              <h3>{data.id} 부문</h3>
              {candidate.map((pick) =>
                pick.part === data.id ? (
                  <>
                    <span key={pick.part}>나의 원픽 :{pick.freCandidate}</span>
                    <ResultCardImg
                      bgPhoto={`image/${pick.freCandidate}.png`}
                    ></ResultCardImg>
                  </>
                ) : null
              )}
            </ResultCard>
          ))}
        </ResultBoxes>
      </CandidateImg>
      <MyResultBox>
        <h2>📝나의 답변 현황</h2>
        <h4>클릭하시면 정책 관련 사이트로 연결됩니다</h4>
        <MyAnswer>
          {userChoice.map((choice: any) => (
            <>
              {choice.link !== "" && (
                <li key={choice.answer}>
                  <h3>📌</h3>
                  <h3>
                    <a href={choice.link}>{choice.answer}</a>
                  </h3>
                </li>
              )}
            </>
          ))}
        </MyAnswer>
        <h4
          style={{
            fontFamily: "MaruBuri-Regular",
            fontWeight: "bold",
          }}
        >
          본 테스트에 기재된 모든 텍스트들은 실시간으로 변화하는 후보들의 정책
          방향을 반영하지 않습니다. 따라서 열람 시각에 따라 사실관계가 다를 수
          있으니 이점 참고하시어 재미로만 테스트에 임해주시면 감사하겠습니다.
        </h4>
        <Connect>
          웹에서 문제를 발견하시면
          <br />
          <a href="https://github.com/userJu/2022-presidential-promise-self-test-kit">
            👉 GitHub을 통해 연락주세요
          </a>
        </Connect>
      </MyResultBox>
    </Container>
  );
};

export default ResultPage;
