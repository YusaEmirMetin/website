import React, { useState, useEffect } from 'react'; 
import { Layout, Typography, Divider, Avatar, Button, Space, Drawer, Collapse, Tag, Card, Tooltip } from 'antd'; 
import { GithubOutlined, LinkedinOutlined, RocketOutlined, CodeOutlined, UserOutlined, FilePdfOutlined, ArrowDownOutlined, SendOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import profilResmi from './assets/Vesikalık.png';
import aselsanLogosu from './assets/aselsan.png'; 
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

  const showDrawer = () => setIsDrawerOpen(true);
  const onClose = () => setIsDrawerOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projelerim = [
    {
      id: 1,
      baslik: "DeepFake Speech Generation",
      supervisor: "Prof. Dr. Hakkı Gökhan İlk",
      aciklama: `
    Conducted a comprehensive study on synthetic speech generation and speaker cloning using neural TTS models such as Tacotron2-DDC, HiFi-GAN, and YourTTS. 
    Developed a system capable of converting text into natural-sounding speech and mimicking a target speaker's voice from short audio samples. 
    Analyzed the acoustic structure of generated speech through mel-spectrograms to identify limitations in prosody, breath cues, and emotional variation. 
    Explored these artifacts as potential features for distinguishing synthetic speech from real human voice, contributing to deepfake detection research.`,
      etiketler: ["React", "Flask", "Tacotron2-DDC", "HiFi-GAN", "YourTTS"],
      renk: "purple"
    }
  ];

  const experience = [
    {
      id: 1,
      baslik: "ASELSAN A.Ş",
      logo: aselsanLogosu,
      aciklama: `During my summer internship at ASELSAN within the FPGA Design Team of the Embedded Software Department in the Electro-Optics Division, I gained hands-on experience in FPGA-based system design and development. The internship allowed me to bridge the gap between theoretical knowledge acquired at university and real-world engineering applications in the defense industry.
    Throughout the internship, I worked primarily with VHDL and FPGA technologies using tools such as Quartus Prime Lite Edition for design and synthesis, and ModelSim for simulation and verification. One of my initial tasks was designing a 256x8 RAM module in VHDL, which helped me understand fundamental FPGA concepts such as entity-architecture structure, process blocks, and synchronous read/write operations. Building on this, I developed a hierarchical RAM Controller that initialized and verified memory contents, reinforcing my understanding of modular and hierarchical design.
    I also contributed to more advanced projects related to video processing. I designed a Video Generator capable of producing grayscale video output at a resolution of 640x512 with a refresh rate of 25 Hz, which required precise timing calculations using a 50 MHz clock. In addition, I worked on an Auto Focus system that analyzed image sharpness using line difference methods to automatically adjust focus. Another key project was Histogram Analysis, where I designed a system to calculate pixel intensity distributions using a 256x20 RAM structure, providing valuable insight into image brightness and contrast analysis.
    Through these projects, I strengthened my skills in logic design, VHDL coding, simulation-based verification, and FPGA system architecture. I also enhanced my problem-solving abilities, technical documentation skills, and understanding of real-time embedded systems. Furthermore, by completing an additional FPGA design course independently, I deepened my theoretical knowledge and complemented my practical experience.
    Overall, this internship significantly improved my technical competence in FPGA and embedded system design while providing valuable exposure to professional engineering practices, teamwork, and industry-level development standards in the defense sector.`,
      learning: ["VHDL", "System-Verilog", "Defense Tech"],
      renk: "blue"
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0, fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
      
      {/* MODERN HEADER WITH GLASSMORPHISM */}
      <Header className="modern-header" style={{ 
        position: 'fixed', zIndex: 999, width: '100%', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '0 40px', 
        background: scrollPosition > 50 ? 'rgba(0, 21, 41, 0.95)' : 'rgba(0, 21, 41, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrollPosition > 50 ? '1px solid rgba(24, 144, 255, 0.2)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
          <Avatar size={42} src={profilResmi} style={{ border: '2px solid #1890ff', boxShadow: '0 0 15px rgba(24, 144, 255, 0.3)' }} /> 
          <div style={{ color: 'white', fontSize: '18px', fontWeight: '700', letterSpacing: '0.5px', background: 'linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>YEM</div>
        </div>
        
        <Space size="large">
          <Space>
            <Tooltip title="Open CV">
              <Button 
                type="primary" 
                icon={<FilePdfOutlined />} 
                href="/Yüşa Emir Metin CV.pdf"  
                target="_blank"
                className="header-button"
                style={{ borderRadius: '8px', background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', border: 'none', minWidth: '60px' }}
              >
                CV
              </Button>
            </Tooltip>
            <Button type="text" icon={<GithubOutlined style={{ fontSize: '20px', color: '#69c0ff' }} />} href="https://github.com/YusaEmirMetin" target="_blank" className="social-button" />
            <Button type="text" icon={<LinkedinOutlined style={{ fontSize: '20px', color: '#69c0ff' }} />} href="https://www.linkedin.com/in/yuşa-emir-metin-334982226/" target="_blank" className="social-button" />
          </Space>
        </Space>
      </Header>

      <Content style={{ padding: '0', background: 'linear-gradient(135deg, #f0f2f5 0%, #e6e9f0 100%)' }}>
        {/* HERO SECTION WITH ANIMATIONS */}
        <div className="hero-section" style={{ 
          background: 'linear-gradient(135deg, #001529 0%, #003a8c 50%, #165dff 100%)', 
          color: 'white', 
          padding: '180px 50px 120px 50px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
        }}>
          {/* Animated background elements */}
          <div className="hero-bg-element element-1"></div>
          <div className="hero-bg-element element-2"></div>
          <div className="hero-bg-element element-3"></div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
            <div className="profile-avatar-wrapper" style={{ marginBottom: '30px' }}>
              <Avatar 
                size={140} 
                src={profilResmi} 
                style={{ 
                  border: '4px solid rgba(255,255,255,0.3)', 
                  boxShadow: '0 20px 60px rgba(24, 144, 255, 0.4)',
                }}
              />
            </div>
            <Title className="hero-title" style={{ color: 'white', fontSize: '4rem', marginBottom: '10px', fontWeight: '800', letterSpacing: '-1px' }}>
              Yuşa Emir Metin
            </Title>
            <Text className="hero-subtitle" style={{ color: '#69c0ff', fontSize: '22px', fontWeight: '300', letterSpacing: '3px' }}>
              COMPUTER ENGINEER
            </Text>
            <Paragraph style={{ color: '#e6f7ff', marginTop: '30px', maxWidth: '700px', margin: '30px auto', fontSize: '18px', lineHeight: '1.8', fontWeight: '300' }}>
              Passionate about developing cutting-edge web applications and AI-powered solutions. Specialized in FPGA design and deepfake detection research.
            </Paragraph>
            <Space size="large" style={{ marginTop: '40px' }}>
              <Button 
                type="primary" 
                size="large" 
                onClick={showDrawer} 
                className="hero-button"
                style={{ 
                  borderRadius: '50px', 
                  height: '56px', 
                  padding: '0 50px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                  color: '#001529',
                  border: 'none',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                }}
              >
                Discover More
              </Button>
              <Button 
                type="text" 
                size="large" 
                icon={<ArrowDownOutlined />}
                className="scroll-button"
                style={{ 
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '50px',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}
              />
            </Space>
          </div>

          {/* Animated scroll indicator */}
          <div className="scroll-arrow-container">
            <ArrowDownOutlined className="scroll-arrow" style={{ fontSize: '40px', color: '#ffffff' }} />
          </div>
        </div>

        {/* FOCUS AREAS SECTION */}
        <div className="focus-section" style={{ padding: '100px 50px', background: '#f0f2f5', textAlign: 'center' }}>
          <div className="section-header">
            <Divider><Title level={2} style={{ marginBottom: 0, color: '#001529' }}>🎯 Focus Areas</Title></Divider>
            <Paragraph style={{ color: '#666', fontSize: '16px', marginTop: '10px' }}>My core competencies and areas of expertise</Paragraph>
          </div>
          <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '50px', maxWidth: '1200px', margin: '50px auto 0' }}>
            <Card 
              hoverable 
              className="feature-card"
              style={{ 
                borderRadius: '15px', 
                border: 'none',
                background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }} 
              cover={<div className="card-icon-wrapper" style={{padding: '40px', background: 'linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)'}}><CodeOutlined style={{fontSize: '50px', color: 'white'}}/></div>}
            >
              <Card.Meta title="Web Development" description="Modern React & Full-stack applications with cutting-edge technologies" />
            </Card>
            <Card 
              hoverable 
              className="feature-card"
              style={{ 
                borderRadius: '15px', 
                border: 'none',
                background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }} 
              cover={<div className="card-icon-wrapper" style={{padding: '40px', background: 'linear-gradient(135deg, #52c41a 0%, #85ce61 100%)'}}><RocketOutlined style={{fontSize: '50px', color: 'white'}}/></div>}
            >
              <Card.Meta title="AI & Machine Learning" description="DeepFake detection & synthetic speech generation research" />
            </Card>
            <Card 
              hoverable 
              className="feature-card"
              style={{ 
                borderRadius: '15px', 
                border: 'none',
                background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
                boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }} 
              cover={<div className="card-icon-wrapper" style={{padding: '40px', background: 'linear-gradient(135deg, #faad14 0%, #ffc53d 100%)'}}><CodeOutlined style={{fontSize: '50px', color: 'white'}}/></div>}
            >
              <Card.Meta title="FPGA Design" description="VHDL programming & embedded systems architecture" />
            </Card>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="contact-section" style={{ 
          padding: '100px 50px', 
          background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)',
          textAlign: 'center'
        }}>
          <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <Title level={2} style={{ color: 'white', marginBottom: 0 }}>💬 Get In Touch</Title>
          </Divider>
          <Paragraph style={{ fontSize: '16px', color: '#69c0ff', marginBottom: '50px', marginTop: '20px' }}>
            Have a project in mind? Let's connect and create something amazing together
          </Paragraph>
          
          <div className="contact-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '900px', margin: '0 auto' }}>
            {/* Email Card */}
            <Card 
              hoverable 
              className="contact-card"
              style={{ 
                borderRadius: '15px', 
                border: '1px solid rgba(24, 144, 255, 0.3)',
                background: 'rgba(24, 144, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '15px', color: '#1890ff' }}><MailOutlined /></div>
              <Title level={4} style={{ color: 'white', margin: 0 }}>Email</Title>
              <Button 
                type="link" 
                href="mailto:yusaemirm@email.com" 
                style={{ fontSize: '16px', color: '#69c0ff', textDecoration: 'underline' }}
              >
                yusaemirm@email.com
              </Button>
            </Card>

            {/* Phone Card */}
            <Card 
              hoverable 
              className="contact-card"
              style={{ 
                borderRadius: '15px', 
                border: '1px solid rgba(24, 144, 255, 0.3)',
                background: 'rgba(24, 144, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '15px', color: '#52c41a' }}><PhoneOutlined /></div>
              <Title level={4} style={{ color: 'white', margin: 0 }}>Phone</Title>
              <Button 
                type="link" 
                href="tel:+905555555555" 
                style={{ fontSize: '16px', color: '#69c0ff', textDecoration: 'underline' }}
              >
                +90 555 555 55 55
              </Button>
            </Card>

            {/* Message Card */}
            <Card 
              hoverable 
              className="contact-card"
              style={{ 
                borderRadius: '15px', 
                border: '1px solid rgba(24, 144, 255, 0.3)',
                background: 'rgba(24, 144, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '15px', color: '#faad14' }}><SendOutlined /></div>
              <Title level={4} style={{ color: 'white', margin: 0 }}>Message</Title>
              <Button 
                type="link" 
                href="mailto:yusaemirm@email.com?subject=Project Inquiry" 
                style={{ fontSize: '16px', color: '#69c0ff', textDecoration: 'underline' }}
              >
                Send a message
              </Button>
            </Card>
          </div>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#000', color: 'rgba(255,255,255,0.45)', padding: '50px', fontSize: '14px' }}>
        <div style={{ marginBottom: '15px', color: 'rgba(255,255,255,0.65)' }}>Yuşa Emir Metin ©2026 | Computer Engineer</div>
        <Space>
          <Button type="text" icon={<GithubOutlined />} href="https://github.com/YusaEmirMetin" target="_blank" style={{ color: 'rgba(255,255,255,0.45)' }} />
          <Button type="text" icon={<LinkedinOutlined />} href="https://www.linkedin.com/in/yuşa-emir-metin-334982226/" target="_blank" style={{ color: 'rgba(255,255,255,0.45)' }} />
        </Space>
      </Footer>

      {/* PREMIUM ABOUT ME DRAWER */}
      <Drawer
        title={null} 
        placement="right" 
        onClose={onClose} 
        open={isDrawerOpen} 
        width="100%"
        bodyStyle={{ padding: 0, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', overflowY: 'auto' }}
        className="modern-drawer premium-drawer"
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* HEADER SECTION */}
          <div className="about-header" style={{ 
            background: 'linear-gradient(135deg, #001529 0%, #003a8c 50%, #1890ff 100%)',
            padding: '80px 40px',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="header-bg-glow"></div>
            <Avatar 
              size={160} 
              src={profilResmi} 
              className="about-avatar"
              style={{ 
                border: '5px solid white', 
                marginBottom: '25px', 
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                position: 'relative',
                zIndex: 2
              }} 
            />
            <Title level={1} style={{ color: 'white', margin: 0, fontSize: '2.8rem', fontWeight: '800', marginBottom: '10px', zIndex: 2, position: 'relative' }}>
              About Me
            </Title>
            <Text style={{ color: '#e6f7ff', fontSize: '18px', fontWeight: '300', letterSpacing: '1px', zIndex: 2, position: 'relative', display: 'block' }}>
              Computer Engineer & Innovation Enthusiast
            </Text>
          </div>

          {/* MAIN CONTENT */}
          <div style={{ background: 'white', padding: '80px 50px' }}>
            
            {/* INTRO SECTION */}
            <section className="about-section" style={{ marginBottom: '80px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  👨‍💻
                </div>
                <div>
                  <Title level={2} style={{ margin: 0, color: '#001529', fontSize: '28px' }}>Who Am I?</Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>My journey & passion</Text>
                </div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f7ff 100%)',
                border: '2px solid #e6f7ff',
                borderRadius: '15px',
                padding: '30px',
                lineHeight: '1.9'
              }}>
                <Paragraph style={{ fontSize: '16px', color: '#434343', marginBottom: '20px' }}>
                  I'm Yuşa Emir Metin, a Computer Engineer passionate about building innovative solutions at the intersection of web development, embedded systems, and artificial intelligence. With a strong foundation in both software and hardware, I'm committed to creating impactful technology that solves real-world problems.
                </Paragraph>
                <Paragraph style={{ fontSize: '16px', color: '#434343', marginBottom: 0 }}>
                  My journey began with curiosity about how things work—from transistors to cloud computing. Today, I specialize in designing robust systems, developing intelligent applications, and bridging the gap between hardware and software to create seamless user experiences.
                </Paragraph>
              </div>
            </section>

            {/* SKILLS SHOWCASE */}
            <section className="about-section" style={{ marginBottom: '80px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #52c41a 0%, #85ce61 100%)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  🛠️
                </div>
                <div>
                  <Title level={2} style={{ margin: 0, color: '#001529', fontSize: '28px' }}>Core Skills</Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>Technologies & expertise</Text>
                </div>
              </div>
              <div className="skills-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                <div className="skill-card" style={{
                  background: 'linear-gradient(135deg, #fff5f5 0%, #fff1f1 100%)',
                  border: '2px solid #ffebee',
                  borderRadius: '12px',
                  padding: '25px',
                  transition: 'all 0.3s ease'
                }}>
                  <Title level={4} style={{ color: '#c41d7f', marginBottom: '15px' }}>🌐 Web Development</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Tag color="red" style={{ borderRadius: '6px' }}>React</Tag>
                    <Tag color="red" style={{ borderRadius: '6px' }}>JavaScript/ES6+</Tag>
                    <Tag color="red" style={{ borderRadius: '6px' }}>HTML/CSS</Tag>
                    <Tag color="red" style={{ borderRadius: '6px' }}>Ant Design</Tag>
                  </Space>
                </div>
                <div className="skill-card" style={{
                  background: 'linear-gradient(135deg, #f6f5ff 0%, #ede5ff 100%)',
                  border: '2px solid #f9f0ff',
                  borderRadius: '12px',
                  padding: '25px',
                  transition: 'all 0.3s ease'
                }}>
                  <Title level={4} style={{ color: '#722ed1', marginBottom: '15px' }}>⚙️ Embedded Systems</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Tag color="purple" style={{ borderRadius: '6px' }}>VHDL</Tag>
                    <Tag color="purple" style={{ borderRadius: '6px' }}>SystemVerilog</Tag>
                    <Tag color="purple" style={{ borderRadius: '6px' }}>FPGA Design</Tag>
                    <Tag color="purple" style={{ borderRadius: '6px' }}>Quartus Prime</Tag>
                  </Space>
                </div>
                <div className="skill-card" style={{
                  background: 'linear-gradient(135deg, #f5f5ff 0%, #e6e6ff 100%)',
                  border: '2px solid #f0f0ff',
                  borderRadius: '12px',
                  padding: '25px',
                  transition: 'all 0.3s ease'
                }}>
                  <Title level={4} style={{ color: '#1890ff', marginBottom: '15px' }}>🤖 AI & ML</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Tag color="blue" style={{ borderRadius: '6px' }}>Python</Tag>
                    <Tag color="blue" style={{ borderRadius: '6px' }}>Deep Learning</Tag>
                    <Tag color="blue" style={{ borderRadius: '6px' }}>TensorFlow</Tag>
                    <Tag color="blue" style={{ borderRadius: '6px' }}>Data Analysis</Tag>
                  </Space>
                </div>
              </div>
            </section>

            {/* ACADEMIC PROJECTS */}
            <section className="about-section" style={{ marginBottom: '80px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  🎓
                </div>
                <div>
                  <Title level={2} style={{ margin: 0, color: '#001529', fontSize: '28px' }}>Academic Projects</Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>Research & thesis work</Text>
                </div>
              </div>
              <Collapse accordion ghost expandIconPosition="end" style={{ background: 'transparent' }}>
                {projelerim.map((proje) => (
                  <Collapse.Panel 
                    header={
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #fa8c16 0%, #ffc53d 100%)'
                        }}></div>
                        <Text strong style={{ fontSize: '17px', color: '#001529' }}>{proje.baslik}</Text>
                      </div>
                    } 
                    key={proje.id}
                    className="project-collapse"
                    style={{ marginBottom: '15px', background: 'linear-gradient(135deg, #fffbe6 0%, #fffbe6 100%)', borderRadius: '12px', border: '1px solid #ffe58f', overflow: 'hidden' }}
                  >
                    {proje.supervisor && (
                      <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #ffe58f', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ fontSize: '20px' }}>👨‍🏫</div>
                        <div>
                          <Text strong style={{ fontSize: '14px', color: '#001529', display: 'block' }}>Supervisor</Text>
                          <Text style={{ fontSize: '15px', color: '#434343' }}>{proje.supervisor}</Text>
                        </div>
                      </div>
                    )}

                    <Paragraph style={{ 
                      whiteSpace: 'pre-line', 
                      fontSize: '15px', 
                      color: '#434343',
                      lineHeight: '1.8',
                      marginBottom: '20px'
                    }}>
                      {proje.aciklama}
                    </Paragraph>

                    <div style={{ paddingTop: '15px', borderTop: '2px solid #ffe58f' }}>
                      <Text strong style={{ color: '#001529', fontSize: '14px', display: 'block', marginBottom: '10px' }}>Technologies Used:</Text>
                      <Space wrap>
                        {proje.etiketler.map(etiket => (
                          <Tag 
                            color={proje.renk} 
                            key={etiket} 
                            style={{ borderRadius: '8px', padding: '6px 14px', fontSize: '13px', fontWeight: '600' }}
                          >
                            {etiket}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </section>

            {/* PROFESSIONAL EXPERIENCE */}
            <section className="about-section" style={{ marginBottom: '80px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  💼
                </div>
                <div>
                  <Title level={2} style={{ margin: 0, color: '#001529', fontSize: '28px' }}>Experience</Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>Professional journey</Text>
                </div>
              </div>
              <Collapse accordion ghost expandIconPosition="end" style={{ background: 'transparent' }}>
                {experience.map((exp, idx) => ( 
                  <Collapse.Panel 
                    header={
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {exp.logo && (
                          <img 
                            src={exp.logo} 
                            alt={`${exp.baslik} logo`} 
                            style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#f0f0f0', borderRadius: '8px', padding: '5px' }} 
                          />
                        )}
                        <div>
                          <Text strong style={{ fontSize: '17px', color: '#001529' }}>{exp.baslik}</Text>
                          <Text type="secondary" style={{ fontSize: '13px', display: 'block' }}>Summer Internship 2024</Text>
                        </div>
                      </div>
                    } 
                    key={`exp-${exp.id}`}
                    className="experience-collapse"
                    style={{ marginBottom: '15px', background: 'linear-gradient(135deg, #e6f7ff 0%, #e6f7ff 100%)', borderRadius: '12px', border: '1px solid #91d5ff', overflow: 'hidden' }}
                  >
                    <Paragraph style={{ 
                      whiteSpace: 'pre-line', 
                      fontSize: '15px', 
                      color: '#434343',
                      lineHeight: '1.8',
                      marginBottom: '20px'
                    }}>
                      {exp.aciklama}
                    </Paragraph>

                    <div style={{ paddingTop: '15px', borderTop: '2px solid #91d5ff' }}>
                      <Text strong style={{ color: '#001529', fontSize: '14px', display: 'block', marginBottom: '10px' }}>Key Skills Gained:</Text>
                      <Space wrap>
                        {exp.learning && exp.learning.map(skill => (
                          <Tag 
                            color={exp.renk} 
                            key={skill} 
                            style={{ borderRadius: '8px', padding: '6px 14px', fontSize: '13px', fontWeight: '600' }}
                          >
                            {skill}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </section>

            {/* CALL TO ACTION */}
            <section className="about-section cta-section" style={{ 
              background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)',
              borderRadius: '20px',
              padding: '50px',
              textAlign: 'center',
              color: 'white',
              marginBottom: '60px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <Title level={2} style={{ color: 'white', marginBottom: '15px' }}>Ready to Collaborate?</Title>
                <Paragraph style={{ fontSize: '16px', color: '#e6f7ff', marginBottom: '30px' }}>
                  I'm always interested in hearing about exciting projects and opportunities.
                </Paragraph>
                <Space size="large">
                  <Button 
                    type="primary"
                    size="large"
                    onClick={onClose}
                    style={{
                      background: '#1890ff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      padding: '10px 30px'
                    }}
                  >
                    Back to Home
                  </Button>
                  <Button 
                    type="default"
                    size="large"
                    href="mailto:yusaemirm@email.com"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: '2px solid white',
                      color: 'white',
                      borderRadius: '8px',
                      fontWeight: '600',
                      padding: '10px 30px'
                    }}
                  >
                    Send Email
                  </Button>
                </Space>
              </div>
            </section>

          </div>
        </div>
      </Drawer>
    </Layout>
  );
}

export default App;
