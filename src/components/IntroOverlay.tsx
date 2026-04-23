import { useState } from "react";

type Props = {
  introActive: boolean;
  handleIntroClick: () => void;
};

export default function IntroOverlay({introActive,handleIntroClick}:Props) {
  const [step, setStep] = useState(0);
  const [introSkip, setIntroSkip] = useState(false);

  const [visible, setVisible] = useState(true);
  const steps = [<StepOne />, <StepTwo />, <StepThree />,<StepFour/>,<StepFive/>,<StepSix/>];
  const handleNext = () => {
    setVisible(false);
    setTimeout(() => {
      if (step < steps.length -1) {
        setStep((prev) => prev + 1);
        setVisible(true);
      } else {
        handleIntroClick();
      }
      setIntroSkip(true);
    }, 200);
  };

  const handleSkip = (e: React.MouseEvent)=>{
    e.stopPropagation();
    setTimeout(() => {
      handleIntroClick();
      setIntroSkip(true);
    }, 200);
  }
  
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
        
        <div className="absolute bottom-[100px] w-[80px] h-[40px] flex items-center justify-center cursor-pointer gap-[10px]">
          <p className="text-[17px] w-[55px] h-[40px] flex items-center justify-center text-[#909090]" onClick={handleNext}>&gt;</p>
          <p
            className={`
              w-[55px] h-[40px] flex items-center justify-center text-[#909090]
              ${introSkip ? "hidden" : "flex"}
            `}
            onClick={handleSkip}
          >
            &gt;&gt;
          </p>
          
        </div>
        
        <p className="w-full h-[30px] flex items-center justify-center text-[8px] text-zinc-400 absolute bottom-0">
          powered by dgmatst.
        </p>
    </div>
  )
}


function StepOne() {
  return (
    <div className="text-[14px] max-w-[300px] flex flex-col justify-center text-[#505050] uppercase">
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
    <>
      <div className="flex flex-col max-w-[300px] items-center">
        <div><img src="/img-01.png" alt="img" /></div>
      </div>
    
    </>
  );
}

function StepThree() {
  return (
    <div className="flex flex-col max-w-[300px] items-center">
      <div className="mb-[30px]"><img src="/img-02.png" alt="img" /></div>
      <div className="text-[15px] text-[#909090] uppercase">
        <span>“Whatever kind of thought arises, have the same reaction: ‘Not me, not my business’. It can be a good thought or a bad thought. Treat them the same way. ‘To whom are these thoughts arising? To You.’ That means you are not the thought. You are the Self. Remain as the Self, and don’t latch onto anything that is not the Self.”</span> 
        <br/>
        <br/>
        <span>- Sri annamalai swami</span>
      </div>
    </div>
  );
}

function StepFour() {
  return (
    <div className="flex max-w-[300px] items-center">
      <img src="/img-03.png" alt="img" />
    </div>
  );
}
function StepFive() {
  return (
    <div className="flex max-w-[300px] items-center">
      <img src="/img-04.png" alt="img" />
    </div>
  );
}

function StepSix() {
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