import React, { useState } from "react";
import { motion, easeOut } from "framer-motion";
import ContactModal from "../Ui/ContactModal";

interface TourProps {
  image: string;
  alt: string;
  duration: string;
  difficulty: string;
  title: string;
  description: string;
  price: string | number;
  isBestSeller?: boolean;
  imagePosition?: "left" | "right";
  onReserve: () => void;
  index?: number;
  FcRating?: number;
}

const TourCard: React.FC<TourProps> = ({
  image,
  duration,
  difficulty,
  title,
  description,
  price,
  isBestSeller = false,
  imagePosition = "left",
  onReserve,
  index = 0
}) => {
  const isLeft = imagePosition === "left";
  
  // Animaciones para la imagen
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: isLeft ? -50 : 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2 + 0.3,
        ease: easeOut
      }
    }
  };

  // Animaciones para el contenido
  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2 + 0.5,
        ease: easeOut
      }
    }
  };

  // Animaciones para elementos internos (stagger)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2 + 0.7 + i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-32`}
    >
      {/* Image Column */}
      <motion.div
        variants={imageVariants}
        className={`md:col-span-7 ${isLeft ? "" : "md:col-start-6 order-1 md:order-2"} relative group cursor-pointer overflow-hidden rounded-xl`}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="aspect-[4/3] bg-gray-200 w-full rounded-xl bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        />
        {isBestSeller && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 + 1, duration: 0.5 }}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-[#181411]"
          >
            Best Seller
          </motion.div>
        )}
      </motion.div>

      {/* Content Column */}
      <motion.div
        variants={contentVariants}
        className={`md:col-span-4 ${isLeft ? "md:col-start-9" : "md:col-start-2 order-2 md:order-1"} flex flex-col justify-center`}
      >
        <motion.div 
          custom={0}
          variants={itemVariants}
          className="flex items-center gap-4 mb-4 text-gray-500"
        >
          <span className="material-symbols-outlined">schedule</span> {duration}
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span className="material-symbols-outlined">landscape</span>{" "}
          {difficulty}
        </motion.div>
        
        <motion.h3 
          custom={1}
          variants={itemVariants}
          className="text-3xl font-bold mb-4 text-[#181411] hover:text-primary transition-colors cursor-pointer"
        >
          {title}
        </motion.h3>
        
        <motion.p 
          custom={2}
          variants={itemVariants}
          className="text-gray-600 mb-6 leading-relaxed"
        >
          {description}
        </motion.p>
        
        <motion.div 
          custom={3}
          variants={itemVariants}
          className="flex items-center justify-between border-t border-gray-100 pt-6"
        >
          <span className="text-2xl font-bold text-primary">
            ${price}{" "}
            <span className="text-sm text-gray-400 font-normal">/ persona</span>
          </span>
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReserve}
            className="text-[#181411] font-bold hover:text-primary transition-colors flex items-center gap-2"
          >
            Reservar Ahora
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Tours: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<string | undefined>();

  const openModal = (tourName: string) => {
    setSelectedTour(tourName);
    setIsModalOpen(true);
  };

  // Animaciones para el título de la sección
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const tours = [
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAr4FNS8oCSmd4oqlmRpeuwMBs3o_Kryz9W_NqfS6PPRJld-hOvxNx5NxvCxOOlh7df7FO4-UVSdPd0bkTchWUtWcF2cjEUS161PtNYWSQtg_8n-gyuXjnUkx8ZjlqZ2pFv8q229X2HVl0GHqn32zfUd9t7e-YCVaIGNbdkEW_B72UGqXOxmLxss1i8cgoKazO68HQlkV_Ay9KUpgwnP9FjOmsdOxcyCqj7PFkDtY_dWJ64hU4_MYuKXBGFZCwUy-Q8nB4ptteLJqP2",
      alt: "Sunrise at Chichen Itza temple with no crowds",
      duration: "2 Houras",
      difficulty: "Moderada",
      title: "Chichén Itzá al Amanecer",
      description:
        "Experimente la maravilla del mundo antes de que se abran las puertas al público. Presencie el amanecer sobre El Castillo, seguido de un baño privado en el cenote sagrado Ik Kil antes de que llegue la multitud.",
      price: "1,490",
      isBestSeller: true,
      imagePosition: "left" as const,
      FcRating: 4.8,
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBrmTay2qC1ypuCMAvzRB3DBmt9V5E9Tsuf6xw54SdF9E3wHsz0VBtXCx3-vvEIzs05gtVS76r2SHlQZjYmYAEgyQ9AEYorb6NtwdImR1mrfB0gF1_3IE72-mIY968l61lb_GGYATUFJ4MiOyXv9nA2zSBkd5muKHWw2mh0dmOcZwlDrBwPm_2CVPV4u0tGvi75xplm-j3s_inAsyNVT9lrG_oL9_xUoZ2hhxbyyzkRDv-r2X0OHdW_lZuQpSfKpRI4ueBYK7IliqFL",
      alt: "Cenote Ikil",
      duration: "1 Hours",
      difficulty: "Facil",
      title: "El Sagrado Cenote Azul - Cenote Ik Kil",
      description:
        "Adéntrate en la selva para descubrir un cenote oculto a cielo abierto. Practica snorkel en aguas cristalinas y llenas de vida, rodeado de lianas colgantes y los sonidos del bosque tropical.",
      price: "1,250",
      imagePosition: "right" as const,
      FcRating: 4.6,
    },
    {
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDI_DJX7hRcjiKWpGQxGpBvIx_l7aUELiVXb60bt8Z9ZSz4_J9ku1GymYzvJ1mdIv216amYKDmk-9zhIeH5zrX6zqaUc0hPmZiAQxkVR5CuKjHDC-Fp56SONxoSMvA_NCOVMJQTcZoTMWYgZjIu0L17LZt5yzGeW7VvocViTtzV_C3-LhLqUuXyC4bTtfbqkfxHwJrtE0UKYYQFWXy1QHeaSoK0lJefdIZSNTxnxiUhGmIhLD72pl9vI2LI6_BfYb3LVw9h_KOB_WbR",
      alt: "Tulum Ruinas con vistas al mar caribe",
      duration: "2 Hours",
      difficulty: "Activa",
      title: "Ruinas de Tulum y snorkel con tortugas",
      description:
        "Caminar por la ciudad murallada de Tulum, ubicada en acantilados sobre el mar Caribe. Luego, sumérgete en la bahía de Akumal para nadar junto a tortugas marinas salvajes en su hábitat natural.",
      price: "1,355",
      imagePosition: "left" as const,
      FcRating: 4.9,
    },
  ];

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-20 bg-white relative z-10 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          variants={titleVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#181411] tracking-tight">
            Expediciones Principales
          </h2>
        </motion.div>

        {tours.map((tour, index) => (
          <TourCard
            key={index}
            {...tour}
            index={index}
            onReserve={() => openModal(tour.title)}
          />
        ))}
        
        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tourName={selectedTour}
        />
      </div>
    </motion.section>
  );
};

export default Tours;