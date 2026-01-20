import React, { useState } from 'react'; 
import { Layout, Menu, Typography, Divider, Avatar, Button, Space, Drawer, Collapse, Tag, Card, Tooltip } from 'antd'; 
import { GithubOutlined, LinkedinOutlined, RocketOutlined, CodeOutlined, UserOutlined, FilePdfOutlined} from '@ant-design/icons';
import profilResmi from './assets/Vesikalık.png';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

  const showDrawer = () => setIsDrawerOpen(true);
  const onClose = () => setIsDrawerOpen(false);
  const projelerim = [
  {
    id: 1,
    baslik: "DeepFake Speech Generation",
    supervisor: "Prof. Dr. Hakkı Gökhan İlk",
    aciklama: `
    Conducted a comprehensive study on synthetic speech generation and speaker cloning using neural TTS models such as Tacotron2-DDC, HiFi-GAN, and YourTTS. 
    Developed a system capable of converting text into natural-sounding speech and mimicking a target speaker’s voice from short audio samples. 
    Analyzed the acoustic structure of generated speech through mel-spectrograms to identify limitations in prosody, breath cues, and emotional variation. 
    Explored these artifacts as potential features for distinguishing synthetic speech from real human voice, contributing to deepfake detection research.`,
    etiketler: ["React", "Flask", "AI"],
    renk: "purple"
  },
  {
    id: 2,
    baslik: "Twitter Bot 'Who?'",
    aciklama: "OpenAI API ile tweet analizi yapan akıllı asistan.",
    etiketler: ["Python", "OpenAI"],
    renk: "orange"
  },
  {
    id: 3,
    baslik: "FLTurkey Scraper",
    aciklama: "Süper Lig verilerini çeken veri kazıma aracı.",
    etiketler: ["Python", "BeautifulSoup"],
    renk: "gold"
  }
];

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', margin: 0, padding: 0, fontFamily: "'Inter', sans-serif" }}>
      
      {/* ŞEFFAF VE MODERN HEADER */}
      <Header style={{ 
        position: 'fixed', zIndex: 1, width: '100%', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '0 50px', background: 'rgba(0, 21, 41, 0.8)', backdropFilter: 'blur(10px)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Avatar size={42} src={profilResmi} style={{ border: '2px solid #1890ff' }} /> 
          <div style={{ color: 'white', fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px' }}>Yuşa Emir Metin</div>
        </div>
        
        <Space size="large">
          <Space>
            <Tooltip title="CV">
              <Button 
                type="primary" 
                icon={<FilePdfOutlined />} 
                href="/Yüşa Emir Metin CV.pdf" 
                target="_blank"
                style={{ borderRadius: '6px' }}
              />
            </Tooltip>
            <Button type="text" icon={<GithubOutlined style={{ fontSize: '20px', color: 'white' }} />} href="https://github.com/YusaEmirMetin" target="_blank" />
            <Button type="text" icon={<LinkedinOutlined style={{ fontSize: '20px', color: 'white' }} />} href="https://www.linkedin.com/in/yuşa-emir-metin-334982226/" target="_blank" />
          </Space>
        </Space>
      </Header>

      <Content style={{ padding: '0', background: '#f0f2f5' }}>
        {/* HERO SECTION: GRADIENT VE HAREKETLİ GÖRÜNÜM */}
        <div style={{ 
          background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)', 
          color: 'white', padding: '160px 50px 100px 50px', textAlign: 'center',
          clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' // Hafif eğimli alt kesim
        }}>
          <Title style={{ color: 'white', fontSize: '3.5rem', marginBottom: '10px' }}>Yuşa Emir Metin</Title>
          <Text style={{ color: '#69c0ff', fontSize: '20px', fontWeight: '300', letterSpacing: '2px' }}>COMPUTER ENGINEER</Text>
          <Paragraph style={{ color: '#d9d9d9', marginTop: '30px', maxWidth: '700px', margin: '30px auto', fontSize: '18px', lineHeight: '1.6' }}>
             I'm developing modern web applications and AI-powered solutions.
          </Paragraph>
          <Button type="primary" size="large" onClick={showDrawer} style={{ marginTop: '20px', borderRadius: '50px', height: '50px', padding: '0 40px' }}>
            More information
          </Button>
        </div>

        {/* ANA SAYFA PROJE ÖZETİ */}
        <div style={{ padding: '80px 50px', textAlign: 'center' }}>
          <Divider><Title level={2}>Focus Areas </Title></Divider>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginTop: '40px' }}>
            <Card hoverable style={{ width: 300, borderRadius: '15px' }} cover={<div style={{padding: '30px'}}><CodeOutlined style={{fontSize: '40px', color: '#1890ff'}}/></div>}>
              <Card.Meta title="Undergraduate Resarch" description="AI Based DeepFake Speech Generation" />
            </Card>
            <Card hoverable style={{ width: 300, borderRadius: '15px' }} cover={<div style={{padding: '30px'}}><RocketOutlined style={{fontSize: '40px', color: '#52c41a'}}/></div>}>
              <Card.Meta title="Artificial Intelligence" description="Deepfake tespiti ve NLP tabanlı bot projeleri." />
            </Card>
          </div>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#001529', color: 'rgba(255,255,255,0.45)', padding: '40px' }}>
        Yuşa Emir Metin ©2026 | Computer Engineer.
      </Footer>

      {/* MODERNIZE EDİLMİŞ DRAWER */}
      <Drawer
        title={null} placement="right" onClose={onClose} open={isDrawerOpen} width="100%"
        bodyStyle={{ padding: 0, background: '#f0f2f5' }}
      >
        <div style={{ maxWidth: '900px', margin: '40px auto', background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
          <div style={{ background: '#1890ff', padding: '60px 40px', textAlign: 'center', color: 'white' }}>
            <Avatar size={120} src={profilResmi} style={{ border: '4px solid white', marginBottom: '20px' }} />
            <Title level={1} style={{ color: 'white', margin: 0 }}>About Me</Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>A Productive Engineer</Text>
          </div>

          <div style={{ padding: '40px' }}>
            <section>
              <Title level={3}><UserOutlined /> Profile</Title>
              <Paragraph style={{ fontSize: '17px', color: '#434343' }}>
                I'm Yuşa Emir Metin ... 
              </Paragraph>
            </section>

            <Divider />

            <section>
              <Title level={3}>Projects</Title>
              <Collapse accordion ghost expandIconPosition="end">
                {projelerim.map((proje) => (
                  <Collapse.Panel 
                    header={
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>{proje.baslik}</Text>
                        {/* Eğer altBaslik varsa burada görünür */}
                        {proje.altBaslik && <Text type="secondary" style={{ fontSize: '12px' }}>{proje.altBaslik}</Text>}
                      </div>
                    } 
                    key={proje.id}
                    style={{ marginBottom: '15px', background: '#fafafa', borderRadius: '8px' }}
                  >
                    {/* HOCANIN ADINI BURADA GÖSTERİYORUZ */}
                    {proje.supervisor && (
                      <div style={{ marginBottom: '12px' }}>
                        <Text strong style={{ fontSize: '15px' }}>Supervisor: </Text>
                        <Text style={{ fontSize: '15px' }}>{proje.supervisor}</Text>
                        <Divider style={{ margin: '10px 0' }} />
                      </div>
                    )}

                    {/* AKADEMİK AÇIKLAMA */}
                    <Paragraph style={{ 
                      whiteSpace: 'pre-line', 
                      fontSize: '15px', 
                      color: '#434343',
                      lineHeight: '1.6'
                    }}>
                      {proje.aciklama}
                    </Paragraph>

                    <Space wrap style={{ marginTop: '10px' }}>
                      {proje.etiketler.map(etiket => (
                        <Tag color={proje.renk} key={etiket} style={{ borderRadius: '4px' }}>
                          {etiket}
                        </Tag>
                      ))}
                    </Space>
                  </Collapse.Panel>
                ))}
              </Collapse>
            </section>

            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <Button type="primary" shape="round" size="large" onClick={onClose} style={{ width: '180px' }}>Close</Button>
            </div>
          </div>
        </div>
      </Drawer>
    </Layout>
  );
}

export default App;