import { useState } from "react";
type Props = { introActive: boolean; handleIntroClick: () => void; };

export default function IntroOverlay({introActive,handleIntroClick}:Props) {
  const [step, setStep] = useState(-1);
  const steps = [StepOne, StepTwo];

  const [visible, setVisible] = useState(true);

  const handleClick = ()=>{
    setStep(step + 1);
    if(steps.length > step ){
      setVisible(false);
    }
  }
  return (
      <div
        className={`absolute inset-0 z-50 flex items-center justify-center ${visible ? "flex" : "hidden"}`}
      >
        <div
          className={`relative
            transition-opacity duration-300 w-full flex justify-center h-full
          `}
        >
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500
                ${step > 1 ? "opacity-0 invisible" : "opacity-100"}
              `}
              onClick={handleClick}
            >
              <StepTwo />
            </div>
            
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500
                ${step === 0 ? "opacity-100" : "opacity-0 invisible"}
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
  )
}


function StepOne() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-white">
      <p className="text-[14px] text-[#505050] uppercase">PARLEY.</p>
    </div>
  );
}

function StepTwo() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center bg-white">
        <div><img src="/img-01.png" alt="img" /></div>
      </div>
    
    </>
  );
}
