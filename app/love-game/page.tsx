"use client"
import Image from 'next/image';
import { useState } from 'react';

const places = ['Cafe', 'Park', 'Beach', 'Restaurant', 'Cinema'];
const times = ['Morning', 'Afternoon', 'Evening', 'Night'];

export default function LoveGame() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [place, setPlace] = useState('');
  const [time, setTime] = useState('');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100 px-2 py-8">
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col items-center">
        <h1 className="text-pink-600 text-xl md:text-5xl font-extrabold mb-4 text-center drop-shadow-lg select-none">
          💖 Love Date Game 💖
        </h1>
        <Image src="/heart.jpg" alt="Heart" width={240} height={80} className="mb-6 w-32 h-32 md:w-48 md:h-48 object-contain" />
        {step === 0 && (
          <div className="mt-6 flex flex-col items-center w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Will you be my Valentine?</h2>
            <div className="flex flex-wrap gap-6 justify-center">
              <button
                className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-bold text-xl md:text-2xl shadow-lg transition-all duration-200"
                onClick={() => { setAccepted(true); setStep(1); }}
              >
                Yes 💘
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-pink-700 px-8 py-4 md:px-12 md:py-5 rounded-full font-bold text-xl md:text-2xl shadow-lg transition-all duration-200"
                onClick={() => { setAccepted(false); setStep(2); }}
              >
                No 💔
              </button>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="mt-6 flex flex-col items-center w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Pick a place for our date:</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {places.map(p => (
                <button
                  key={p}
                  className="bg-pink-100 border-2 border-pink-400 hover:bg-pink-200 text-pink-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-lg md:text-xl shadow transition-all duration-200"
                  onClick={() => { setPlace(p); setStep(3); }}
                >
                  {p} 🏩
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="mt-6 flex flex-col items-center w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Pick a time for our date:</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {times.map(t => (
                <button
                  key={t}
                  className="bg-pink-100 border-2 border-pink-400 hover:bg-pink-200 text-pink-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-lg md:text-xl shadow transition-all duration-200"
                  onClick={() => { setTime(t); setStep(4); }}
                >
                  {t} ⏰
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="mt-8 flex flex-col items-center w-full text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-600">Yay! 🎉</h2>
            <p className="text-lg md:text-2xl mb-4">
              Our date is at <b>{place}</b> in the <b>{time}</b>! <br />
              Looking forward to it! 💑
            </p>
            <Image src="/lovebirds.gif" alt="Love Birds" width={180} height={120} className="mx-auto w-32 h-24 md:w-44 md:h-32 object-contain" />
          </div>
        )}
        {step === 2 && (
          <div className="mt-8 flex flex-col items-center w-full text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-600">Oh no! 💔</h2>
            <p className="text-lg md:text-2xl mb-4">Maybe next time...</p>
            <Image src="/brokenheart.gif" alt="Broken Heart" width={100} height={100} className="mx-auto w-20 h-20 md:w-28 md:h-28 object-contain" />
          </div>
        )}
      </div>
    </main>
  );
}
