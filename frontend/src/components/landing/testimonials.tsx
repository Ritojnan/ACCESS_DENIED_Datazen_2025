import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Quote } from 'lucide-react';
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  text: string;
}

export default function Testimonials() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const savedTestimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    setTestimonials(savedTestimonials.length > 0 ? savedTestimonials : [
      { text: "Dhan AI transformed how we handle financial reports. The insights are accurate and actionable, helping us make better decisions." },
      { text: "As a small business, Dhan AI has been a game-changer. The financial reports are easy to understand and have improved our cash flow management." },
      { text: "The AI-generated financial narratives from Dhan AI are incredibly reliable. We now have a clear picture of our financial health." },
      { text: "Dhan AI's reports have saved us countless hours. The platform is intuitive, and the insights are spot-on." },
    ]);
  }, []);

  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newTestimonial = { text: `${message} - ${name}` };
      setTestimonials((prev) => [newTestimonial, ...prev]);
      setName('');
      setMessage('');
      setLoading(false);
      setShowForm(false);
    }, 2000);
  };

  return (
    <section className="w-full bg-purple-950 py-8 sm:py-16 dark:bg-purple-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 mb-6">
          <motion.p className="text-sm font-medium text-purple-200 dark:text-purple-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Feedback
          </motion.p>
          <motion.h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-white md:text-4xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            From Small Businesses
          </motion.h2>
        </div>

        <div className="mt-8 sm:mt-16">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Card className="border-0 bg-purple-100 dark:bg-purple-900">
                      <CardContent className="p-4 sm:p-6">
                        <div className="mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-purple-200 dark:bg-purple-800">
                          <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-300" />
                        </div>
                        <p className="text-base sm:text-lg text-purple-950 dark:text-purple-100">
                          {testimonial.text}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 sm:mt-0 sm:absolute sm:-right-4 sm:-top-16 space-x-2">
              <CarouselPrevious className="bg-white hover:bg-purple-50 dark:bg-purple-800 dark:hover:bg-purple-700" />
              <CarouselNext className="bg-white hover:bg-purple-50 dark:bg-purple-800 dark:hover:bg-purple-700" />
            </div>
          </Carousel>
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        {!showForm && (
          <Button variant="outline" onClick={() => setShowForm(true)}>Share Your Feedback</Button>
        )}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md mt-4">
            <p className="text-lg font-semibold mb-2">Name</p>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <p className="text-lg font-semibold mt-4 mb-2">Feedback</p>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
            <Button type="submit" className="mt-4 w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
