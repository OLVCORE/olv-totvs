import Hero from '@/components/home/Hero';
import Solucoes from '@/components/home/Solucoes';
import IntroducaoInstitucionalOLV from '@/components/consultoria/IntroducaoInstitucionalOLV';
import Setores from '@/components/home/Setores';
import ComoFunciona from '@/components/home/ComoFunciona';
import Depoimentos from '@/components/home/Depoimentos';
import Parceria from '@/components/home/Parceria';
import CTAFinal from '@/components/home/CTAFinal';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Solucoes />
      <IntroducaoInstitucionalOLV
        nomeSolucao="Ecossistema TOTVS"
        aplicacaoEspecifica="transformação digital, supply chain global e gestão empresarial integrada"
      />
      <Setores />
      <ComoFunciona />
      <Depoimentos />
      <Parceria />
      <CTAFinal />
    </>
  );
}

