import { useEffect, useState } from 'react';

export function NotFound() {
  return (
    <div className="notfound">
      <div className="nf-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3-3M8.5 8.5l5 5m0-5l-5 5" />
        </svg>
      </div>
      <h2>Vinho não encontrado</h2>
      <p>A colheita ou rótulo que procura não está disponível ou não existe na adega.
        Experimente outro nome, ou veja as sugestões abaixo.</p>
    </div>
  );
}

const CURIOSIDADES = [
  'Portugal tem mais de 250 castas autóctones — uma das maiores diversidades do mundo.',
  'O Vinho do Porto e o Vinho da Madeira são vinhos fortificados: leva-se-lhes aguardente para parar a fermentação.',
  'A região do Douro foi a primeira região vinícola demarcada e regulamentada do mundo, em 1756.',
  'O Vinho Verde não é "verde" de cor — o nome vem de ser um vinho jovem, bebido cedo.',
  'O Vinho da Madeira pode durar mais de 100 anos, e muitos ficam melhores com o calor.',
  'A rolha de cortiça vem do sobreiro, e Portugal é o maior produtor de cortiça do mundo.',
  'Servir o tinto ligeiramente fresco (16–18 °C), e não à temperatura ambiente, realça os aromas.',
  'As "pernas" ou "lágrimas" que escorrem no copo indicam sobretudo o teor de álcool, não a qualidade.',
  'O Alentejo é famoso pelos vinhos feitos em talha de barro, uma técnica com raízes romanas.',
  'A casta Touriga Nacional é considerada a rainha das castas tintas portuguesas.',
  'Arejar (decantar) um tinto jovem e encorpado ajuda a soltar os aromas antes de o beber.',
  'Espumantes bem guardados devem ficar deitados, para a rolha não secar e deixar entrar ar.',
];

export function EmptyPrompt() {
  const [i, setI] = useState(() => Math.floor(Math.random() * CURIOSIDADES.length));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduz = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let troca: ReturnType<typeof setTimeout> | undefined;

    const id = setInterval(() => {
      if (reduz) {
        setI(v => (v + 1) % CURIOSIDADES.length);
      } else {
        setVisible(false);
        troca = setTimeout(() => { setI(v => (v + 1) % CURIOSIDADES.length); setVisible(true); }, 400);
      }
    }, 6000);

    return () => { clearInterval(id); clearTimeout(troca); };
  }, []);

  return (
    <div className="prompt curio">
      <div className="curio-tag">Sabia que…</div>
      <div className={`curio-text ${visible ? 'in' : 'out'}`}>{CURIOSIDADES[i]}</div>
    </div>
  );
}
