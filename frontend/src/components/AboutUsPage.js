import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled components
const Container = styled.div`
  background-color: #fff;
  max-width: 60%;
  margin: 20px auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease; /* Fade-in animation */
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #060606;
  margin-bottom: 30px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ContactInfo = styled.div`
  background-color: #e6dada;
  padding: 30px;
  text-align: center;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ContactTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #0e0c0c;
  margin-bottom: 10px;
`;

const ContactDetails = styled.p`
  font-size: 16px;
  color: black;
`;

function AboutUsPage() {
  return (
    <Container>
      {/* About Digital Library */}
      <Title>About Digital Library</Title>
      <Description>
        A digital library is a modern information resource that stores and provides access to digital content, such as e-books, academic papers, multimedia, and databases, accessible through electronic devices connected to the internet. These libraries offer numerous advantages, including enhanced accessibility, convenience, powerful search capabilities, preservation of rare materials, interactivity, collaboration opportunities, and cost-effectiveness. However, they also face challenges related to copyright, digital preservation, and the digital divide. In summary, digital libraries have revolutionized information access and management, becoming essential tools for students, researchers, educators, and anyone seeking knowledge in the digital age. Their role in our information landscape is expected to grow as technology continues to advance.
      </Description>

      {/* About Disha College */}
      <Title>About Disha College</Title>
      <Description>
        Disha College is located in Raipur, the capital of Chhattisgarh. Disha College is managed by Disha Education Society. The Society is promoted by Shri S.K Jain, an eminent industrialist in this region having a vision of promoting quality education in this area. Purpose of Disha is a perpetual conscientious effort, it is a revolution of thoughts, it is a learning process to implement knowledge with wisdom in welfare of personal life, social life and for the universe with the Motto of "Learning with Conscience". Disha College offers a number of courses as per the syllabus of Pt. Ravishankar Shukla University, Raipur (C.G), with the Vision to build leaders of the future by imparting meaningful & conscientious learning process to provide proper direction, momentum to their creativity and to imbue willpower to achieve. The society looks forward to establishing an August temple of learning to educate & train people to become conscientious performers and to reach the pinnacle of glory. Mission of Disha is a relentless pursuit and postulation, for embedding harmony and co-existence as the essence of living of man and universe.
      </Description>
      <br />
      <Image src="/images/dc.jpg" alt="Disha College Campus" /><br />


      {/* About Society */}
      <Title>About Society</Title>
      <Description>
        Disha Education Society was established in the year 2001 by philanthropist Shri Surendra Jain (S.K. Jain). The dream of an individual has become the dream of the group of industrialists & academicians. The Aim of the Society is to impart higher education with conscience. Since its inception, the society has been successfully running undergraduate and postgraduate courses in emerging areas through DISHA College, affiliated to Pt. Ravi Shankar Shukla University, Raipur and for technical education; it is affiliated to Chhattisgarh Swami Vivekananda Technical University, Bhilai. The Society has undertaken commendable welfare activities in the field of education and started DSM, DSME, DBS, DCMS, DCHSS, Disha International, DARE Disha Jobs & Call Center Training Programs, Industry Institute Interface, and MDPs. Now we are stepping towards becoming a 'University' and various vocational training programs.
      </Description>

      {/* Contact Information */}
      <ContactInfo>
        <ContactTitle>Contact Us</ContactTitle>
        <ContactDetails>
          <h2>DISHA PARK CAMPUS</h2><br />
          <i className="fas fa-map-marker fa-icon"></i> Address:
          Building 1, First Floor, Ram Nagar - Kota Marg, Behind NIT and Hotel Piccadilly, Raipur - 492003<br />
          <i className="fa-solid fa-phone "></i> Mobile No.: 0771-4349400 <br />
          <i className="fas fa-envelope fa-icon"></i> Email: principal.dishacollege@dishamail.com
        </ContactDetails>
      </ContactInfo>
    </Container>
  );
}

export default AboutUsPage;
