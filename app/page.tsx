"use client"
import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function LoveConfession() {
  const [stage, setStage] = useState('question');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noSize, setNoSize] = useState(1);
  type HeartType = { id: number; left: number; delay: number; duration: number };
  const [hearts, setHearts] = useState<HeartType[]>([]);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    // Move No button to a random position within the container
    const container = document.getElementById('love-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const btnWidth = 120;
    const btnHeight = 56;
    const padding = 20;
    const maxX = rect.width - btnWidth - padding;
    const maxY = rect.height - btnHeight - padding;
    const newX = Math.random() * maxX - rect.width / 2 + btnWidth / 2;
    const newY = Math.random() * maxY - rect.height / 2 + btnHeight / 2;
    setNoPosition({ x: newX, y: newY });
    setNoSize(1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (stage !== 'question') return;
    const btn = noBtnRef.current;
    if (!btn) return;
    const btnRect = btn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const threshold = 80; // px, how close before it jumps
    if (
      mouseX > btnRect.left - threshold &&
      mouseX < btnRect.right + threshold &&
      mouseY > btnRect.top - threshold &&
      mouseY < btnRect.bottom + threshold
    ) {
      moveNoButton();
    }
  };

  const handleYesClick = () => {
    setStage('accepted');
    generateHearts();
  };

  const generateHearts = () => {
    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }));
    setHearts(newHearts);
  };

  return (
    <div
      id="love-container"
      className="min-h-screen container  bg-linear-to-br from-pink-200 via-purple-200 to-pink-100 flex items-center justify-center overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {stage === 'question' ? (
        <div className="bg-white backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-121 w-full mx-4 relative z-10 transform transition-all duration-500 hover:scale-105">
          <div className="text-center flex mb-8 animate-bounce">
             <Heart className="hidden lg:block w-20 h-20 mx-auto text-red-500 fill-red-500 mb-4" />
            <Image src="https://i.pinimg.com/originals/89/35/50/89355081a213ca3f622b0b39b94e9016.gif" alt='I love you' width={200} height={200} className='rounded-full'  unoptimized  />
            <Heart className="hidden lg:block w-20 h-20 mx-auto text-red-500 fill-red-500 mb-4" />
          </div>
          <h1 className="text-4xl font-bold text-center mb-4 bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            💕Do you love me?💕
          </h1>
          <p className="text-xl text-center text-gray-700 mb-8 font-medium">
            
          </p>
          <div className="flex justify-between items-center relative h-20 px-8">
            <button
              onClick={handleYesClick}
              className="bg-linear-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 hover:from-pink-600 hover:to-red-600 z-10"
            >
              Yes! 💗
            </button>
            <button
              ref={noBtnRef}
              onClick={e => e.preventDefault()}
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${noSize})`,
                transition: 'transform 0.2s cubic-bezier(0.4,1.4,0.6,1)',
                zIndex: 20
              }}
              className="bg-gray-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg absolute right-8 select-none cursor-pointer"
              tabIndex={-1}
            >
              No
            </button>
          </div>
          <p className="text-sm text-center text-gray-500 mt-8 italic">
            "In a sea of people, my eyes will always search for you" 🌊
          </p>
        </div>
      ) : (
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4 relative z-10 animate-scale-in">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center  relative">
               <Image src="https://media.tenor.com/uBQM6iJ_hsgAAAAM/hug-cute.gif" alt='I love you' width={200} height={200} className='rounded-full' unoptimized  />
              {/* <Heart className="w-32 h-32 mx-auto text-red-500 fill-red-500 animate-heartbeat" /> */}
            </div>
            <h1 className="text-5xl font-bold mb-6 py-2 bg-linear-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
             🎉 Yay! 🎉
            </h1>
            <p className="text-2xl text-gray-800 mb-4 font-semibold">
               I love you too, Cutie! 💖
            </p>
            <div className="space-y-3 text-gray-600 text-lg">
              <p className="italic">"You make my heart smile" 😊</p>
              <p className="italic">"Every love story is beautiful, but ours is my favorite" 📖</p>
              <p className="italic">"You're my favorite notification" 📱</p>
            </div>
            <button
              onClick={() => {
                setStage('question');
                setNoPosition({ x: 0, y: 0 });
                setNoSize(1);
                setHearts([]);
              }}
              className="mt-8 bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Ask me again! 💕
            </button>
          </div>
        </div>
      )}

      {/* Falling hearts on acceptance - across the whole screen */}
      {stage === 'accepted' && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {hearts.map(heart => (
            <Heart
              key={heart.id}
              className="absolute text-red-500 fill-red-500 pointer-events-none animate-fall"
              style={{
                left: `${heart.left}%`,
                top: '-50px',
                width: '30px',
                height: '30px',
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  );
}