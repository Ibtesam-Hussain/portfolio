import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <main className="flex-1">
      <Reveal><Hero /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><Work /></Reveal>
      <Reveal><Experience /></Reveal>
      <Reveal><Notes /></Reveal>
      <Reveal><Footer /></Reveal>
    </main>
  );
}
