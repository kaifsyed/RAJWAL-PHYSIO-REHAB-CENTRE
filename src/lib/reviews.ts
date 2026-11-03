export interface Review {
  name: string;
  date: string;
  text: string;
  rating?: number;
}

export const REVIEWS: Review[] = [
  {
    name: "Keerthana Savinay",
    date: "3 weeks ago",
    text: `We had a wonderful experience with Prajwal and Bhavana during my mother-in-law's recovery after her knee replacement surgery. They were extremely caring, friendly, and patient throughout the entire process. They treated my mother-in-law like a member of their own family and made us feel completely comfortable, just like we were at home. They guided her through every exercise with great care and dedication, ensuring she received the best possible treatment. We are truly grateful for their support and kindness throughout her recovery. Prajwal and Bhavana are not only excellent physiotherapists but also wonderful human beings. We highly recommend them to anyone looking for caring and effective physiotherapy! Thank you, Prajwal and Bhavana, for treating us like family and making my mother-in-law's recovery journey so much more comfortable and positive. We will always be grateful for your care and kindness!`,
  },
  {
    name: "Hruthik J",
    date: "a month ago",
    text: `Dr. Prajwal provided exceptional physical therapy care right at my home. He was punctual, extremely knowledgeable, and tailored the exercises specifically to my recovery needs. My mobility has improved significantly. Highly recommend his services.`,
  },
  {
    name: "Haider Syed",
    date: "a month ago",
    text: `I had major leg fractures and multiple surgeries, which left me with severe stiffness. With my physiotherapist's dedicated guidance, hard work, and daily exercises, I've regained significant movement and strength. The journey wasn't easy, but the doctor's patience and motivation made a huge difference. Truly grateful and highly recommended!`,
  },
  {
    name: "Sukruth Reddy",
    date: "4 months ago",
    text: `I was undergoing rehab after ACL reconstruction and meniscus repair, which affected my knee strength and mobility.

Physiotherapist Prajwal guided my recovery with clear instructions, proper exercise technique, and a structured rehab plan. His support helped me regain strength and confidence in my knee. Highly recommended.`,
  },
  {
    name: "Kiran Raj",
    date: "a year ago",
    text: `I had a lateral malleolus injury and was struggling with pain and mobility issues. Thankfully, I found Dr. Prajwal(Physiotherapist), and I couldn't be more grateful for the care I received. From the very first session, he was attentive, knowledgeable, and genuinely concerned about my recovery.

He took the time to explain the injury and the treatment plan in detail, which gave me a lot of confidence. Each session was well-structured with a good balance of manual therapy and targeted exercises. I started noticing improvement much sooner than expected, and now I'm back on my feet, feeling stronger and more confident than before.

Highly recommend to anyone looking for professional and compassionate physiotherapy care!`,
  },
];
