import { Button } from "@/styles/reusable/elements.styled";
import { SubTitle } from "@/styles/reusable/elements.styled";
import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { db } from "@/setup/firebase/firebase";
import lovebg from "../../../../assets/hypesbg/lovebg.svg";
import lovebg1 from "../../../../assets/hypesbg/lovebg1.svg";
import birthdaybg from "../../../../assets/hypesbg/birthdaybg.svg";
import birthdaybg1 from "../../../../assets/hypesbg/birthdaybg1.svg";
import Header from "@/layouts/public/partials/Header";

const HypeMessageView = () => {
  const [hype, setHype] = useState();

  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const firstname = user.displayName?.split(" ")[0];
  const [width, setWidth] = useState(window.innerWidth);

  const { id } = useParams();

  let backgroundCover;
  let backgroundSize;
  let backgroundRepeat;
  let backgroundColor;

  switch (hype?.selecthype) {
    case "valentineHypes":
      backgroundCover = width > 768 ? lovebg : lovebg1;
      backgroundSize = width > 768 ? "cover" : "contain";
      backgroundRepeat = width > 768 ? "no-repeat" : "repeat";
      backgroundColor = "#fce9e9";
      break;
    case "birthdayHypes":
      backgroundCover = width > 768 ? birthdaybg : birthdaybg1;
      backgroundSize = width > 768 ? "cover" : "contain";
      backgroundRepeat = width > 768 ? "no-repeat" : "repeat";
      backgroundColor = "#F2D6F9";
      break;
    default:
      backgroundCover = width > 768 ? lovebg : lovebg1;
      backgroundSize = width > 768 ? "cover" : "contain";
      backgroundRepeat = width > 768 ? "no-repeat" : "repeat";
      backgroundColor = "#fce9e9";
  }

  useEffect(() => {
    const getSentHype = async () => {
      const sentHypeRef = doc(db, "sentHypes", id);
      const sentHypeSnap = await getDoc(sentHypeRef);
      if (sentHypeSnap.exists()) {
        setHype(sentHypeSnap.data());
      } else {
        toast.error("Hype does not exist in our database. :)");
      }
    };
    getSentHype();
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <HypeContainer
        style={{
          backgroundImage: `url(${backgroundCover})`,
          width: "100%",
          backgroundSize,
          backgroundRepeat,
          backgroundColor,
        }}
      >
        <Header style={{ background: "#ff0000" }} />
        <HypeMessageCard>
          <SubTitle>
            {hype?.sender === undefined ||
              (hype.sender === null &&
                "You have received a hype from an anonymous star")}
          </SubTitle>
          <br />

          <SubTitle>
            To {hype?.name} with love. {hype?.sender && `From: ${hype?.sender}`}
          </SubTitle>
          <br />
          <p>{hype?.hype}</p>
          <br />
          {location.state?.data === "/admin/sent-hypes" ? (
            <>
              <p>Receiver's Number: {hype?.whatsappnumber}</p>
              <p>Sender: {hype?.sender || "anonymous"}</p>
              <p>
                hypeLink: {`https://sharehype.fun/hype/message/${hype?.docId}`}
              </p>
            </>
          ) : (
            ""
          )}
        </HypeMessageCard>
      </HypeContainer>
      <HypeMesageFooter>
        {firstname ? (
          <TryHype>
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </TryHype>
        ) : (
          <TryHype>
            <p>It's your turn to spread happiness</p>
            <Link to="/signup">
              <Button>Hype someone now</Button>
            </Link>
          </TryHype>
        )}
      </HypeMesageFooter>
    </>
  );
};

export default HypeMessageView;

const HypeContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  background-position: right top;
  min-height: 100vh;
`;
const HypeMessageCard = styled.div`
  margin-top: 50px;
  width: 50%;
  padding: 0px 48px;
  padding-bottom: 150px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    width: 100%;
    height: 100vh;
    padding: 0px 24px;
    padding-bottom: 150px;
  }
`;

const HypeMesageFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
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
