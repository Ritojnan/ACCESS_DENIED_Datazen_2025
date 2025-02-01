import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import img1 from "../assets/bgimg.png";
import img2 from "../assets/whychooseus2.png";
import {
  BrainCircuit,
  LineChart,
  PieChart,
  CheckCircle,
  ShieldCheck,
  Lock,
  DollarSign,
  Database,
  TrendingUp,
  FileText,
  MessageSquareText,
  BookOpen,
} from "lucide-react";
import TextTicker from "@/components/text-ticker";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[calc(90vh)] flex items-center justify-center overflow-hidden z-0">
        {/* Video Background */}
        <img
           src={img1}
            alt="Why Choose Us"
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
        >
        </img>


        {/* Content */}
        <div className="relative z-30 text-center text-white px-4">
          <h1 className="text-3xl md:text-6xl font-bold mb-4">
            AI-Powered Financial
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="font-serif italic text-purple-300 bg-purple-800 px-4 py-2 rounded-lg">
              Narrative Generation
            </span>
          </h1>
          <p className="font-thin text-xl md:text-2xl mb-8">
            Transform financial data into accurate, consistent, and actionable
            insights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-purple-500 hover:bg-purple-600 text-white"
              size="lg"
            >
              <a href="/dashboard">Get Started</a>
            </Button>
            <Button
              className="bg-transparent text-white border-white hover:bg-white hover:text-purple-800"
              variant="outline"
              size="lg"
            >
              <a href="/learn-more">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative">
        <div className="relative bg-purple-950 dark:bg-purple-900">
          <div className="absolute inset-x-0 top-0 flex justify-center -translate-y-1/2"></div>

          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {/* Reports Generated */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <div className="text-6xl font-bold text-white lg:text-7xl tabular-nums tracking-tight">
                  <TextTicker value={120} />
                  K+
                </div>
                <div className="mt-3 text-lg text-purple-200">
                  Reports Generated
                </div>
              </motion.div>

              {/* Market Trends Analyzed */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <div className="text-6xl font-bold text-white lg:text-7xl">
                  <TextTicker value={80} />
                  K+
                </div>
                <div className="mt-3 text-lg text-purple-200">
                  Market Trends Analyzed
                </div>
              </motion.div>

              {/* Consistent Insights */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <div className="text-6xl font-bold text-white lg:text-7xl">
                  <TextTicker value={95} />%
                </div>
                <div className="mt-3 text-lg text-purple-200">
                  Probabilistic Consistency
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Our <span className="text-purple-500">Solutions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BrainCircuit,
                title: "AI-Driven Insights",
                desc: "Leverage advanced AI to analyze financial data and generate accurate narratives.",
              },
              {
                icon: LineChart,
                title: "Market Trend Analysis",
                desc: "Identify and incorporate market trends into financial reports for actionable insights.",
              },
              {
                icon: CheckCircle,
                title: "Probabilistic Consistency",
                desc: "Ensure logical coherence and reliability in financial narratives using probabilistic models.",
              },
              {
                icon: ShieldCheck,
                title: "Regulatory Compliance",
                desc: "Generate reports that adhere to financial regulations and reduce compliance risks.",
              },
              {
                icon: FileText,
                title: "Automated Report Generation",
                desc: "Produce detailed financial reports with minimal manual intervention.",
              },
              {
                icon: Database,
                title: "Data-Backed Insights",
                desc: "Base all narratives on verified financial data and historical patterns.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="border-gray-200 dark:border-gray-700 shadow-lg"
                initial={{
                  opacity: 0,
                  x: index < 3 ? -100 : 100, // First 3 cards from the left, next 3 from the right
                }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: index * 0.2, // Staggered animation based on index
                }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader className="flex flex-col items-center">
                    <service.icon className="w-12 h-12 text-purple-500 mb-4" />
                    <CardTitle className="text-xl text-gray-800 dark:text-white">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      {service.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why Choose <span className="text-purple-500">Us</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center lg:mx-20">
            {/* Left Section: Services */}
            <motion.div
              className="grid gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the section is in view
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.3 } },
              }}
            >
              {[
                {
                  title: "Accurate Financial Narratives",
                  desc: "Generate reliable and data-driven financial reports with AI-powered insights.",
                  icon: CheckCircle,
                },
                {
                  title: "Market Trend Integration",
                  desc: "Incorporate real-time market trends into your financial analysis.",
                  icon: TrendingUp,
                },
                {
                  title: "Regulatory Compliance",
                  desc: "Ensure all reports meet industry standards and regulations.",
                  icon: ShieldCheck,
                },
                {
                  title: "Scalable Solutions",
                  desc: "Adapt our tools to fit businesses of all sizes, from startups to enterprises.",
                  icon: Database,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Section: Image */}
            <div className="mx-30 px-20">
              <img
                src={img2}
                alt="Why Choose Us"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}