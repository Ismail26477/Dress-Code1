import { useState, useEffect } from 'react';
import productSequinGown from '@/assets/product-sequin-gown.png';
import productCreamPleatedDress from '@/assets/product-cream-pleated-dress.png';
import productLaceMidiDress from '@/assets/product-lace-midi-dress.png';
import productCamelCoat from '@/assets/product-camel-coat.png';
import productGoldenGown from '@/assets/product-golden-gown.png';

const slides = [
  { image: productSequinGown, title: 'Party Season', subtitle: 'Sequin gowns - Up to 40% Off', cta: 'Shop Now' },
  { image: productCreamPleatedDress, title: 'Elegant Midi', subtitle: 'Statement sleeves collection', cta: 'Explore' },
  { image: productLaceMidiDress, title: 'Lace & Grace', subtitle: 'Premium celebration wear', cta: 'Shop Now' },
  { image: productCamelCoat, title: 'Winter Layers', subtitle: 'Coats & trench starting ₹2990', cta: 'Discover' },
  { image: productGoldenGown, title: 'Ethnic Royale', subtitle: 'Wedding Collection', cta: 'Explore' },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl mx-3">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full relative aspect-[3/4]">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-4 right-4">
              <h2 className="font-script text-3xl text-card font-bold drop-shadow-lg">{slide.title}</h2>
              <p className="text-card/90 text-sm mt-1 drop-shadow">{slide.subtitle}</p>
              <button className="mt-3 bg-primary text-primary-foreground text-xs font-bold px-6 py-2.5 rounded-full shadow-lg">
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-card w-5' : 'bg-card/50'}`} />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
