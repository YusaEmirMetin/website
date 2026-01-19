import React, { useState } from 'react'; 
import { Layout, Menu, Typography, Divider, Avatar, Button, Space, Drawer , Collapse, Tag } from 'antd'; 
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons'; //
import profilResmi from './assets/Vesikalık.png'; //

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

  const showDrawer = () => setIsDrawerOpen(true);
  const onClose = () => setIsDrawerOpen(false);

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      
      <Header style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Avatar size={48} src={profilResmi} /> 
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Yuşa Emir Metin</div>
          
          <Space size="middle" style={{ marginLeft: '10px' }}>
            <Button 
              type="link" 
              icon={<GithubOutlined style={{ fontSize: '22px', color: 'white' }} />} 
              href="https://github.com/YusaEmirMetin" 
              target="_blank" 
            />
            <Button 
              type="link" 
              icon={<LinkedinOutlined style={{ fontSize: '22px', color: 'white' }} />} 
              href="https://www.linkedin.com/in/yuşa-emir-metin-334982226/" 
              target="_blank" 
            />
          </Space>
        </div>
        
        <Menu 
          theme="dark" 
          mode="horizontal" 
          selectable={false} 
          onClick={showDrawer} 
          items={[{ key: '1', label: 'Biyografi' }]} 
        />
      </Header>

      <Content style={{ padding: '0', background: '#fff' }}>
        <div style={{ 
          background: '#001529', 
          color: 'white', 
          padding: '100px 50px', 
          textAlign: 'center',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Title style={{ color: 'white', marginBottom: '20px' }}>Yuşa Emir Metin</Title>
          <Text style={{ color: '#aaa', fontSize: '18px' }}>Computer Engineer</Text>
          <Paragraph style={{ color: '#888', marginTop: '20px', maxWidth: '600px', margin: '20px auto' }}>
             Şu an portfolyom üzerinde çalışıyorum. Yakında tamamlanmış projelerimle burada olacağım.
          </Paragraph>
        </div>

        <div style={{ color: '#359aff', padding: '50px', textAlign: 'center' }}>
          <Divider>Projects</Divider>
          <Paragraph>
            DeepFake Guard ve AI Based DeepFake Speech Generation çalışmalarım tamamlandığında bu alanda sergilenecektir.
          </Paragraph>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        Yuşa Emir Metin ©2026 | Computer Engineer
      </Footer>

      {/* TAM EKRAN BİYOGRAFİ (DRAWER) */}
      <Drawer
        title={null} // Kendi başlığımızı içeriye yazacağız
        placement="right"
        onClose={onClose}
        open={isDrawerOpen}
        width="100%"
        bodyStyle={{ 
        padding: 0, 
        background: '#f0f2f5', 
        display: 'flex', 
        flexDirection: 'column' 
          }} 
      >
        <div style={{ flex: 1,
          width: '100%', 
          maxWidth: '1000px', 
          margin: '0 auto', 
          background: '#fff', 
          padding: '60px 40px',
          boxShadow: '0 0 20px rgba(0,0,0,0.05)',
          minHeight: '100vh' }}
        >
          
          {/* ANA BAŞLIK: ORTALI */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Title level={1} style={{ color:'#1890ff', margin: 0 }}>About Me</Title>
            <Text type="secondary">Computer Engineer | Developer | AI Enthusiast</Text>
          </div>

          {/* KISA BİYOGRAFİ */}
          <section style={{ marginBottom: '30px' }}>
            <Title level={4}>👋 Hello</Title>
            <Paragraph style={{ fontSize: '16px' }}>
              I'm Yuşa Emir Metin. I'm a computer engineering student in my final year.
              I focus on artificial intelligence, web scraping, and modern web technologies.
              Currently, I'm conducting research on deepfake technologies.
            </Paragraph>
          </section>

          <Divider />

          {/* TIKLANABİLİR PROJELER (COLLAPSE) */}
          <section style={{ marginBottom: '30px' }}>
            <Title level={4}>🚀 Completed and Ongoing Projects</Title>
            <Collapse accordion ghost expandIconPosition="end">
              
              {/* Proje 1 */}
              <Collapse.Panel header={<strong>DeepFake Guard (Graduation Project)</strong>} key="1">
                <Paragraph>
                  This project aims to detect fake faces and voices in videos using deep learning algorithms. 
                </Paragraph>
                <Space>
                  <Tag color="blue">React</Tag>
                  <Tag color="green">Flask</Tag>
                  <Tag color="orange">PostgreSQL</Tag>
                  <Tag color="purple">Deep Learning</Tag>
                </Space>
              </Collapse.Panel>

              {/* Proje 2 */}
              <Collapse.Panel header={<strong>Twitter Bot "Who?"</strong>} key="2">
                <Paragraph>
                  OpenAI ve Serper.dev API'lerini kullanarak tweetlerde geçen kişileri analiz eden ve bilgi veren akıllı bir asistan.
                </Paragraph>
                <Space>
                  <Tag color="blue">Python</Tag>
                  <Tag color="red">OpenAI</Tag>
                  <Tag color="cyan">API Integration</Tag>
                </Space>
              </Collapse.Panel>

            </Collapse>
          </section>

          <Divider />

          {/* DİĞER BİLGİLER */}
          <section style={{ textAlign: 'center' }}>
            <Title level={4}>🎨 İlgi Alanları</Title>
            <Space size="large">
              <Text><Tag color="blue">Veri Bilimi</Tag></Text>
              <Text><Tag color="black">Yapay Zeka Etiği</Tag></Text>
            </Space>
          </section>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Button type="primary" size="large" onClick={onClose} style={{ borderRadius: '20px', width: '200px' }}>
              Kapat
            </Button>
          </div>

        </div>
      </Drawer>

    </Layout>
  );
}

export default App;