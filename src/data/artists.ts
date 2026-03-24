export interface HistoryItem {
  category: string;
  items: string[];
}

export interface Artist {
  id: string;
  name: string;
  koreanName?: string;
  role: string;
  genre: string;
  bio: string;
  clearanceLevel: string;
  fileNo?: string;
  coverImage: string;
  profileImage: string;
  youtubeMusic: string;
  youtubePerformance: string;
  history: HistoryItem[];
}

export const artists: Artist[] = [
  {
    id: "mi7",
    name: "MI7",
    role: "Secret Music Agents",
    genre: "All about music",
    bio: "Secret music agents",
    clearanceLevel: "A++",
    coverImage: "https://i.postimg.cc/dkwcNnG4/image.jpg",
    profileImage: "",
    youtubeMusic: "",
    youtubePerformance: "https://youtu.be/rdNIkuP27yc",
    history: []
  },
  {
    id: "gracey",
    name: "GRACEY",
    koreanName: "김예리",
    role: "VOCAL AGENT",
    genre: "Jazz / K-pop",
    bio: "Soulful jazz voice with graceful depth",
    clearanceLevel: "A++",
    fileNo: "MI7-V-8325-924",
    coverImage: "https://i.postimg.cc/gxbXsXgV/image.jpg",
    profileImage: "https://i.postimg.cc/gw0d5dHv/image.jpg",
    youtubeMusic: "https://youtu.be/k7oYNQsdwM0",
    youtubePerformance: "https://www.youtube.com/channel/UCw43pF3L78uJRQrF8UvaWHw",
    history: [
      { category: "학력", items: ["Seoul Jazz Academy 26th Vocal 수석 졸업"] },
      { category: "방송·오디션", items: ["2012 | Super Diva (종편 TVN 오디션 프로그램)"] },
      { category: "페스티벌·공식 공연", items: ["2010 | Jarasum Jazz Festival 공연", "한미동맹 60주년 기념행사 초청 공연", "매마수 '문화가 있는 날' 우수 프로그램 공연", "경기도 찾아가는 문화활동 (50회 이상 공연)", "복권기금문화사업 '신나는 예술여행' 참여"] },
      { category: "밴드·그룹 활동", items: ["2012~2014 | Band THE PLAY Main Vocal", "2014 | Band THE PLAY '꿈꾸는 소년' 음원 발매", "CCM Group 'IMMANUEL' 메인보컬", "2025 | MI7 music concert"] },
      { category: "음원·음악 작업", items: ["2014 | 의정부 음악극 축제 로고송 '우리들의 축제' 가창", "2022 | 싱글 앨범 '웃어요' 발매"] },
      { category: "심사·전문 활동", items: ["2017 | MAMF Song Festival 심사위원"] },
      { category: "현재 활동", items: ["MI7 music Agency 창립", "Jazz Vocal Gracey 로 활동 중"] }
    ]
  },
  {
    id: "lee-sang-hoon",
    name: "LEE SANG HOON",
    koreanName: "이상훈",
    role: "VOCAL AGENT",
    genre: "R&B / Pop / K-pop",
    bio: "Stylish voice with a delicate edge",
    clearanceLevel: "A++",
    fileNo: "MI7-V-9025-007",
    coverImage: "https://i.postimg.cc/wtR43GqM/image.jpg",
    profileImage: "https://i.postimg.cc/KK3p4HGY/image.jpg",
    youtubeMusic: "https://youtu.be/sWHN79LB9e4",
    youtubePerformance: "https://www.youtube.com/@SsangHn",
    history: [
      { category: "학력", items: ["상명대학교 일반대학원 뉴미디어음악학 석사"] },
      { category: "교육 경력", items: ["정화예술대학교 외래교수", "광운대학교 콘서바토리 외래교수", "명지대학교 미래교육원 외래교수"] },
      { category: "아티스트 활동", items: ["싱어송라이터 '이상훈' 활동"] },
      { category: "공연·세션 참여", items: ["2025 서울재즈페스티벌 안신애 공연 코러스 참여", "박정현 'Let's Be A Family' 코러스 참여"] },
      { category: "프로듀싱·음반 작업", items: ["송하람 앨범 프로듀싱", "Kevin Kim 앨범 프로듀싱", "Moodforblue 앨범 프로듀싱", "그루브무드 앨범 프로듀싱"] }
    ]
  },
  {
    id: "jo-young-hu",
    name: "JO YOUNG HU",
    koreanName: "조영후",
    role: "GUITAR AGENT",
    genre: "K-pop / Pop",
    bio: "Virtuoso shaping rhythm and melody into one",
    clearanceLevel: "A++",
    fileNo: "MI7-G-9725-004",
    coverImage: "https://i.postimg.cc/NLtYq1DD/image.jpg",
    profileImage: "https://i.postimg.cc/KK3p4HGY/image.jpg",
    youtubeMusic: "",
    youtubePerformance: "",
    history: [
      { category: "소속 · 활동", items: ["Warner Chappell Music Korea 소속", "IST ENT. 작곡 · 편곡 작업 진행", "FANTASIO ENT. 작곡 · 편곡 작업 진행"] },
      { category: "경력", items: ["前 Purple Pine Ent. 소속 아티스트 (QUA 연주자 활동)", "前 Big Data Publishing 작가 및 연주자 활동"] },
      { category: "작곡 참여", items: ["NIK – ‘BOMB’ 작곡", "NIK – ‘La Vida Loca’ 작곡", "NIK – ‘Morse Code’ 작곡"] },
      { category: "작곡 · 연주 참여", items: ["Maradise – ‘노답’ 작곡 및 연주", "PB7 Project – ‘Mirai’ 작곡 및 연주", "NIK – ‘ANOTOKIE’ 작곡 및 연주", "NIK – ‘Stay’ 작곡 및 연주"] },
      { category: "연주 참여", items: ["정효 – ‘Full Moon’ 연주", "Nicky Park – ‘TEMPT’ 연주", "Nicky Park – ‘행복하지않아’ 연주", "루첸트 고건 (Japan) – ‘공중전화’ 연주", "고건 (Japan) – ‘片思い’ 연주", "Talk Talk – ‘서이브’ 연주"] }
    ]
  },
  {
    id: "lee-so-eun",
    name: "LEE SO WOON",
    koreanName: "이소운",
    role: "KEYBOARD AGENT",
    genre: "Jazz / Ballad / K-pop",
    bio: "Touch melts seamlessly into the music",
    clearanceLevel: "A++",
    fileNo: "MI7-K-9025-005",
    coverImage: "https://i.postimg.cc/R3DvP2vY/image.jpg",
    profileImage: "https://i.postimg.cc/sQ9kDNmp/image.jpg",
    youtubeMusic: "",
    youtubePerformance: "",
    history: [
      { category: "라이브 세션", items: ["싱어송라이터 ‘야야’ 라이브 피아노 세션", "슈가맨 프로젝트 ‘추억소환 콘서트’ 라이브 세션 (김재희, 차수경)", "문성환 Quartet 피아노 세션"] },
      { category: "콘서트 · 캠페인 공연", items: ["EBS ‘공감’ 축소반대 릴레이 콘서트 참여 (야야, 데이브레이크, 랄라스윗)"] },
      { category: "프로젝트 공연", items: ["보컬 아카데미 ‘모래공장’ 프로젝트 공연 (‘Gloomy Saturday’ 밴드 라이브 세션)", "모래공장 프로젝트 그룹 JUSTSIX 콘서트 라이브"] },
      { category: "밴드 활동 · 음반", items: ["밴드 ‘Morning Haze’ 멤버", "Morning Haze E.P 앨범 참여"] }
    ]
  },
  {
    id: "chu-sang-min",
    name: "CHU SANG MIN",
    koreanName: "추상민",
    role: "VOCAL AGENT",
    genre: "K-pop / Pop / OST",
    bio: "Touch melts seamlessly into the music",
    clearanceLevel: "A++",
    fileNo: "MI7-V-9225-091",
    coverImage: "https://i.postimg.cc/wynTBZP0/image.jpg",
    profileImage: "https://i.postimg.cc/6yQktzvC/image.jpg",
    youtubeMusic: "https://youtu.be/QOQOIVZMnv4",
    youtubePerformance: "https://www.youtube.com/@SingingChu",
    history: [
      { category: "방송·OST·음반 참여", items: ["2016.04 | KBS 드라마 <무림학교> OST 'Be Crazy' 참여 (예명 Mine)", "2016.11 | MBC <듀엣가요제> 29·30회, 가수 김태우(god) 듀엣 파트너 출연", "2017.10 | SBS 드라마 <브라보 마이 라이프> OST 가이드 보컬", "2019 | <프로듀스 101 시즌4> 그룹 X1 가이드 보컬 녹음", "2021.12~2022.01 | TV조선 드라마 <엉클> 주인공 오정세 노래 목소리 전곡 대역 및 OST 참여"] },
      { category: "솔로·프로젝트 음반", items: ["2017.05.23 | 싱글 '바보' 발매", "2018.01.23 | 프로젝트 싱글 '비긴 어게인' 발매", "2020.01.09 | 싱글 '어쩌다' 발매", "2022.10.18 | 싱글 '사계절이 지나 다시 가을이 와도' 발매"] },
      { category: "밴드 활동", items: ["2018.05.07 | EP '그대와' 발매", "2018.08.06 | 싱글 2집 '너에게 가는 길' 발매", "2019.08.13 | 싱글 3집 '안개꽃' 발매"] },
      { category: "주요 공연", items: ["2019.09.28 | 경기도 부천시 한마당 축하공연", "2019.10.05, 10.07 | 잠실실내체육관 전국체전 공식 공연", "2019 | 부천시 주관 전국 버스킹 대회 동상", "2025 | MI7 music concert"] }
    ]
  }
];
