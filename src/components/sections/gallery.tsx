"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

import { GALLERY_IMAGES } from "@/lib/gallery-images";

export function ClinicGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [failed, setFailed] = useState<Set<string>>(new Set());

  const images = GALLERY_IMAGES.filter((img) => !failed.has(img.src));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="bg-soft-ivory w-[calc(100%-24px)] md:w-[calc(100%-24px)] lg:w-[calc(100%-80px)] mx-auto">
      <div className="w-full px-4 lg:px-8 py-8 lg:py-12">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-deep-teal uppercase">
            Clinic Gallery
          </span>
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold tracking-tight text-charcoal leading-[1.2]">
            Inside PRAJWAL PHYSIO REHAB CENTRE
          </h2>
          <p className="text-muted-text leading-relaxed text-lg">
            A closer look at our clinic and rehabilitation environment.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => {
            let hideClass = "";
            if (!showAll) {
              if (index >= 8) hideClass = "hidden";
              else if (index >= 6) hideClass = "hidden lg:block";
            }
            return (
            <div
              key={image.src}
              className={`group relative aspect-square rounded-xl overflow-hidden border border-charcoal/10 bg-white cursor-pointer ${hideClass}`}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index === 0}
                onError={() => setFailed((prev) => new Set(prev).add(image.src))}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">View</span>
              </div>
            </div>
          );
        })}
        </div>

        {images.length > 6 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center justify-center rounded-md text-white bg-deep-teal px-6 py-2.5 text-sm font-semibold"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}

        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-2xl max-h-[85vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-colors"
                  aria-label="Close gallery"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  className="w-full max-h-[70vh] object-contain object-center rounded-xl border border-white/20"
                  sizes="100vw"
                  priority
                />
                <p className="mt-3 text-xs text-white/70">
                  {currentIndex + 1} of {images.length}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ClinicGallery;
