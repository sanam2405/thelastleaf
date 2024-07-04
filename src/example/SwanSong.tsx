import styled from "styled-components";

const SwanSongContainer = styled.div`
  font-family: "Merriweather", serif;
  color: #333;
  line-height: 1.6;
  max-width: 600px;
  margin: 10px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Paragraph = styled.p`
  margin: 16px 0;
`;

const ItalicText = styled.i`
  font-style: italic;
  color: #555;
`;

const Signature = styled.div`
  text-align: right;
  margin-top: 20px;
  font-family: "Merriweather", serif;
`;

export const SwanSong = () => {
  return (
    <>
      {/* <SwanSongContainer>
        <Paragraph>
          বাকি রয়ে গেলো কলেজের শেষ CIIPPUS দেখা, বাকি রয়ে গেলো কলেজের শেষ
          U-Turn দেখা, শেষ সৃজন দেখা, শেষ সংস্কৃতি দেখা। নাজানি আরো কত না পাওয়া
          - না দেখার ভিড়ে স্বপ্ন গুলোকে কবেই ভাসিয়ে দিয়েছি। একসাথে বড় হওয়ার
          স্বপ্ন, একসাথে বন্ধুত্বের স্বপ্ন। একে অপরকে জানার স্বপ্ন।
        </Paragraph>

        <Paragraph>
          আমার যেটুকু না পাওয়া রয়ে গেলো, সেটুকু মনের গহীন কোনেই পরে রোক। আর
          আমাদের যেটুকু ভালো হওয়ার কথা ছিল, সেটুকু ভালো তোর হোক। এই নোটটির সাথে
          সব ভুলবোঝাবুঝি নির্বাপিত হোক।
        </Paragraph>

        <Paragraph>
          পারলে ক্ষমা করিস। আবার কখনো জন্ম নিলে তোর ক্রোড়েই আমার জন্ম হোক।
        </Paragraph>

        <Paragraph>
          সব শেষে এটুকুই বলার <br />
          <ItalicText>হে সখা, মম হৃদয়ে রহ</ItalicText>
        </Paragraph>

        <Signature>
          মানস <br />
          ৩১ জানুয়ারি, ২০২৪
        </Signature>
      </SwanSongContainer> */}

      <SwanSongContainer>
        <Paragraph>
          What remains is to see the last CIIPPUS of my college life, what
          remains is to see the last U-Turn of my college life, to see the last
          Srijan, to see the last Sanskriti. I don't know how many more dreams
          have been washed away in the crowd of not getting - not seeing. Dreams
          of growing up together, dreams of friendship together. Dreams of
          getting to know each other.
        </Paragraph>

        <Paragraph>
          What I did not get, let it sink into the depths of my mind. And as
          much as we were supposed to be good, be good to you. Let all
          misunderstandings be cleared with this note.
        </Paragraph>

        <Paragraph>
          Forgive me if you can. If I am born again, may I be born in your
          blood.
        </Paragraph>

        <Paragraph>
          That's all I have to say
          <br />
          <ItalicText>O friend, be in my heart</ItalicText>
        </Paragraph>

        <Signature>
          Manas <br />
          Jan 31, 2024
        </Signature>
      </SwanSongContainer>
    </>
  );
};
