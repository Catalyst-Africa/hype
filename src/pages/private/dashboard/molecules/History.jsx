import { FluidTitle } from "@/styles/reusable/elements.styled";
import { SubTitle } from "@/styles/reusable/elements.styled";
import React, { useEffect } from "react";
import styled from "styled-components";
import { MdEditNote } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { BiEnvelope } from "react-icons/bi";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "@/setup/firebase/firebase";
import { useState } from "react";
import { Link } from "react-router-dom";

const History = () => {
  const user = useSelector((state) => state.auth.user);
  const [hype, setHype] = useState();
  const [receivedHype, setReceivedHype] = useState();
  useEffect(() => {
    const sentHype = [];
    const receivedHype = [];
    const getUserSentHype = async () => {
      // Create a reference to the sentHypes collection
      const q = query(
        collection(db, "sentHypes"),
        where("userId", "==", user?.uid),
      );

      // Create a query against the collection.
      const hypeCountDoc = await getDocs(q);
      hypeCountDoc.forEach((doc) => {
        console.log(doc.data());
        sentHype.push(doc.data());
      });

      // Create a reference to query sentHype collection for whatsapp
      const qWhatsapp = query(
        collection(db, "sentHypes"),
        where("whatsappnumber", "==", user?.phoneNumber),
      );

      const sentHypeCountDoc = await getDocs(qWhatsapp);
      sentHypeCountDoc.forEach((doc) => {
        receivedHype.push(doc.data());
      });

      setHype(sentHype);
      setReceivedHype(receivedHype);
    };
    getUserSentHype();
  }, []);

  return (
    <HistoryContainer>
      <SubTitle>Hype History</SubTitle>

      <HistoryCardContainer>
        {/* <HistoryCard>
          <SubTitle>Draft</SubTitle>
          <SubTitleDivider style={{ background: " #4adcd3" }}></SubTitleDivider>
          <NumberStats>
            <NumberStatsIcon style={{ background: "rgba(74, 220, 211, 0.22)" }}>
              <MdEditNote color="#4ADCD3" size={16} />
            </NumberStatsIcon>
            <FluidTitle>0</FluidTitle>
          </NumberStats>
        </HistoryCard> */}
        <Link to="/sent-hypes">
          <HistoryCard>
            <SubTitle>Sent Hypes</SubTitle>
            <SubTitleDivider
              style={{ background: "#07B519" }}
            ></SubTitleDivider>
            <NumberStats>
              <NumberStatsIcon style={{ background: "rgba(7, 181, 25, 0.22)" }}>
                <BsCheck color="#07B519" size={16} />
              </NumberStatsIcon>
              <FluidTitle>{hype?.length || 0}</FluidTitle>
            </NumberStats>
          </HistoryCard>
        </Link>

        <Link to="/recieved-hypes">
          <HistoryCard>
            <SubTitle>Received Hypes</SubTitle>
            <SubTitleDivider
              style={{ background: "#FFB328" }}
            ></SubTitleDivider>
            <NumberStats>
              <NumberStatsIcon
                style={{ background: "rgba(238, 174, 10, 0.22)" }}
              >
                <BiEnvelope color="#FFB328" size={16} />
              </NumberStatsIcon>
              <FluidTitle>{receivedHype?.length || 0}</FluidTitle>
            </NumberStats>
          </HistoryCard>
        </Link>
      </HistoryCardContainer>
    </HistoryContainer>
  );
};

export default History;

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;

  a {
    width: 100%;
  }
`;

const HistoryCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 124px;
  width: 100%;
  white-space: nowrap;

  ${({ theme }) => theme.breakpoints.down("xl")} {
    gap: 24px;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;
const HistoryCard = styled.div`
  background: rgba(255, 255, 255, 0.93);
  box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.13);
  border-radius: 5px;
  width: 100%;
  padding: 15px 38px;
  display: inline-block;
  h6 {
    font-size: 16px;
  }
`;

const SubTitleDivider = styled.div`
  width: 19px;
  height: 3px;
  box-shadow: 0px 0px 9px -2px rgba(0, 0, 0, 0.13);
  border-radius: 5px;
  margin-top: 2px;
`;

const NumberStats = styled.div`
  display: flex;
  gap: 21px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const NumberStatsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;
