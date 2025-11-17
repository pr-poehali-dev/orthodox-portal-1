import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import PrayerBeads from '@/components/PrayerBeads';
import Icon from '@/components/ui/icon';

const prayers = [
  {
    title: 'Отче наш',
    text: 'Отче наш, Иже еси на небесех! Да святится имя Твое, да приидет Царствие Твое, да будет воля Твоя, яко на небеси и на земли. Хлеб наш насущный даждь нам днесь; и остави нам долги наша, якоже и мы оставляем должником нашим; и не введи нас во искушение, но избави нас от лукавого.'
  },
  {
    title: 'Богородице Дево, радуйся',
    text: 'Богородице Дево, радуйся, Благодатная Марие, Господь с Тобою; благословена Ты в женах и благословен плод чрева Твоего, яко Спаса родила еси душ наших.'
  },
  {
    title: 'Царю Небесный',
    text: 'Царю Небесный, Утешителю, Душе истины, Иже везде сый и вся исполняяй, Сокровище благих и жизни Подателю, прииди и вселися в ны, и очисти ны от всякия скверны, и спаси, Блаже, души наша.'
  },
  {
    title: 'Символ веры',
    text: 'Верую во единаго Бога Отца, Вседержителя, Творца небу и земли, видимым же всем и невидимым. И во единаго Господа Иисуса Христа, Сына Божия, Единороднаго, Иже от Отца рожденнаго прежде всех век; Света от Света, Бога истинна от Бога истинна, рожденна, несотворенна, единосущна Отцу, Имже вся быша...'
  }
];

const psalms = [
  {
    number: 1,
    title: 'Псалом 1',
    text: 'Блажен муж, который не ходит на совет нечестивых и не стоит на пути грешных и не сидит в собрании развратителей, но в законе Господа воля его, и о законе Его размышляет он день и ночь!'
  },
  {
    number: 22,
    title: 'Псалом 22',
    text: 'Господь - Пастырь мой; я ни в чем не буду нуждаться: Он покоит меня на злачных пажитях и водит меня к водам тихим, подкрепляет душу мою, направляет меня на стези правды ради имени Своего.'
  },
  {
    number: 50,
    title: 'Псалом 50',
    text: 'Помилуй мя, Боже, по велицей милости Твоей, и по множеству щедрот Твоих очисти беззаконие мое. Наипаче омый мя от беззакония моего, и от греха моего очисти мя.'
  },
  {
    number: 90,
    title: 'Псалом 90',
    text: 'Живый в помощи Вышняго, в крове Бога Небеснаго водворится. Речет Господеви: Заступник мой еси и Прибежище мое, Бог мой, и уповаю на Него.'
  }
];

const saints = [
  {
    name: 'Святитель Николай Чудотворец',
    date: '19 декабря',
    description: 'Архиепископ Мир Ликийских, великий угодник Божий. Прославился милосердием, чудотворениями и заступничеством за обиженных.',
    life: 'Родился в III веке в городе Патаре. С юности избрал монашеский путь. Известен многочисленными чудесами и помощью нуждающимся. После смерти от его мощей истекает целебное миро.'
  },
  {
    name: 'Преподобный Сергий Радонежский',
    date: '8 октября',
    description: 'Великий русский святой, основатель Троице-Сергиевой лавры, игумен земли Русской.',
    life: 'Родился в 1314 году. С детства стремился к монашеской жизни. Основал обитель в честь Святой Троицы, ставшую духовным центром Руси. Благословил Дмитрия Донского на Куликовскую битву.'
  },
  {
    name: 'Блаженная Матрона Московская',
    date: '2 мая',
    description: 'Народная святая, прославившаяся даром прозорливости и чудотворений.',
    life: 'Родилась в 1881 году слепой. С детства обладала даром исцеления и прозорливости. Всю жизнь помогала людям молитвой и советом. Скончалась в 1952 году.'
  }
];

const calendar = [
  { date: '7 января', event: 'Рождество Христово', type: 'great' },
  { date: '19 января', event: 'Крещение Господне', type: 'great' },
  { date: '15 февраля', event: 'Сретение Господне', type: 'great' },
  { date: '7 апреля', event: 'Благовещение Пресвятой Богородицы', type: 'great' },
  { date: 'подвижная', event: 'Пасха - Воскресение Христово', type: 'great' },
  { date: 'подвижная', event: 'Вознесение Господне', type: 'great' },
  { date: 'подвижная', event: 'День Святой Троицы', type: 'great' },
  { date: '19 августа', event: 'Преображение Господне', type: 'great' },
  { date: '28 августа', event: 'Успение Пресвятой Богородицы', type: 'great' },
  { date: '21 сентября', event: 'Рождество Пресвятой Богородицы', type: 'great' },
  { date: '27 сентября', event: 'Воздвижение Креста Господня', type: 'great' },
  { date: '14 октября', event: 'Покров Пресвятой Богородицы', type: 'regular' },
  { date: '4 декабря', event: 'Введение во храм Пресвятой Богородицы', type: 'great' },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('beads');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-5xl">☦️</div>
          </div>
          <h1 className="text-6xl font-bold text-primary mb-2">
            Православный портал
          </h1>
          <p className="text-xl text-muted-foreground">
            Путь к духовной жизни
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto p-1">
            <TabsTrigger value="beads" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Circle" size={20} />
              <span className="text-xs">Четки</span>
            </TabsTrigger>
            <TabsTrigger value="prayers" className="flex flex-col items-center gap-1 py-3">
              <Icon name="BookOpen" size={20} />
              <span className="text-xs">Молитвы</span>
            </TabsTrigger>
            <TabsTrigger value="psalms" className="flex flex-col items-center gap-1 py-3">
              <Icon name="ScrollText" size={20} />
              <span className="text-xs">Псалмы</span>
            </TabsTrigger>
            <TabsTrigger value="saints" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Users" size={20} />
              <span className="text-xs">Жития</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex flex-col items-center gap-1 py-3">
              <Icon name="Calendar" size={20} />
              <span className="text-xs">Календарь</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="beads" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-primary mb-2">Молитвенные четки</h2>
              <p className="text-muted-foreground">Помощь в счёте молитв</p>
            </div>
            <PrayerBeads />
          </TabsContent>

          <TabsContent value="prayers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Православные молитвы</CardTitle>
                <CardDescription>Основные молитвы для ежедневного правила</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {prayers.map((prayer, index) => (
                    <AccordionItem key={index} value={`prayer-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold">
                        {prayer.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ScrollArea className="h-auto max-h-64">
                          <p className="text-base leading-relaxed whitespace-pre-wrap">
                            {prayer.text}
                          </p>
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="psalms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Псалтирь</CardTitle>
                <CardDescription>Избранные псалмы царя Давида</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {psalms.map((psalm) => (
                    <AccordionItem key={psalm.number} value={`psalm-${psalm.number}`}>
                      <AccordionTrigger className="text-lg font-semibold">
                        {psalm.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ScrollArea className="h-auto max-h-64">
                          <p className="text-base leading-relaxed">
                            {psalm.text}
                          </p>
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saints" className="space-y-6">
            <div className="grid gap-6">
              {saints.map((saint, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-secondary/30">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{saint.name}</CardTitle>
                        <CardDescription className="text-base flex items-center gap-2">
                          <Icon name="Calendar" size={16} />
                          Память: {saint.date}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-base font-medium mb-4 text-primary">
                      {saint.description}
                    </p>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {saint.life}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Православный календарь</CardTitle>
                <CardDescription>Великие и двунадесятые праздники</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {calendar.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                        item.type === 'great'
                          ? 'bg-accent/30 border-l-accent'
                          : 'bg-muted/30 border-l-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon 
                          name={item.type === 'great' ? 'Star' : 'Circle'} 
                          size={20}
                          className="text-primary"
                        />
                        <div>
                          <p className="font-semibold text-base">{item.event}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      {item.type === 'great' && (
                        <span className="text-xs bg-accent px-3 py-1 rounded-full font-medium">
                          Великий праздник
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="mt-16 text-center text-sm text-muted-foreground border-t border-border pt-8">
          <p>☦️ Да благословит вас Господь на духовный путь</p>
        </footer>
      </div>
    </div>
  );
}
