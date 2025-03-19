import { Separator } from '@juun/ui';
import Image from 'next/image';

export const metadata = {
  title: 'Lisbon Cannery',
  description:
    'A menu list component that matches the style of the poster with blue illustrations on a cream background.',
  date: '2025-03-01',
  tags: ['Next.js', 'Tailwind CSS', 'Mobile'],
  image: '/images/lisbon/pig.png',
};

export default function LisbonCannery() {
  // Menu data structure
  const menuItems = [
    {
      id: 1,
      animal: 'Fish',
      animalKorean: '생선',
      description:
        "Seasonal fish, shepherd's purse, ikura caviar, tomato pearl",
      descriptionKorean: '제철생선, 냉이, 연어알, 토마토펄',
      image: '/images/lisbon/fish.png',
    },
    {
      id: 2,
      animal: 'Beef',
      animalKorean: '소',
      description:
        '1++ hanwoo filet mignon, grissini, pickled shallot, tuna aioli, egg yolk dijon',
      descriptionKorean:
        '한우 1++ 안심, 홈메이드 그리시니, 샬롯 피클, 참치 아이올리, 에그 디종',
      image: '/images/lisbon/cow.png',
    },
    {
      id: 3,
      animal: 'Duck',
      animalKorean: '오리',
      description: 'Rillettes bong, aioli, relish, herb',
      descriptionKorean: '리예트 봉, 아이올리, 렐리쉬, 허브',
      image: '/images/lisbon/duck.png',
    },
    {
      id: 4,
      animal: 'Fish',
      animalKorean: '생선',
      description: "Seasonal fish, mussel cream sauce, Buddha's hand",
      descriptionKorean: '제철생선, 홍합 소스, 불수감',
      image: '/images/lisbon/fish.png',
    },
    {
      id: 5,
      animal: 'Pig',
      animalKorean: '돼지',
      description: 'Risotto with prawn stock, chicharon, squid(cannery)',
      descriptionKorean: '새우 스톡 리조토, 돼지껍질, 오징어(cannery)',
      image: '/images/lisbon/pig.png',
    },
    {
      id: 6,
      animal: 'Rabbit',
      animalKorean: '토끼',
      description: 'Ballottine, carrot & carrot puree, green salad',
      descriptionKorean: '발로틴, 당근 & 당근 퓨레, 그린 샐러드',
      image: '/images/lisbon/rabbit.png',
    },
    {
      id: 7,
      animal: 'Lamb',
      animalKorean: '양',
      description: 'Grilled lamb shoulder, romesco, chimichurri',
      descriptionKorean: '숯불 양꼬치, 로메스코, 치미추리',
      image: '/images/lisbon/sheep.png',
    },
    {
      id: 8,
      animal: 'Dessert',
      animalKorean: '디저트',
      description: 'Cake',
      descriptionKorean: '돼지기름, 아몬드',
    },
  ];

  // Extra menu item
  const extraItem = {
    animal: 'Extra',
    animalKorean: '추가 메뉴',
    description: 'Chicken burger (2p) / 10,000KRW',
    descriptionKorean: '치킨 버거(2p) / 10,000원',
  };

  return (
    <div
      className={`-m-8 min-h-screen max-w-4xl bg-yellow-50 px-4 py-20 text-blue-800 lg:mx-auto`}
    >
      {/* Title Section */}
      <div className="mb-10 text-center">
        <h1 className="mb-4 font-serif text-4xl font-bold italic md:text-5xl">
          LISBON CANNERY
        </h1>
        <h2 className="mb-6 font-serif text-3xl font-bold italic md:text-4xl">
          ANIMAL PLANET
        </h2>
        <p className="font-serif text-lg italic">by Kyle & Won</p>

        <div className="mt-6">
          <Separator className="mb-4 bg-blue-800" />
          <p className="text-lg">2025.03.02 - 2025.03.03</p>
          <p className="text-lg">17:00 - 24:00</p>
          <p className="mt-2 text-sm">Lisbon Cannery Yongnidan</p>
          <p className="text-sm">서울시 용산구 한강대로 50길 17</p>
          <p className="text-sm">17, Hangang-daero 50-gil, Yongsan-gu, Seoul</p>
          <Separator className="mt-4 bg-blue-800" />
        </div>
      </div>

      {/* Menu Items */}
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-6 text-center text-2xl font-bold">
          8 Courses / 80,000KRW
        </h3>

        <div className="space-y-8">
          {menuItems.map((item) => (
            <div key={item.id}>
              <div className="flex flex-col items-center gap-4 border-blue-800/30 pb-6 md:flex-row md:items-start">
                <div className="flex size-24 shrink-0 items-center justify-center">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.animal}
                      className="size-20 object-contain"
                      width={100}
                      height={100}
                    />
                  )}
                </div>
                <div className="grow text-center md:text-left">
                  <h4 className="text-xl font-bold">
                    {item.id}. <span className="font-serif">{item.animal}</span>{' '}
                    <span className="text-lg font-normal">
                      / {item.animalKorean}
                    </span>
                  </h4>
                  <p className="mt-1">{item.description}</p>
                  <p className="mt-1 text-sm">{item.descriptionKorean}</p>
                </div>
              </div>
              <Separator className="bg-blue-800/30 md:-mx-8 md:w-auto lg:-mx-12" />
            </div>
          ))}

          {/* Extra Item */}
          <div className="flex flex-col items-center gap-4 pt-6 md:flex-row md:items-start">
            <div className="grow text-center md:text-left">
              <h4 className="font-serif text-xl font-bold">
                {extraItem.animal}{' '}
                <span className="font-sans text-lg font-normal">
                  / {extraItem.animalKorean}
                </span>
              </h4>
              <p className="mt-1">{extraItem.description}</p>
              <p className="mt-1 text-sm">{extraItem.descriptionKorean}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
