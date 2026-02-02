"use client"
import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function LoveConfession() {
  const [stage, setStage] = useState('question');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noSize, setNoSize] = useState(1);
  type HeartType = { id: number; left: number; delay: number; duration: number };
  const [hearts, setHearts] = useState<HeartType[]>([]);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  // Love/date game additions
  const [showDateGame, setShowDateGame] = useState(false);
  const [dateStep, setDateStep] = useState(0);
  const [place, setPlace] = useState('');
  const [time, setTime] = useState('');
  const places = ['Cafe', 'Park', 'Beach', 'Restaurant', 'Cinema'];
  const times = ['Morning', 'Afternoon', 'Evening', 'Night'];

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
    setShowDateGame(true);
    setDateStep(0);
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


  // Animated background hearts (client only)
  const [bgHearts, setBgHearts] = useState<Array<{
    left: number;
    top: number;
    width: number;
    height: number;
    animation: string;
    animationDelay: number;
  }>>([]);
  useEffect(() => {
    const hearts = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 20 + Math.random() * 30,
      height: 20 + Math.random() * 30,
      animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
      animationDelay: Math.random() * 2
    }));
    setBgHearts(hearts);
  }, []);

  // Main render
  return (
    <div
      id="love-container"
      className="min-h-screen w-full flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-pink-300 via-fuchsia-200 to-yellow-100 animate-gradient-move"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background hearts */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {bgHearts.map((h, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-20 drop-shadow-lg"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              width: `${h.width}px`,
              height: `${h.height}px`,
              animation: h.animation,
              animationDelay: `${h.animationDelay}s`
            }}
          />
        ))}
        {/* Sparkle overlay */}
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute text-yellow-300 opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${18 + Math.random() * 32}px`,
              filter: 'blur(0.5px)'
            }}
          >
            ✨
          </span>
        ))}
      </div>

      {/* Love confession game */}
      {!showDateGame ? (
        stage === 'question' ? (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-16 max-w- w-full mx-4 relative z-10 transform transition-all duration-500 hover:scale-105 border-4 border-pink-200">
            <div className="text-center flex mb-8 animate-bounce items-center justify-center gap-2 md:gap-8">
              <Heart className="hidden md:block w-24 h-24 text-red-400 fill-red-500 drop-shadow-lg animate-heartbeat" />
              <Image src="https://i.pinimg.com/originals/89/35/50/89355081a213ca3f622b0b39b94e9016.gif" alt='I love you' width={220} height={220} className='rounded-full border-4 border-pink-200 shadow-xl'  unoptimized  />
              <Heart className="hidden md:block w-24 h-24 text-red-400 fill-red-500 drop-shadow-lg animate-heartbeat" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6 bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse drop-shadow-lg">
                Love Game <br /> <br /> 💕
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
              <button
                onClick={handleYesClick}
                className="bg-linear-to-r from-pink-500 to-red-500 text-white px-12 py-5 rounded-full font-extrabold text-2xl shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 hover:from-pink-600 hover:to-red-600 border-2 border-pink-300"
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
                className="bg-gray-300 text-pink-700 px-12 py-5 rounded-full font-extrabold text-2xl shadow-xl border-2 border-gray-200 absolute right-8 select-none cursor-pointer"
                tabIndex={-1}
              >
                No
              </button>
            </div>
            <p className="text-lg text-center text-gray-500 mt-10 italic font-medium">
              "In a sea of people, my eyes will always search for you" 🌊
            </p>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-16 max-w-xl w-full mx-4 relative z-10 animate-scale-in border-4 border-pink-200">
            <div className="text-center flex flex-col items-center">
              <div className="mb-8 flex items-center justify-center relative">
                <Image src="https://media.tenor.com/uBQM6iJ_hsgAAAAM/hug-cute.gif" alt='I love you' width={220} height={220} className='rounded-full border-4 border-pink-200 shadow-xl' unoptimized  />
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                🎉 Yay! 🎉
              </h1>
              <p className="text-2xl md:text-3xl text-gray-800 mb-6 font-semibold">
                I love you too, Cutie! 💖
              </p>
              <div className="space-y-4 text-gray-600 text-xl md:text-2xl">
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
                className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-purple-300"
              >
                Ask me again! 💕
              </button>
            </div>
          </div>
        )
      ) : (
        // Love/date game UI
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-16  w-full mx-4 relative z-10 animate-scale-in flex flex-col items-center border-4 border-pink-200">
          <h1 className="text-lg md:text-4xl lg:text-5xl font-extrabold text-center mb-6 text-pink-600 drop-shadow-lg">💖 Love Date Game 💖</h1>
          <Image src="/heart.jpg" alt="Heart" width={220} height={220} className="" />
          {dateStep === 0 && (
            <div className="mt-8 text-center">
              <h2 className="text-lg md:text-3xl font-bold mb-6">Will you be my Valentine?</h2>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 md:px-12 md:py-5 rounded-full font-bold text-xl md:text-2xl shadow-lg transition-all duration-200"
                  onClick={() => setDateStep(1)}
                >
                  Yes 💘
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-pink-700 px-6 py-2 md:px-12 md:py-5 rounded-full font-bold text-xl md:text-2xl shadow-lg transition-all duration-200"
                  onClick={() => setDateStep(4)}
                >
                  No 💔
                </button>
              </div>
            </div>
          )}
          {dateStep === 1 && (
            <div className="mt-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Pick a place for our date:</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {places.map(p => (
                  <button
                    key={p}
                    className="bg-pink-100 border-2 border-pink-400 hover:bg-pink-200 text-pink-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-lg md:text-xl shadow transition-all duration-200"
                    onClick={() => { setPlace(p); setDateStep(2); }}
                  >
                    {p} 🏩
                  </button>
                ))}
              </div>
            </div>
          )}
          {dateStep === 2 && (
            <div className="mt-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Pick a time for our date:</h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {times.map(t => (
                  <button
                    key={t}
                    className="bg-pink-100 border-2 border-pink-400 hover:bg-pink-200 text-pink-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-lg md:text-xl shadow transition-all duration-200"
                    onClick={() => { setTime(t); setDateStep(3); }}
                  >
                    {t} ⏰
                  </button>
                ))}
              </div>
            </div>
          )}
          {dateStep === 3 && (
            <div className="mt-10 flex flex-col items-center w-full text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-600">Yay! 🎉</h2>
              <p className="text-lg md:text-2xl mb-4">
                Our date is at <b>{place}</b> in the <b>{time}</b>! <br />
                Looking forward to it! 💑
              </p>
              <Image src="/lovebirds.gif" alt="Love Birds" width={180} height={120} className="" />
              <button
                className="mt-8 bg-purple-400 hover:bg-purple-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-all duration-200"
                onClick={() => { setShowDateGame(false); setStage('question'); setDateStep(0); setPlace(''); setTime(''); }}
              >
                Play again
              </button>
            </div>
          )}
          {dateStep === 4 && (
            <div className="mt-10 flex flex-col items-center w-full text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-600">Oh no! 💔</h2>
              <p className="text-lg md:text-2xl mb-4">Maybe next time...</p>
              <Image src="/brokenheart.gif" alt="Broken Heart" width={220} height={220} className="" />
              <button
                className="mt-8 bg-gray-400 hover:bg-gray-500 text-pink-700 px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-all duration-200"
                onClick={() => { setShowDateGame(false); setStage('question'); setDateStep(0); setPlace(''); setTime(''); }}
              >
                Try again
              </button>
            </div>
          )}
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
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}