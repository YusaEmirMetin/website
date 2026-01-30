import React, { useState, useEffect } from 'react'; 
import { Layout, Typography, Divider, Avatar, Button, Space, Drawer, Collapse, Tag, Card, Tooltip, Input, List, Form, message, Switch, Spin, Modal, Select } from 'antd'; 
import { GithubOutlined, LinkedinOutlined, RocketOutlined, CodeOutlined, UserOutlined, FilePdfOutlined, ArrowDownOutlined, SendOutlined, PhoneOutlined, MailOutlined, StarOutlined, LinkOutlined, EyeOutlined, ForkOutlined } from '@ant-design/icons';
import profilResmi from './assets/Vesikalık.png';
import aselsanLogosu from './assets/aselsan.png'; 
import './App.css';
import './portfolio.css';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

  const showDrawer = () => setIsDrawerOpen(true);
  const onClose = () => setIsDrawerOpen(false);

  // Language toggle (en / tr) persisted in localStorage
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Guestbook state (localStorage-backed)
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem('guestbook') || '[]'); } catch { return []; }
  });
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    localStorage.setItem('guestbook', JSON.stringify(entries));
  }, [entries]);

  // Portfolio state & GitHub integration
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [featuredRepoIds, setFeaturedRepoIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('featuredRepos') || '[]'); } catch { return []; }
  });

  // UI: search, filter, sort
  const [repoSearch, setRepoSearch] = useState('');
  const [repoLangFilter, setRepoLangFilter] = useState(null);
  const [repoSort, setRepoSort] = useState('updated'); // 'updated' or 'stars'

  // Modal for repo details
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRepo, setModalRepo] = useState(null);
  const [modalReadme, setModalReadme] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  const showPortfolio = () => setIsPortfolioOpen(true);
  const closePortfolio = () => setIsPortfolioOpen(false);

  useEffect(() => {
    localStorage.setItem('featuredRepos', JSON.stringify(featuredRepoIds));
  }, [featuredRepoIds]);

  useEffect(() => {
    if (!isPortfolioOpen) return;
    const fetchRepos = async () => {
      setReposLoading(true);
      try {
        const res = await fetch('https://api.github.com/users/YusaEmirMetin/repos?per_page=100&sort=updated');
        if (!res.ok) throw new Error('GitHub fetch failed');
        const data = await res.json();
        setRepos(data);
      } catch (e) {
        console.error(e);
        message.error(lang === 'tr' ? 'GitHub verileri alınamadı.' : 'Failed to load GitHub repos.');
      } finally {
        setReposLoading(false);
      }
    };
    fetchRepos();
  }, [isPortfolioOpen, lang]);

  const toggleFeature = (repoId) => {
    setFeaturedRepoIds(prev => {
      const next = prev.includes(repoId) ? prev.filter(id => id !== repoId) : [repoId, ...prev];
      return next;
    });
  };

  const openRepoModal = async (repo) => {
    setModalRepo(repo);
    setModalOpen(true);
    setModalReadme('');
    setModalLoading(true);
    try {
      const res = await fetch(`https://api.github.com/repos/YusaEmirMetin/${repo.name}/readme`, { headers: { Accept: 'application/vnd.github.v3.raw' } });
      if (!res.ok) throw new Error('readme-fetch-failed');
      const text = await res.text();
      setModalReadme(text);
    } catch (e) {
      setModalReadme(lang === 'tr' ? 'README alınamadı.' : 'README not available.');
    } finally {
      setModalLoading(false);
    }
  };

  const closeRepoModal = () => {
    setModalOpen(false);
    setModalRepo(null);
    setModalReadme('');
  };

  // Derived lists
  const repoLanguages = Array.from(new Set(repos.map(r => r.language).filter(Boolean)));

  const filteredRepos = repos
    .filter(r => (!repoLangFilter || r.language === repoLangFilter))
    .filter(r => r.name.toLowerCase().includes(repoSearch.toLowerCase()) || (r.description || '').toLowerCase().includes(repoSearch.toLowerCase()));

  const sortedRepos = [...filteredRepos].sort((a,b) => {
    if (repoSort === 'stars') return b.stargazers_count - a.stargazers_count;
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);

  const handleGuestSubmit = (values) => {
    const name = values.name;
    const messageText = values.message;
    if (!name || !name.trim() || !messageText || !messageText.trim()) {
      message.error(lang === 'tr' ? 'İsim ve mesaj gerekli.' : 'Name and message are required.');
      return;
    }
    const newEntry = { name: name.trim(), message: messageText.trim(), date: new Date().toISOString() };
    setEntries(prev => [newEntry, ...prev]);
    form.resetFields();
    setGuestName('');
    setGuestMessage('');
    message.success(lang === 'tr' ? 'Teşekkürler! Geri bildiriminiz kaydedildi.' : 'Thanks! Your feedback has been saved.');
  };

  const translations = {
    en: {
      aboutTitle: 'About Me',
      subtitle: 'Computer Engineer & Innovation Enthusiast',
      whoAmI: 'Who Am I?',
      journey: 'My journey & passion',
      intro1: "I'm Yuşa Emir Metin, a Computer Engineer passionate about building innovative solutions at the intersection of web development, embedded systems, and artificial intelligence. With a strong foundation in both software and hardware, I'm committed to creating impactful technology that solves real-world problems.",
      intro2: "My journey began with curiosity about how things work—from transistors to cloud computing. Today, I specialize in designing robust systems, developing intelligent applications, and bridging the gap between hardware and software to create seamless user experiences.",
      guestbookTitle: 'Guestbook',
      guestbookSub: 'Leave feedback or a short note — I read everything.',
      guestbookPlaceholderName: 'Your name',
      guestbookPlaceholderMessage: 'Leave a message...',
      guestbookSubmit: 'Send',
      guestbookNoEntries: 'No messages yet.',
      guestbookNameRequired: 'Please enter your name.',
      guestbookMessageRequired: 'Please enter a message.',
      guestbookThanks: 'Thanks! Your feedback has been saved.',

      // Hero & site
      heroSubtitle: 'COMPUTER ENGINEER',
      heroParagraph: 'Passionate about developing cutting-edge web applications and AI-powered solutions. Specialized in FPGA design and deepfake detection research.',
      discoverMore: 'Discover More',

      // Focus
      focusTitle: '🎯 Focus Areas',
      focusSub: 'My core competencies and areas of expertise',
      card1Title: 'Web Development',
      card1Desc: 'Modern React & Full-stack applications with cutting-edge technologies',
      card2Title: 'AI & Machine Learning',
      card2Desc: 'DeepFake detection & synthetic speech generation research',
      card3Title: 'FPGA Design',
      card3Desc: 'VHDL programming & embedded systems architecture',

      // Contact
      contactTitle: '💬 Get In Touch',
      contactSub: "Have a project in mind? Let's connect and create something amazing together",
      contactEmail: 'Email',
      contactPhone: 'Phone',
      contactMessage: 'Message',

      // CTA / About drawer
      readyToCollaborate: 'Ready to Collaborate?',
      alwaysInterested: "I'm always interested in hearing about exciting projects and opportunities.",
      backToHome: 'Back to Home',
      sendEmail: 'Send Email',

      // Portfolio
      portfolioTitle: 'Portfolio',
      portfolioFeatured: 'Featured Projects',
      feature: 'Feature',
      unfeature: 'Unfeature',
      repoNoRepos: 'No repositories found.',

      // More labels
      academicProjects: 'Academic Projects',
      academicSub: 'Research & thesis work',
      supervisorLabel: 'Supervisor',
      technologiesUsed: 'Technologies Used:',
      keySkillsGained: 'Key Skills Gained:'
    },
    tr: {
      aboutTitle: 'Hakkımda',
      subtitle: 'Bilgisayar Mühendisi & Yenilik Tutkunu',
      whoAmI: 'Ben Kimim?',
      journey: 'Yolculuğum & Tutkum',
      intro1: "Ben Yuşa Emir Metin, web geliştirme, gömülü sistemler ve yapay zekâ kesişiminde yenilikçi çözümler üretmeye tutkulu bir Bilgisayar Mühendisiyim. Hem yazılım hem donanım alanında güçlü bir temele sahibim ve gerçek dünya problemlerini çözen etkili teknolojiler oluşturmayı hedefliyorum.",
      intro2: "Merakla başlayan yolculuğum; transistörlerden buluta kadar her şeyin nasıl çalıştığını anlamakla şekillendi. Bugün, dayanıklı sistemler tasarlamak, akıllı uygulamalar geliştirmek ve donanım ile yazılım arasındaki köprüyü kurmak üzerine çalışıyorum.",
      guestbookTitle: 'Ziyaretçi Defteri',
      guestbookSub: 'Görüşlerinizi veya kısa bir not bırakın — hepsini okuyorum.',
      guestbookPlaceholderName: 'İsminiz',
      guestbookPlaceholderMessage: 'Bir mesaj bırakın...',
      guestbookSubmit: 'Gönder',
      guestbookNoEntries: 'Henüz mesaj yok.',
      guestbookNameRequired: 'Lütfen isminizi girin.',
      guestbookMessageRequired: 'Lütfen bir mesaj girin.',
      guestbookThanks: 'Teşekkürler! Geri bildiriminiz kaydedildi.',

      // Hero & site
      heroSubtitle: 'BİLGİSAYAR MÜHENDİSİ',
      heroParagraph: 'Keskin web uygulamaları ve yapay zekâ destekli çözümler geliştirmeye tutkuyla bağlıyım. FPGA tasarımı ve deepfake tespiti araştırmalarında uzmanım.',
      discoverMore: 'Daha Fazla',

      // Focus
      focusTitle: '🎯 Odak Alanlarım',
      focusSub: 'Ana yetkinliklerim ve uzmanlık alanlarım',

      // More labels
      academicProjects: 'Akademik Projeler',
      academicSub: 'Araştırma & tez çalışmaları',
      supervisorLabel: 'Danışman',
      technologiesUsed: 'Kullanılan Teknolojiler:',
      keySkillsGained: 'Kazandığım Temel Beceriler:',
      contactEmail: 'E-posta',
      contactPhone: 'Telefon',
      contactMessage: 'Mesaj',

      // CTA / About drawer
      readyToCollaborate: 'İşbirliğine Hazır mısınız?',
      alwaysInterested: 'Yeni ve heyecan verici projeler hakkında her zaman bilgi almak isterim.',
      backToHome: 'Ana Sayfaya Dön',
      sendEmail: 'E-posta Gönder',

      // Portfolio
      portfolioTitle: 'Portföy',
      portfolioFeatured: 'Öne Çıkan Projeler',
      feature: 'Öne Çıkar',
      unfeature: 'Kaldır',
      repoNoRepos: 'Depo bulunamadı.',
      portfolioSearchPlaceholder: 'Depolarda ara...',
      filterByLang: 'Dile göre filtrele',
      sortUpdated: 'En son güncellenen',
      sortStars: 'En çok yıldız alan',
      viewDetails: 'Ayrıntılar',
      close: 'Kapat',
      totalRepos: 'Depolar',
      totalStars: 'Toplam Yıldız',
      detailsLoading: 'Ayrıntılar yükleniyor...',
      readmeNotFound: 'README bulunamadı.',

      // More labels
      academicProjects: 'Akademik Projeler',
      academicSub: 'Araştırma & tez çalışmaları',
      supervisorLabel: 'Danışman',
      technologiesUsed: 'Kullanılan Teknolojiler:',
      keySkillsGained: 'Kazandığım Temel Beceriler:',
    }
  };

  const t = translations[lang];

  const projelerim = [
    {
      id: 1,
      baslik: "AI-Based DeepFake Speech Detection",
      supervisor: "Prof. Dr. Hakkı Gökhan İlk",
      aciklama: `Undergraduate research focused on detecting and analyzing artificially generated speech and deepfakes. 
Developed machine learning models to distinguish between authentic human speech and synthetic audio generated by advanced TTS systems. 
Conducted extensive signal processing analysis on mel-spectrograms and acoustic features to identify telltale artifacts of synthetic speech.
Implemented classification algorithms using Python and deep learning frameworks to achieve high detection accuracy.
Contributed to cybersecurity research aimed at detecting voice-cloning attacks and malicious audio deepfakes.`,
      etiketler: ["Python", "Deep Learning", "Signal Processing", "TensorFlow", "Audio Analysis"],
      renk: "blue"
    },
    {
      id: 2,
      baslik: "AI-Based DeepFake Speech Generation",
      supervisor: "Prof. Dr. Hakkı Gökhan İlk",
      aciklama: `Comprehensive research on synthetic speech generation and speaker cloning using neural TTS models. 
Worked with state-of-the-art models including Tacotron2-DDC, HiFi-GAN, and YourTTS to generate natural-sounding speech.
Developed a system capable of converting text into high-fidelity speech and mimicking target speaker's voice from short audio samples.
Analyzed acoustic structure of generated speech through mel-spectrograms to identify limitations in prosody and emotional variation.
Created visualizations and documentation of audio artifacts for research publication.`,
      etiketler: ["Python", "Flask", "Tacotron2-DDC", "HiFi-GAN", "YourTTS"],
      renk: "purple"
    },
    {
      id: 3,
      baslik: "Pac-Man Game Enhancement",
      supervisor: "Course Project",
      aciklama: `Group project focused on enhancing and extending the classic Pac-Man game with advanced features.
Developed the game using Java for both frontend and backend, implementing object-oriented design principles.
Enhanced game mechanics by adding difficulty progression—additional ghosts spawn after each life loss, increasing challenge.
Implemented game state management, collision detection, and AI pathfinding algorithms for ghost behavior.
Contributed to full game lifecycle from design to testing, improving code quality and maintainability.`,
      etiketler: ["Java", "Game Development", "OOP", "Algorithms", "UI Design"],
      renk: "orange"
    }
  ];

  const education = [
    {
      id: 1,
      institusyon: "TED UNIVERSITY",
      bolum: "Bachelor of Computer Engineering",
      tarih: "2020 - 2025",
      gpa: "3.21 / 4.0",
      ikinciAlan: "Analytic Data Science",
      aciklama: "Comprehensive curriculum covering algorithms, data structures, software engineering, digital systems, and advanced topics in AI and embedded systems. Active participation in research projects and industry collaborations.",
      renkler: "linear-gradient(135deg, #1890ff 0%, #69c0ff 100%)"
    }
  ];

  const experience = [
    {
      id: 1,
      baslik: "FPGA Engineer Intern",
      sirket: "ASELSAN A.Ş",
      logo: aselsanLogosu,
      tarih: "Summer 2024",
      departman: "FPGA Design Team, Embedded Software Department, Electro-Optics Division",
      aciklama: `Gained hands-on experience in FPGA-based system design and development within Turkey's leading defense contractor.
Bridged theoretical knowledge with real-world engineering applications in the defense industry.
Designed and implemented various FPGA modules using VHDL:
  • 256x8 RAM module with synchronous read/write operations
  • Hierarchical RAM Controller for memory initialization and verification
  • Video Generator producing 640x512 grayscale output at 25 Hz refresh rate
  • Auto Focus system analyzing image sharpness using line difference methods
  • Histogram Analysis system for pixel intensity distribution calculation

Utilized professional tools including Quartus Prime Lite Edition and ModelSim for design, synthesis, and simulation.
Strengthened skills in logic design, VHDL coding, simulation-based verification, and real-time embedded systems.
Completed additional FPGA design course independently to deepen theoretical knowledge.`,
      learning: ["VHDL", "SystemVerilog", "Quartus Prime", "ModelSim", "FPGA Architecture", "Video Processing"],
      renk: "blue"
    },
    {
      id: 2,
      baslik: "Product Developer Intern",
      sirket: "Technology Company",
      tarih: "Previous Experience",
      aciklama: `Contributed to product development and implementation of software solutions.
Collaborated with cross-functional teams on feature development and quality assurance.`,
      learning: ["Product Development", "Team Collaboration"],
      renk: "cyan"
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
            <Tooltip title={lang === 'tr' ? 'CV Aç' : 'Open CV'}>
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
            <Button type="text" onClick={showPortfolio} className="header-button" style={{ color: '#69c0ff', fontWeight: 600 }}>{lang === 'tr' ? 'Portföy' : 'Portfolio'}</Button>
            <Button size="small" type={lang === 'en' ? 'primary' : 'default'} onClick={() => setLang('en')} style={{ marginLeft: 6 }}>EN</Button>
            <Button size="small" type={lang === 'tr' ? 'primary' : 'default'} onClick={() => setLang('tr')}>TR</Button>
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
              {t.heroSubtitle}
            </Text>
            <Paragraph style={{ color: '#e6f7ff', marginTop: '30px', maxWidth: '700px', margin: '30px auto', fontSize: '18px', lineHeight: '1.8', fontWeight: '300' }}>
              {t.heroParagraph}
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
                {t.discoverMore}
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
            <Divider><Title level={2} style={{ marginBottom: 0, color: '#001529' }}>{t.focusTitle}</Title></Divider>
            <Paragraph style={{ color: '#666', fontSize: '16px', marginTop: '10px' }}>{t.focusSub}</Paragraph>
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
              <Card.Meta title={t.card1Title} description={t.card1Desc} />
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
              <Card.Meta title={t.card2Title} description={t.card2Desc} />
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
              <Card.Meta title={t.card3Title} description={t.card3Desc} />
            </Card>
          </div>
        </div>

        {/* GUESTBOOK SECTION (HOME) */}
        <div className="guestbook-section" style={{ padding: '80px 50px', background: '#f6f8fb', textAlign: 'center' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto 20px', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg, #faad14 0%, #ffd666 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📬</div>
              <div>
                <Title level={3} style={{ marginBottom: 0, color: '#001529' }}>{t.guestbookTitle}</Title>
                <Text style={{ color: '#666' }}>{t.guestbookSub}</Text>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 12, padding: 20 }}>
              <Form form={form} layout="vertical" onFinish={handleGuestSubmit}>
                <Form.Item name="name" rules={[{ required: true, message: t.guestbookNameRequired }]}>
                  <Input placeholder={t.guestbookPlaceholderName} value={guestName} onChange={e => setGuestName(e.target.value)} />
                </Form.Item>
                <Form.Item name="message" rules={[{ required: true, message: t.guestbookMessageRequired }]}>
                  <Input.TextArea rows={4} placeholder={t.guestbookPlaceholderMessage} value={guestMessage} onChange={e => setGuestMessage(e.target.value)} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">{t.guestbookSubmit}</Button>
                </Form.Item>
              </Form>

              <Divider />

              <List
                dataSource={entries}
                locale={{ emptyText: t.guestbookNoEntries }}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={`${item.name} • ${new Date(item.date).toLocaleString()}`} description={item.message} />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="contact-section" style={{ 
          padding: '100px 50px', 
          background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)',
          textAlign: 'center'
        }}>
          <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <Title level={2} style={{ color: 'white', marginBottom: 0 }}>{t.contactTitle}</Title>
          </Divider>
          <Paragraph style={{ fontSize: '16px', color: '#69c0ff', marginBottom: '50px', marginTop: '20px' }}>
            {t.contactSub}
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
              <Title level={4} style={{ color: 'white', margin: 0 }}>{t.contactEmail}</Title>
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
              <Title level={4} style={{ color: 'white', margin: 0 }}>{t.contactPhone}</Title>
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
              <Title level={4} style={{ color: 'white', margin: 0 }}>{t.contactMessage}</Title>
              <Button 
                type="link" 
                href="mailto:yusaemirm@email.com?subject=Project Inquiry" 
                style={{ fontSize: '16px', color: '#69c0ff', textDecoration: 'underline' }}
              >
                {lang === 'tr' ? 'Mesaj Gönder' : 'Send a message'}
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
        <div style={{ width: '100%', margin: '0', maxWidth: 'none' }}>
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
              {t.aboutTitle}
            </Title>
            <Text style={{ color: '#e6f7ff', fontSize: '18px', fontWeight: '300', letterSpacing: '1px', zIndex: 2, position: 'relative', display: 'block' }}>
              {t.subtitle}
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
                  <Title level={2} style={{ margin: 0, color: '#001529', fontSize: '28px' }}>{t.whoAmI}</Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>{t.journey}</Text>
                </div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f7ff 100%)',
                border: '2px solid #e6f7ff',
                borderRadius: '15px',
                padding: '30px',
                lineHeight: '1.9'
              }}>
                <Paragraph style={{ fontSize: '16px', color: '#434343', marginBottom: '20px' }}>{t.intro1}</Paragraph>
                <Paragraph style={{ fontSize: '16px', color: '#434343', marginBottom: 0 }}>{t.intro2}</Paragraph>
              </div>
            </section>

            {/* EDUCATION SECTION */}
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
                  🎓
                </div>
                <div>
                  <Title level={2} style={{ margin: 0, color: '#001529', fontSize: '28px' }}>Education</Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>Academic background & achievements</Text>
                </div>
              </div>
              {education.map((edu) => (
                <Card 
                  key={edu.id}
                  className="education-card"
                  style={{
                    background: edu.renkler,
                    border: 'none',
                    borderRadius: '15px',
                    padding: '30px',
                    color: 'white',
                    marginBottom: '20px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  hoverable
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                      <Title level={3} style={{ color: 'white', margin: 0, marginBottom: '5px' }}>
                        {edu.institusyon}
                      </Title>
                      <Text style={{ fontSize: '18px', fontWeight: '600', color: 'rgba(255,255,255,0.9)' }}>
                        {edu.bolum}
                      </Text>
                    </div>
                    <div style={{ textAlign: 'right', background: 'rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: '10px' }}>
                      <Text strong style={{ fontSize: '14px', color: 'white', display: 'block' }}>GPA</Text>
                      <Text strong style={{ fontSize: '20px', color: 'white' }}>{edu.gpa}</Text>
                    </div>
                  </div>
                  <Text style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', display: 'block', marginBottom: '15px' }}>
                    📅 {edu.tarih}
                  </Text>
                  <Text style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', display: 'block', marginBottom: '15px' }}>
                    <strong>Secondary Field:</strong> {edu.ikinciAlan}
                  </Text>
                  <Paragraph style={{ fontSize: '15px', color: 'rgba(255,255,255,0.95)', lineHeight: '1.8' }}>
                    {edu.aciklama}
                  </Paragraph>
                </Card>
              ))}
            </section>

            {/* SKILLS SECTION - ENHANCED */}
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
                  <Title level={2} style={{ margin: 0, color: '#001529', fontSize: '28px' }}>Technical Skills</Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>Languages, tools & expertise</Text>
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
                  <Title level={4} style={{ color: '#c41d7f', marginBottom: '15px' }}>💻 Programming Languages</Title>
                  <Space direction="vertical" style={{ width: '100%' }} wrap>
                    <Tag color="red" style={{ borderRadius: '6px' }}>Java</Tag>
                    <Tag color="red" style={{ borderRadius: '6px' }}>Python</Tag>
                    <Tag color="red" style={{ borderRadius: '6px' }}>C</Tag>
                    <Tag color="red" style={{ borderRadius: '6px' }}>VHDL</Tag>
                    <Tag color="red" style={{ borderRadius: '6px' }}>Assembly (AVR, ARM, MIPS)</Tag>
                  </Space>
                </div>
                <div className="skill-card" style={{
                  background: 'linear-gradient(135deg, #f6f5ff 0%, #ede5ff 100%)',
                  border: '2px solid #f9f0ff',
                  borderRadius: '12px',
                  padding: '25px',
                  transition: 'all 0.3s ease'
                }}>
                  <Title level={4} style={{ color: '#722ed1', marginBottom: '15px' }}>🔧 Web & Tools</Title>
                  <Space direction="vertical" style={{ width: '100%' }} wrap>
                    <Tag color="purple" style={{ borderRadius: '6px' }}>React</Tag>
                    <Tag color="purple" style={{ borderRadius: '6px' }}>JavaScript/ES6+</Tag>
                    <Tag color="purple" style={{ borderRadius: '6px' }}>HTML/CSS</Tag>
                    <Tag color="purple" style={{ borderRadius: '6px' }}>MySQL</Tag>
                    <Tag color="purple" style={{ borderRadius: '6px' }}>Ant Design</Tag>
                  </Space>
                </div>
                <div className="skill-card" style={{
                  background: 'linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%)',
                  border: '2px solid #ffecc8',
                  borderRadius: '12px',
                  padding: '25px',
                  transition: 'all 0.3s ease'
                }}>
                  <Title level={4} style={{ color: '#d46b08', marginBottom: '15px' }}>⚙️ FPGA & Embedded</Title>
                  <Space direction="vertical" style={{ width: '100%' }} wrap>
                    <Tag color="orange" style={{ borderRadius: '6px' }}>FPGA Design</Tag>
                    <Tag color="orange" style={{ borderRadius: '6px' }}>SystemVerilog</Tag>
                    <Tag color="orange" style={{ borderRadius: '6px' }}>Quartus Prime</Tag>
                    <Tag color="orange" style={{ borderRadius: '6px' }}>ModelSim</Tag>
                    <Tag color="orange" style={{ borderRadius: '6px' }}>Embedded Systems</Tag>
                  </Space>
                </div>
                <div className="skill-card" style={{
                  background: 'linear-gradient(135deg, #f5f5ff 0%, #e6e6ff 100%)',
                  border: '2px solid #f0f0ff',
                  borderRadius: '12px',
                  padding: '25px',
                  transition: 'all 0.3s ease'
                }}>
                  <Title level={4} style={{ color: '#1890ff', marginBottom: '15px' }}>🤖 AI & Data</Title>
                  <Space direction="vertical" style={{ width: '100%' }} wrap>
                    <Tag color="blue" style={{ borderRadius: '6px' }}>Deep Learning</Tag>
                    <Tag color="blue" style={{ borderRadius: '6px' }}>TensorFlow</Tag>
                    <Tag color="blue" style={{ borderRadius: '6px' }}>Data Analysis</Tag>
                    <Tag color="blue" style={{ borderRadius: '6px' }}>Signal Processing</Tag>
                    <Tag color="blue" style={{ borderRadius: '6px' }}>Audio Processing</Tag>
                  </Space>
                </div>
                <div className="skill-card" style={{
                  background: 'linear-gradient(135deg, #f0f5ff 0%, #e0eaff 100%)',
                  border: '2px solid #d9e8ff',
                  borderRadius: '12px',
                  padding: '25px',
                  transition: 'all 0.3s ease'
                }}>
                  <Title level={4} style={{ color: '#0050b3', marginBottom: '15px' }}>📊 Core Competencies</Title>
                  <Space direction="vertical" style={{ width: '100%' }} wrap>
                    <Tag color="geekblue" style={{ borderRadius: '6px' }}>Algorithms</Tag>
                    <Tag color="geekblue" style={{ borderRadius: '6px' }}>Data Structures</Tag>
                    <Tag color="geekblue" style={{ borderRadius: '6px' }}>Computer Architecture</Tag>
                    <Tag color="geekblue" style={{ borderRadius: '6px' }}>Statistics</Tag>
                    <Tag color="geekblue" style={{ borderRadius: '6px' }}>Problem Solving</Tag>
                  </Space>
                </div>
              </div>
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
                  <Title level={2} style={{ margin: 0, color: '#001529', fontSize: '28px' }}>Professional Experience</Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>Internships & industry experience</Text>
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
                            alt={`${exp.sirket || exp.baslik} logo`} 
                            style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#f0f0f0', borderRadius: '8px', padding: '5px' }} 
                          />
                        )}
                        <div>
                          <Text strong style={{ fontSize: '17px', color: '#001529' }}>{exp.baslik} @ {exp.sirket || 'Company'}</Text>
                          <Text type="secondary" style={{ fontSize: '13px', display: 'block' }}>📅 {exp.tarih}</Text>
                        </div>
                      </div>
                    } 
                    key={`exp-${exp.id}`}
                    className="experience-collapse"
                    style={{ marginBottom: '15px', background: 'linear-gradient(135deg, #e6f7ff 0%, #e6f7ff 100%)', borderRadius: '12px', border: '1px solid #91d5ff', overflow: 'hidden' }}
                  >
                    {exp.departman && (
                      <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '2px solid #91d5ff' }}>
                        <Text strong style={{ fontSize: '14px', color: '#001529' }}>Department:</Text>
                        <Paragraph style={{ fontSize: '15px', color: '#434343', margin: '5px 0 0 0' }}>{exp.departman}</Paragraph>
                      </div>
                    )}
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
                      <Text strong style={{ color: '#001529', fontSize: '14px', display: 'block', marginBottom: '10px' }}>{t.keySkillsGained}</Text>
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
                  <Title level={2} style={{ margin: 0, color: '#001529', fontSize: '28px' }}>{t.academicProjects}</Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>{t.academicSub}</Text>
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
                          <Text strong style={{ fontSize: '14px', color: '#001529', display: 'block' }}>{t.supervisorLabel}</Text>
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
                      <Text strong style={{ color: '#001529', fontSize: '14px', display: 'block', marginBottom: '10px' }}>{t.technologiesUsed}</Text>
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
                <Title level={2} style={{ color: 'white', marginBottom: '15px' }}>{t.readyToCollaborate}</Title>
                <Paragraph style={{ fontSize: '16px', color: '#e6f7ff', marginBottom: '30px' }}>
                  {t.alwaysInterested}
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
                    {t.backToHome}
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
                    {t.sendEmail}
                  </Button>
                </Space>
              </div>
            </section>

          </div>
        </div>
      </Drawer>

      {/* PORTFOLIO DRAWER */}
      <Drawer
        title={t.portfolioTitle}
        placement="right"
        onClose={closePortfolio}
        open={isPortfolioOpen}
        width="100%"
        bodyStyle={{ padding: 0, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', overflowY: 'auto' }}
        className="modern-drawer premium-drawer"
      >
        <div style={{ width: '100%', margin: '0', maxWidth: 'none' }}>
          <div style={{ background: 'linear-gradient(135deg, #001529 0%, #003a8c 50%, #1890ff 100%)', padding: '40px 30px', color: 'white', textAlign: 'center' }}>
            <Title level={2} style={{ color: 'white', margin: 0 }}>{t.portfolioTitle}</Title>
            <Text style={{ color: '#e6f7ff' }}>{t.portfolioFeatured}</Text>
          </div>

          <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Controls */}
            <div className="portfolio-controls" style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
              <Input.Search placeholder={t.portfolioSearchPlaceholder} allowClear onSearch={val => setRepoSearch(val)} style={{ width: 320 }} onChange={e => setRepoSearch(e.target.value)} />
              <Select placeholder={t.filterByLang} style={{ width: 180 }} allowClear onChange={val => setRepoLangFilter(val)}>
                {repoLanguages.map(l => <Select.Option key={l} value={l}>{l}</Select.Option>)}
              </Select>
              <Select defaultValue={repoSort} onChange={val => setRepoSort(val)} style={{ width: 160 }}>
                <Select.Option value="updated">{t.sortUpdated}</Select.Option>
                <Select.Option value="stars">{t.sortStars}</Select.Option>
              </Select>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#888' }}>{t.totalRepos}</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{repos.length}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#888' }}>{t.totalStars}</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>★ {totalStars}</div>
                </div>
              </div>
            </div>

            {reposLoading ? (
              <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div>
            ) : (
              <div>
                {/* Featured */}
                {featuredRepoIds && featuredRepoIds.length > 0 && (
                  <div style={{ marginBottom: 30 }}>
                    <Title level={4}>{t.portfolioFeatured}</Title>
                    <div className="portfolio-grid featured" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                      {repos.filter(r => featuredRepoIds.includes(r.id)).map(r => (
                        <div key={r.id} className={`repo-card ${featuredRepoIds.includes(r.id) ? 'featured' : ''}`}>
                          {featuredRepoIds.includes(r.id) && <div className="repo-ribbon">{t.portfolioFeatured}</div>}
                          <div className="repo-card-top">
                            <div className="repo-avatar" style={{ backgroundImage: `url(${r.owner?.avatar_url})` }} />
                            <div className="repo-info">
                              <div className="repo-title">{r.name}</div>
                              <div className="repo-desc">{r.description}</div>
                            </div>
                          </div>
                          <div className="repo-meta">
                            <div className="meta-item">★ {r.stargazers_count}</div>
                            <div className="meta-item"><ForkOutlined /> {r.forks_count}</div>
                            <div className="meta-item">{r.language || '-'}</div>
                            <div className="meta-item">{new Date(r.updated_at).toLocaleDateString()}</div>
                          </div>
                          <div className="repo-actions">
                            <Button size="small" icon={<LinkOutlined />} href={r.html_url} target="_blank">{lang === 'tr' ? 'GitHub' : 'GitHub'}</Button>
                            <Button size="small" icon={<EyeOutlined />} onClick={() => openRepoModal(r)}>{t.viewDetails}</Button>
                            <Button size="small" icon={<StarOutlined />} onClick={() => toggleFeature(r.id)}>{featuredRepoIds.includes(r.id) ? t.unfeature : t.feature}</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All repos */}
                <div>
                  <Title level={4}>{t.portfolioTitle}</Title>
                  {sortedRepos.length === 0 ? (
                    <Text>{t.repoNoRepos}</Text>
                  ) : (
                    <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
                      {sortedRepos.map(r => (
                        <div key={r.id} className={`repo-card ${featuredRepoIds.includes(r.id) ? 'featured' : ''}`}>
                          {featuredRepoIds.includes(r.id) && <div className="repo-ribbon">{t.portfolioFeatured}</div>}
                          <div className="repo-card-top">
                            <div className="repo-avatar" style={{ backgroundImage: `url(${r.owner?.avatar_url})` }} />
                            <div className="repo-info">
                              <div className="repo-title">{r.name}</div>
                              <div className="repo-desc">{r.description}</div>
                            </div>
                          </div>
                          <div className="repo-meta">
                            <div className="meta-item">★ {r.stargazers_count}</div>
                            <div className="meta-item"><ForkOutlined /> {r.forks_count}</div>
                            <div className="meta-item">{r.language || '-'}</div>
                            <div className="meta-item">{new Date(r.updated_at).toLocaleDateString()}</div>
                          </div>
                          <div className="repo-actions">
                            <Button size="small" icon={<LinkOutlined />} href={r.html_url} target="_blank">GitHub</Button>
                            <Button size="small" icon={<EyeOutlined />} onClick={() => openRepoModal(r)}>{t.viewDetails}</Button>
                            <Button size="small" icon={<StarOutlined />} onClick={() => toggleFeature(r.id)}>{featuredRepoIds.includes(r.id) ? t.unfeature : t.feature}</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Drawer>

      <Modal
        title={modalRepo ? modalRepo.name : t.viewDetails}
        open={modalOpen}
        onCancel={closeRepoModal}
        footer={[<Button key="close" onClick={closeRepoModal}>{t.close}</Button>]}
        width={800}
      >
        {modalLoading ? (
          <div style={{ textAlign: 'center', padding: 40 }}><Spin /> <div style={{ marginTop: 8 }}>{t.detailsLoading}</div></div>
        ) : (
          <div style={{ maxHeight: '60vh', overflow: 'auto', whiteSpace: 'pre-wrap', fontSize: 14 }}>
            {modalReadme || (t.readmeNotFound)}
          </div>
        )}
      </Modal>
    </Layout>
  );
}

export default App;
