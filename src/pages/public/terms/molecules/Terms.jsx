import React from "react";
import styled from "styled-components";

const Terms = () => {
  return (
    <>
      <MainContainer>
        <br />
        <p>
          Welcome to Hype!, a social tool designed to spread positivity and
          happiness by giving users a channel to send positive messages to
          friends and family. By accessing or using Hype!, you agree to be bound
          by these terms of use (the “Terms”) and our privacy policy. If you do
          not agree to these Terms, do not use Hype!.
        </p>
        <p>
          <b>User Account:</b> To use Hype!, you must create an account. You are
          responsible for maintaining the confidentiality of your account
          information and for all activities that occur under your account.
        </p>
        <p>
          <b>Content:</b> You are solely responsible for the content you send
          through Hype!, including but not limited to text messages, photos, and
          videos (collectively, “Content”). You agree not to upload, post, or
          transmit any Content that is illegal, fraudulent, defamatory,
          offensive, or otherwise violative of any law or regulation.
        </p>
        <p>
          <b> Use of Service:</b> Hype! grants you a limited, non-exclusive,
          non-transferable license to access and use the Service. This license
          is subject to these Terms and does not include: (i) any resale or
          commercial use of Hype! or its Content; (ii) the distribution, public
          performance, or public display of any Content; (iii) modifying or
          otherwise making any derivative uses of Hype! or its Content, or any
          portion thereof; (iv) use of any data mining, robots, or similar data
          gathering or extraction methods; (v) downloading (other than the page
          caching) of any portion of Hype!, or any Content; or (vi) any use of
          Hype! or its Content other than for its intended purpose.
        </p>
        <p>
          <b>Proprietary Rights:</b> Hype! and its Content are protected by
          copyright, trademark, and other laws of the Nigeria and foreign
          countries. You acknowledge and agree that Hype! and its Content,
          including all associated intellectual property rights, are the
          exclusive property of Hype!. You will not remove, alter, or obscure
          any copyright, trademark, service mark, or other proprietary rights
          notices incorporated in or accompanying Hype!.
        </p>
        <p>
          <b> Disclaimer of Warranties:</b> Hype! is provided on an “as is” and
          “as available” basis. Hype! makes no representations or warranties of
          any kind, express or implied, as to the operation of Hype! or the
          information, content, materials, or products included on Hype!. You
          expressly agree that your use of Hype! is at your sole risk.
        </p>
        <p>
          <b> Limitation of Liability:</b> In no event shall Hype! be liable for
          any damages of any kind arising from the use of Hype!, including but
          not limited to direct, indirect, incidental, punitive, and
          consequential damages.
        </p>
        <p>
          <b> Termination:</b> Hype! reserves the right, in its sole discretion,
          to terminate or suspend your access to all or part of Hype! at any
          time, with or without notice and with or without cause.
        </p>
        <p>
          <b> Modification of Terms:</b> Hype! reserves the right, in its sole
          discretion, to modify these Terms at any time. Any changes to these
          Terms will be posted on the Hype! website, and your continued use of
          Hype! after such changes have been posted constitutes your agreement
          to the modified Terms.
        </p>
        <p>
          <b> Governing Law: </b>These Terms and your use of Hype! will be
          governed by and construed in accordance with the laws of Nigeria,
          without giving effect to any principles of conflicts of law.
        </p>
        <p>
          <b>Dispute Resolution: </b>Any dispute arising out of or related to
          these Terms or Hype! shall be resolved through binding arbitration in
          accordance.
        </p>
      </MainContainer>
    </>
  );
};

export default Terms;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
`;
