import { useState } from "react";

export default function IntroOverlay() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  const handleClick = () => {
    // step0 -> step1
    if (step === 0) {
      setStep(1);
      return;
    }

    if (step === 1) {
      setVisible(false);

      // fade 끝난 뒤 DOM 제거
      setTimeout(() => {
        setMounted(false);
      }, 500);
    }
  };

  if (!mounted) return null;

  return (
    <div
      className={`
        absolute inset-0 z-50 flex items-center justify-center
        transition-opacity duration-400
        bg-white/50
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className="relative w-full h-full flex justify-center">
        
        {/* STEP 2 */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            transition-opacity duration-400
            ${step < 2 ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          onClick={handleClick}
        >
          <StepTwo />
        </div>

        {/* STEP 1 */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            transition-opacity duration-400
            ${step < 1 ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          onClick={handleClick}
        >
          <StepOne />
        </div>
      </div>

      <p className="w-full h-[30px] flex items-center justify-center text-[8px] text-zinc-400 absolute bottom-0">
        powered by dgmatst.
      </p>
    </div>
  );
}

function StepOne() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-white/50 backdrop-blur-[3px]">
      <p className="text-[14px] text-[#505050] uppercase">
        PARLEY.
      </p>
    </div>
  );
}

function StepTwo() {
  return (
    <div className="max-w-[300px] w-full h-full flex justify-center items-center bg-white/50 backdrop-blur-[3px]">
      <p className="text-[14px] text-[#909090] uppercase text-center leading-relaxed">
        생각은 일련의 흐름처럼 인식되지만, 들여다보면
        <br />
        복수의 주체들 사이에서 벌어지는 협상에 가깝다는
        <br />
        사실을 깨닫습니다.
        <br />
        <br />
        이 비가시적 협상에 실체를 부여할 때, 그것과 나
        사이에는 거리가 형성되고, 생각은 관찰의 대상이
        됩니다. 생각은 섣부른 결론으로 향하기 전 무엇을
        말하려 하는지 모습을 드러냅니다.
      </p>
    </div>
  );
}