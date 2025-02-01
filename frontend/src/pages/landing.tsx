// import { useState } from "react";
// import Image from "next/image";
// import { Navbar } from "@/components/navbar";
// import { Footer } from "@/components/footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Search,
//   BookOpen,
//   Code,
//   Brain,
//   Users,
//   FileCheck,
//   Trophy,
// } from "lucide-react";
// import { FileText, Target } from "lucide-react";
// import { InfiniteLogoCarousel } from "@/components/landing-carousel";
// import Testimonials1 from "@/components/testimonial-carousel";
// import { useLocale, useTranslations } from "next-intl";
// import LocaleSwitcher from "@/components/LocaleSwitcher";
// import Link from "next/link";
// import TextTicker from "@/components/text-ticker";

// export default function LandingPage() {
//   const t = useTranslations("LoginPage");
//   const locale = useLocale();
//   return (
//     <div className="min-h-screen flex flex-col ">
//       <Navbar />
//       {/* Hero Section */}

//       <section className="relative h-[calc(90vh)] flex items-center justify-center overflow-hidden z-0">
//         {/* Video Background */}
//         <video
//           autoPlay
//           loop={true}
//           muted
//           className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
//         >
//           <source src="/hero-section.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Purple Overlay */}
//         <div className="absolute z-20 w-full h-full bg-indigo-900 opacity-50"></div>

//         {/* Dark Overlay */}
//         {/* <div className="absolute z-20 w-full h-full bg-black opacity-60"></div> */}

//         {/* Content */}
//         <div className="relative z-30 text-center text-white px-4">
//           <h1 className="text-3xl md:text-6xl font-bold mb-4">Find Your</h1>
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">
//             <span className="font-serif italic text-secondary bg-primary">
//               Dream Job
//             </span>
//           </h1>
//           <p className="font-thin text-xl md:text-2xl mb-8">
//             Connect with top employers and opportunities
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Button
//               asChild
//               size="lg"
//               className="bg-primary hover:bg-primary/90"
//             >
//               <Link href="/dashboard/jobs">Browse Jobs</Link>
//             </Button>
//             <Button
//               asChild
//               size="lg"
//               variant="outline"
//               className="bg-transparent text-white border-white hover:bg-white hover:text-black"
//             >
//               <Link href="/post-job">Post a Job</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="relative">
//         <div className="relative bg-indigo-950 dark:bg-indigo-900">
//           <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2"></div>

//           <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
//               {/* Matches Made */}
//               <motion.div
//                 className="text-center"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeInOut" }}
//                 viewport={{ once: true }}
//               >
//                 <div className="text-6xl font-bold text-white lg:text-7xl tabular-nums tracking-tight">
//                   <TextTicker value={80} />
//                   K+
//                 </div>
//                 <div className="mt-3 text-lg text-indigo-200">Matches Made</div>
//               </motion.div>

//               {/* Tech Jobs */}
//               <motion.div
//                 className="text-center"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
//                 viewport={{ once: true }}
//               >
//                 <div className="text-6xl font-bold text-white lg:text-7xl">
//                   <TextTicker value={120} />
//                   K+
//                 </div>
//                 <div className="mt-3 text-lg text-indigo-200">Tech Jobs</div>
//               </motion.div>

//               {/* Startup Ready Candidates */}
//               <motion.div
//                 className="text-center"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
//                 viewport={{ once: true }}
//               >
//                 <div className="text-6xl font-bold text-white lg:text-7xl">
//                   <TextTicker value={900} />
//                   K+
//                 </div>
//                 <div className="mt-3 text-lg text-indigo-200">
//                   Startup Ready Candidates
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-16 bg-white dark:bg-gray-900">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
//             Choose Your Desired{" "}
//             <span className="text-indigo-500">Services</span>
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: BookOpen,
//                 title: "Soft Skill Training",
//                 desc: "Enhance communication, teamwork, and leadership skills to excel in professional and personal interactions.",
//               },
//               {
//                 icon: Code,
//                 title: "Technical Training",
//                 desc: "Master industry-relevant technical skills, coding, and tools to thrive in technology-driven roles.",
//               },
//               {
//                 icon: Brain,
//                 title: "Aptitude Preparation",
//                 desc: "Boost problem-solving, analytical thinking, and logical reasoning to ace aptitude tests and challenges.",
//               },
//               {
//                 icon: Users,
//                 title: "Hiring Talent",
//                 desc: "Connect with top talent through a streamlined hiring process designed to match skills with opportunities.",
//               },
//               {
//                 icon: FileCheck,
//                 title: "Job Consultation",
//                 desc: "Receive personalized career guidance and job search strategies to land your dream role effectively.",
//               },
//               {
//                 icon: Trophy,
//                 title: "Competitive Exams",
//                 desc: "Prepare for competitive exams with expert resources and strategies to achieve top performance.",
//               },
//             ].map((service, index) => (
//               <motion.div
//                 key={index}
//                 className="border-gray-200 dark:border-gray-700 shadow-lg"
//                 initial={{
//                   opacity: 0,
//                   x: index < 3 ? -100 : 100, // First 3 cards from the left, next 3 from the right
//                 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{
//                   duration: 0.8,
//                   ease: "easeInOut",
//                   delay: index * 0.2, // Staggered animation based on index
//                 }}
//                 viewport={{ once: true }}
//               >
//                 <Card>
//                   <CardHeader className="flex flex-col items-center">
//                     <service.icon className="w-12 h-12 text-indigo-500 mb-4" />
//                     <CardTitle className="text-xl text-gray-800 dark:text-white">
//                       {service.title}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-gray-600 dark:text-gray-300 text-center">
//                       {service.desc}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-indigo-950 dark:bg-indigo-800">
//         <InfiniteLogoCarousel />
//       </section>
//       {/* Why Choose Us Section */}
//       <section className="py-16 bg-gray-50 dark:bg-gray-800">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
//             Why Choose <span className="text-indigo-500">Us</span>
//           </h2>
//           <div className="grid md:grid-cols-2 gap-12 items-center lg:mx-20">
//             {/* Left Section: Services */}
//             <motion.div
//               className="grid gap-6"
//               initial="hidden"
//               whileInView="show"
//               viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the section is in view
//               variants={{
//                 hidden: { opacity: 0 },
//                 show: { opacity: 1, transition: { staggerChildren: 0.3 } },
//               }}
//             >
//               {[
//                 {
//                   title: "Find Trusted Job Listings",
//                   desc: "Discover verified and high-quality job opportunities across various industries.",
//                   icon: Search,
//                 },
//                 {
//                   title: "Build a Professional Resume",
//                   desc: "Create standout resumes with our easy-to-use builder to impress recruiters.",
//                   icon: FileText,
//                 },
//                 {
//                   title: "Get Personalized Job Matches",
//                   desc: "Receive tailored job recommendations based on your skills and interests.",
//                   icon: Target,
//                 },
//                 {
//                   title: "Access Exclusive Career Insights",
//                   desc: "Stay ahead with tips, career advice, and insider knowledge from experts.",
//                   icon: BookOpen,
//                 },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   className="flex gap-4 items-center"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8 }}
//                 >
//                   <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
//                     <item.icon className="w-6 h-6 text-indigo-500" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-300">
//                       {item.desc}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Right Section: Image */}
//             <div className="mx-30 px-20">
//               <Image
//                 src="/hero-img1.jpeg"
//                 alt="Why Choose Us"
//                 width={400}
//                 height={400}
//                 className="rounded-lg shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       {/* <Testimonials1 />
//       <Footer /> */}
//     </div>
//   );
// }
