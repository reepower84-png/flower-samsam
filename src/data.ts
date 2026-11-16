/** 상품·후기 데이터. 모든 지점 공통입니다.
 *  동양란과 서양란은 '동·서양란' 한 카테고리로 묶어 총 6개 카테고리입니다. */

export type Item = { name: string; price: number; folder: string };
export type Category = { key: string; name: string; desc: string; items: Item[] };

export const CATEGORIES: Category[] = [
  {
    key: "축하화환",
    name: "축하화환",
    desc: "개업·결혼·취임 등 축하 자리에",
    items: [
      { name: "축하3단화환", price: 59000, folder: "축하화환" },
      { name: "축하3단고급화환", price: 79000, folder: "축하화환" },
      { name: "축하3단특대화환", price: 99000, folder: "축하화환" },
      { name: "축하3단특특대화환", price: 119000, folder: "축하화환" },
      { name: "축하4단화환", price: 139000, folder: "축하화환" },
      { name: "축하쌀화환10kg", price: 159000, folder: "축하화환" },
    ],
  },
  {
    key: "근조화환",
    name: "근조화환",
    desc: "정중한 마음을 담은 조화",
    items: [
      { name: "근조3단화환", price: 59000, folder: "근조화환" },
      { name: "근조3단고급화환", price: 79000, folder: "근조화환" },
      { name: "근조3단특대화환", price: 99000, folder: "근조화환" },
      { name: "근조3단특특대화환", price: 119000, folder: "근조화환" },
      { name: "근조4단화환", price: 139000, folder: "근조화환" },
      { name: "근조쌀화환10kg", price: 159000, folder: "근조화환" },
    ],
  },
  {
    key: "꽃다발",
    name: "꽃다발",
    desc: "기념일·고백·생일 선물",
    items: [
      { name: "가든스윗피", price: 59000, folder: "꽃다발" },
      { name: "베이비파우더", price: 65000, folder: "꽃다발" },
      { name: "비비드블로섬", price: 65000, folder: "꽃다발" },
      { name: "온리유", price: 50000, folder: "꽃다발" },
      { name: "키스더레인", price: 56000, folder: "꽃다발" },
      { name: "프레그런스", price: 55000, folder: "꽃다발" },
    ],
  },
  {
    key: "꽃바구니",
    name: "꽃바구니",
    desc: "병문안·감사 인사",
    items: [
      { name: "감사와 존경 카네이션 바구니", price: 60000, folder: "꽃바구니" },
      { name: "돌체볼르 러브", price: 76000, folder: "꽃바구니" },
      { name: "비너스", price: 75000, folder: "꽃바구니" },
      { name: "파스텔 스노우", price: 66000, folder: "꽃바구니" },
      { name: "폴린러브", price: 75000, folder: "꽃바구니" },
      { name: "햇살 한가득", price: 65000, folder: "꽃바구니" },
    ],
  },
  {
    key: "관엽화분",
    name: "관엽화분",
    desc: "개업·이전·승진 축하",
    items: [
      { name: "고무나무", price: 65000, folder: "관엽화분" },
      { name: "극락조", price: 99000, folder: "관엽화분" },
      { name: "녹보수", price: 120000, folder: "관엽화분" },
      { name: "떡갈나무", price: 99000, folder: "관엽화분" },
      { name: "산세베리아", price: 80000, folder: "관엽화분" },
      { name: "안스리움", price: 63000, folder: "관엽화분" },
    ],
  },
  {
    key: "동서양란",
    name: "동·서양란",
    desc: "격식 있는 비즈니스·축하 선물",
    items: [
      { name: "금기", price: 99000, folder: "동양란" },
      { name: "대국 청자", price: 130000, folder: "동양란" },
      { name: "산천보세", price: 50000, folder: "동양란" },
      { name: "산천조", price: 80000, folder: "동양란" },
      { name: "철골소심", price: 50000, folder: "동양란" },
      { name: "황룡금", price: 110000, folder: "동양란" },
      { name: "만천홍", price: 60000, folder: "서양란" },
      { name: "무늬 호접란", price: 60000, folder: "서양란" },
      { name: "살구향", price: 100000, folder: "서양란" },
      { name: "심비디움", price: 130000, folder: "서양란" },
      { name: "연핑크 호접란", price: 60000, folder: "서양란" },
      { name: "핑크 호접란", price: 120000, folder: "서양란" },
    ],
  },
];

export const REVIEWS = [
  {
    name: "김*수",
    title: "급한 부고에도 1시간 만에 도착",
    body: "지방 장례식장이라 걱정했는데 주문 후 1시간 만에 도착했어요. 정말 감사드립니다.",
  },
  {
    name: "박*영",
    title: "개업식 화환, 풍성하고 예뻤어요",
    body: "사진보다 더 풍성하게 와서 거래처에서도 칭찬이 많았습니다. 다음에도 꼭 이용할게요.",
  },
  {
    name: "이*민",
    title: "결혼기념일 깜빡했는데 살았네요",
    body: "오후에 주문했는데 저녁 전에 배송 완료. 아내가 너무 좋아했어요!",
  },
  {
    name: "최*아",
    title: "병문안 꽃바구니 고급스러웠어요",
    body: "사진보다 훨씬 풍성하고 색감도 예뻐서 받으신 분이 정말 좋아하셨습니다.",
  },
  {
    name: "정*훈",
    title: "거래처 개업식 화환 호평",
    body: "리본 문구도 깔끔하게 출력되어 왔고 시간 약속도 정확했어요. 믿고 맡길 수 있습니다.",
  },
  {
    name: "한*라",
    title: "지방 결혼식장 화환 완벽 배송",
    body: "서울에서 주문하고 부산 예식장으로 보냈는데 식 시작 전에 정확히 도착했어요.",
  },
  {
    name: "송*현",
    title: "어버이날 꽃다발 감동 그 자체",
    body: "당일 오전에 주문했는데 점심 전에 부모님 댁에 도착. 어머니가 사진까지 보내주셨어요.",
  },
  {
    name: "윤*지",
    title: "승진 축하 동양란 품격 있어요",
    body: "포장부터 화분까지 격식 있어서 받으신 분이 사무실에 잘 두셨다고 하더라고요.",
  },
  {
    name: "강*석",
    title: "새벽 주문도 당일 배송 OK",
    body: "급하게 새벽에 문의 남겼는데 빠르게 답변 주시고 오후에 바로 배송됐습니다. 최고예요.",
  },
];

export const FEATURES = [
  { t: "당일 배송", d: "오전 주문 시 당일, 오후 주문도 빠르게 배송" },
  { t: "전국 가능", d: "도서·산간 일부 제외, 전국 어디든 OK" },
  { t: "전문 디자인", d: "현지 플로리스트가 직접 제작·배송" },
];

export const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;
export const minPrice = (c: Category) => Math.min(...c.items.map((i) => i.price));
