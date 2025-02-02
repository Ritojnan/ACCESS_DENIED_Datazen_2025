import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/landing/footer";
import NewsSummaries from "@/components/news";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4 mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center">📰 News Summarizer</h1>
        <NewsSummaries />
      </main>
      <Footer />
    </>
  );
}
