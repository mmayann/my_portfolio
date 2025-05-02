import Hero from './sections/Hero';
import Works from './sections/Works';
import Skills from './sections/Skills';
import ScrollButton from './ScrollButton';
import RatingCriteria from './RatingCriteria';

export default function Main() {
  return (
    <main className="flex-1 p-8">
      <Hero />
      <Works />
      <Skills />
      <RatingCriteria/>
      <ScrollButton label ="top"/>
    </main>
  );
}