import React from "react";
import styled from "styled-components";

const Privacy = () => {
  return (
    <>
      <MainContainer>
        <br />
        <p>
          Welcome to Hype!, a social app that provides a channel for people to
          send positive and inspiring messages to their loved ones. Our app is
          committed to protecting the privacy of our users and their personal
          information. This Privacy Policy outlines the information that we
          collect and how it is used and protected.
        </p>
        <p>
          <b>Information Collection</b> <br />
          <br />
          When you use our app, we may collect the following information:
        </p>
        <ul style={{ listStyle: "inside" }}>
          <li>Phone number </li>
          <li>Name</li>
          <li>Instagram and Twitter usernames</li>
          <li>Location</li>
        </ul>
        <p>
          This information is collected when you create an account with Hype!
          and is used to enhance your user experience, including sending and
          receiving messages, personalizing your account, and improving our app.
        </p>
        <p>
          <b>Use of Information</b> <br />
          <br />
          The information that we collect is used for several purposes,
          including:
        </p>
        <ol style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <li>
            1. To provide our services: We use your information to provide you
            with the services offered through Hype!, including sending and
            receiving messages.
          </li>
          <li>
            2. To improve our services: We use your information to understand
            how our app is being used and make improvements to enhance your
            experience.
          </li>
          <li>
            3. To personalize your experience: We use your information to
            personalize your account and make recommendations for content that
            may be of interest to you.
          </li>
        </ol>
        <p>
          <b> Protection of Information</b>
          <br />
          <br /> Hype! takes the protection of your personal information
          seriously. We use a combination of technical, physical, and
          administrative measures to protect your information from unauthorized
          access and misuse. We regularly review our security measures and
          update them as needed to ensure that your information is protected.
        </p>
        <p>
          <b>Data Retention</b>
          <br />
          <br /> Hype! will retain your information for as long as your account
          is active or as needed to provide you with the services offered
          through our app. We will also retain your information as required by
          law.
        </p>
        <p>
          <b> Changes to Privacy Policy</b> <br />
          <br />
          Hype! may update this Privacy Policy from time to time. If we make any
          changes to this policy, we will notify you by updating the date at the
          top of this policy and, if necessary, by providing you with additional
          notice (such as by adding a statement to our website or sending you an
          email).
        </p>
        <p>
          <b> Contact Us</b> <br />
          <br />
          If you have any questions or concerns about this Privacy Policy or our
          use of your information, please contact us at{" "}
          <a
            href="mailto:support@sharehype.fun"
            target="_blank"
            rel="noopener noreferrer"
          >
            support@sharehype.fun
          </a>
          .
        </p>
        <p>Effective Date: February 13th, 2023</p>
        <p>Last Updated: February 13th, 2023</p>
      </MainContainer>
    </>
  );
};

export default Privacy;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
`;
