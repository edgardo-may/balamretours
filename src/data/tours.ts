export interface Tour {
  id: string;
  name: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  description: string;
  category: string;
}

export const tours: Tour[] = [
  {
    id: "cenote-adventure",
    name: "Cenote Mystery Adventure",
    price: 89,
    duration: "4 Hours",
    rating: 5,
    image: "/tours/cenote.png",
    description:
      "Explora las aguas turquesas del inframundo maya en este tour de cenotes exclusivos.",
    category: "Adventure",
  },
  {
    id: "chichen-itza",
    name: "Chichén Itzá & Cultura Maya",
    price: 129,
    duration: "10 Hours",
    rating: 4.9,
    image: "/tours/pyramid.png",
    description:
      "Viaja al corazón del imperio maya y descubre una de las maravillas del mundo.",
    category: "Cultura",
  },
  {
    id: "tulum-explorer",
    name: "Tulum Ruins & Caribbean Bliss",
    price: 99,
    duration: "6 Hours",
    rating: 4.8,
    image: "/tours/tulum.png",
    description:
      "Visita la única ciudad maya frente al mar Caribe y relájate en sus playas blancas.",
    category: "Exclusivo",
  },
  {
    id: "jungle-expedition",
    name: "Jungle ATV & Zipline",
    price: 115,
    duration: "5 Hours",
    rating: 5,
    image: "/tours/jungle.png",
    description:
      "Adrenalina pura a través de la selva maya. Vuela sobre los árboles y conduce todoterreno.",
    category: "Acción",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Adventure Enthusiast",
    text: "Balam RE Tours provided the highlight of our vacation. The cenote tour was absolutely breathtaking!",
    stars: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Family Traveler",
    text: "Perfect organization. Our guide was extremely knowledgeable about Mayan history. Highly recommended.",
    stars: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Solo Explorer",
    text: "Safe, professional, and authentic. I felt like I was seeing the real Riviera Maya, not just the tourist traps.",
    stars: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
  },
];
