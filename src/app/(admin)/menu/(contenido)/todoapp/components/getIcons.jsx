import {
  Bubbles,
  ChartCandlestick,
  Clipboard,
  RefreshCcw,
  Sparkle,
  SprayCan,
  Wrench,
} from 'lucide-react';

const getTaskIconByTitle = (titulo) => {
  return titulo.toLowerCase().includes('pintar') ? (
    <SprayCan className="fill-blue-300" />
  ) : titulo.toLowerCase().includes('lavar') ? (
    <Bubbles className="text-blue-500" />
  ) : titulo.toLowerCase().includes('pulir') ? (
    <Sparkle className="animate-pulse fill-amber-400" />
  ) : titulo.toLowerCase().includes('reparar') ? (
    <Wrench className="fill-gray-400" />
  ) : titulo.toLowerCase().includes('cambiar') ? (
    // Si luegos quieres agregarle el spin que querias es className="animate-spin [animation-duration:15000ms]" con 15s para dar un giro
    <RefreshCcw />
  ) : titulo.toLowerCase().includes('mejorar') ? (
    <ChartCandlestick />
  ) : (
    <Clipboard />
  );
};

export default getTaskIconByTitle;
