import { useState } from "react";

type Props = {
  introActive: boolean;
  handleIntroClick: () => void;
};

export default function IntroOverlay({introActive,handleIntroClick}:Props) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const steps = [<StepOne />, <StepTwo />, <StepThree />];
  const handleNext = () => {
    setVisible(false);

    setTimeout(() => {
      if (step < 2) {
        setStep((prev) => prev + 1);
        setVisible(true);
      } else {
        handleIntroClick();
      }
    }, 300);
  };
  
  return (
      <div
        className={`
          absolute inset-0 z-50 flex items-center justify-center bg-white
          transition-all duration-500 ease-out
          ${introActive
            ? "opacity-100"
            : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          className={`
            transition-opacity duration-300 w-full flex justify-center
            ${visible ? "opacity-100" : "opacity-0"}
          `}
        >
          {steps[step]}
        </div>
        
        <div className="absolute bottom-[100px] w-[80px] h-[40px] flex items-center justify-center cursor-pointer" onClick={handleNext}>
          <p className="text-[17px] text-[#000]">&gt;</p>
        </div>
        
        <p className="w-full h-[30px] flex items-center justify-center text-[8px] text-zinc-400 absolute bottom-0">
          powered by dgmatst.
        </p>
    </div>
  )
}


function StepOne() {
  return (
    <div className="text-[15px] max-w-[185px] flex flex-col justify-center text-[#505050] uppercase">
      par·ley<br />
      /ˈpärlē/<br />
      <br />
      <span className="text-[#909090]">noun</span><br />
      <br />
      <span className="text-[#909090]">a conference between opposing sides in a dispute, especially a discussion of terms for an armistice.</span>
      <br />
      <br />
      <span className="text-[#909090]">2026</span>
    </div>
  );
}

function StepTwo() {
  return (
    <div className="text-[15px] max-w-[300px] text-[#909090]">
      There is no such thing as winning an argument. there is only an inaccurate and biased opinion that tricks oneself to believe that there is. 
    </div>
  );
}

function StepThree() {
  return (
    <div className="text-[14px] w-full flex flex-col gap-[30px]">
      <div className='max-w-[300px] text-right w-full m-auto flex justify-center items-center'>
        <div className='w-1/2 text-[#909090]'><span className='text-[#505050]'>사용 설명</span><br/><br/>(   +   ) 로 협상을<br/>시작합니다<br/>( - ) 로 다시 시작합니다</div>
        <div className='w-1/2'></div>
      </div>
      <div className='max-w-[300px] w-full m-auto flex justify-center items-center'>
        <div className='w-1/2'></div>
        <div className='w-1/2 text-[#909090]'><span className='text-[#505050]'>INSTRUCTIONS</span><br/><br/>(   +   ) to start<br/>a parley<br/>( - ) to start over</div>
      </div>
    </div>
  );
}