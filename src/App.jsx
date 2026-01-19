import React ,{ useState }from 'react';
import { Layout, Menu, Typography, Divider, Avatar, Button, Space , Modal} from 'antd';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import profilResmi from './assets/Vesikalık.png'; 

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

function App() {
  // Pencerenin (Modal) açık/kapalı durumunu yönetir
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

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
        
        {/* onClick={showModal} eklenerek tıklandığında pencerenin açılması sağlandı */}
        <Menu 
          theme="dark" 
          mode="horizontal" 
          selectable={false} 
          onClick={showModal} 
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

        <div style={{ padding: '50px', textAlign: 'center' }}>
          <Divider>Projeler Çok Yakında</Divider>
          <Paragraph>
            DeepFake Guard ve AI Based DeepFake Speech Generation çalışmalarım tamamlandığında bu alanda sergilenecektir.
          </Paragraph>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        Yuşa Emir Metin ©2026 | Computer Engineer
      </Footer>

      {/* Biyografi Penceresi (Modal) Bileşeni */}
      <Modal 
        title="Hakkımda" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        okText="Kapat"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p><strong>Eğitim:</strong> Bilgisayar Mühendisliği Son Sınıf Öğrencisi</p>
        <p><strong>Uzmanlık Alanları:</strong> Python, React, Yapay Zeka (Deepfake tespiti ve üretimi).</p>
        <p><strong>Devam Eden Çalışmalar:</strong> DeepFake Guard ve Twitter Bot "Who?" projeleri üzerinde çalışmaktayım.</p>
        <p>Aynı zamanda koyu bir Fenerbahçe taraftarıyım ve veri kazıma projelerimde futbol verileriyle uğraşmayı seviyorum.</p>
      </Modal>

    </Layout>
  );
}

export default App;