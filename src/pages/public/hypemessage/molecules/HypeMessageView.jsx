import { Button } from "@/styles/reusable/elements.styled";
import { SubTitle } from "@/styles/reusable/elements.styled";
import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { db } from "@/setup/firebase/firebase";

const HypeMessageView = () => {
  const [hype, setHype] = useState();

  const user = useSelector((state) => state.auth.user);
  const firstname = user.displayName?.split(" ")[0];

  const navigate = useNavigate();

  const { id } = useParams();
  console.log(hype);
  // const idNumber = Number(id);

  useEffect(() => {
    const getSentHype = async () => {
      const sentHypeRef = doc(db, "sentHypes", id);
      const sentHypeSnap = await getDoc(sentHypeRef);
      console.log(sentHypeSnap.data());
      if (sentHypeSnap.exists()) {
        setHype(sentHypeSnap.data());
      } else {
        toast.error("Hype does not exist in our database. :)");
      }
    };
    getSentHype();
  }, []);

  console.log(123);
  return (
    <>
      <HypeMessageCardContainer>
        <HypeMessageCard>
          <SubTitle>You have received a hype from an anonymous star</SubTitle>
          <br />

          <SubTitle>To {hype?.name} with love.</SubTitle>
          <br />
          <p>{hype?.hype}</p>
          <br />
        </HypeMessageCard>
      </HypeMessageCardContainer>
      <HypeMesageFooter>
        {firstname ? (
          <TryHype>
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </TryHype>
        ) : (
          <TryHype>
            <p>Join us to send hypes!</p>
            <Link to="/signup">
              <Button>Try hype</Button>
            </Link>
          </TryHype>
        )}
      </HypeMesageFooter>
    </>
  );
};

export default HypeMessageView;

const HypeMessageCardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  padding: 22px 51px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 37px 24px;
  }
`;
const HypeMessageCard = styled.div`
  margin-top: 50px;
  width: 50%;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    width: 100%;
    padding: 0px 0px;
  }
`;

const HypeMesageFooter = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  width: 100%;
  background-color: #fff;
  margin: auto;
  padding: 20px 51px;
  background: #ffb328;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 20px 24px;
  }
`;

const TryHype = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 36px;
  width: 100%;


  a {
    max-width: 500px;
    width: 30%;
  }
  button {
    max-width: 500px;
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    gap: 8px;
    flex-direction: column;
    justify-content: center;
    a {
      max-width: 500px;
      width: 100%;
    }
    button {
      max-width: 500px;
      width: 100%;
    }
  }
`;
