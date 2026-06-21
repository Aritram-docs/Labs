"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Target,
  Compass,
  Briefcase,
  Users,
  GraduationCap,
  Building2,
  FileBadge,
  Scale
} from "lucide-react";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const targetUsers = [
    { title: "Advocates", icon: <Briefcase className="h-5 w-5 text-primary" />, desc: "Instantly translate historical precedents and old FIR references into valid BNS provisions for pleadings." },
    { title: "Judges", icon: <Scale className="h-5 w-5 text-accent-purple" />, desc: "Cross-reference older charge-sheets under IPC with BNS codes during trial transitioning and order writing." },
    { title: "Police Officers", icon: <ShieldAlert className="h-5 w-5 text-accent-orange" />, desc: "Validate offense parameters and search section numbers while filing newer FIR reports and case diaries." },
    { title: "Government Departments", icon: <Building2 className="h-5 w-5 text-primary" />, desc: "Review policy mandates, departmental notifications, and code references aligned with updated laws." },
    { title: "Law Students & Researchers", icon: <GraduationCap className="h-5 w-5 text-accent-purple" />, desc: "Compare structural reorganization, analyze changes in legal language, and track deleted offences." },
    { title: "Citizens", icon: <Users className="h-5 w-5 text-accent-orange" />, desc: "Access transparent legal information regarding Indian criminal penal changes without complex jargon." }
  ];

  return (
    <div className="flex-grow py-12 md:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* About Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary"
          >
            <FileBadge className="h-3.5 w-3.5" />
            Platform Background
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl"
          >
            About IPC-BNS Legal Mapper
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-foreground/75 leading-relaxed pt-2"
          >
            IPC-BNS Legal Mapper is a legal technology platform designed to simplify the transition from the Indian Penal Code (IPC), 1860 to the Bharatiya Nyaya Sanhita (BNS), 2023.
          </motion.p>
        </div>

        <hr className="my-12 border-border-color/60" />

        {/* Two Column details: Core Text & Mission/Vision */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          {/* Detailed Description */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-border-color bg-card p-6 md:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                Easing the Legal Paradigm Shift
              </h2>
              <p className="text-sm text-foreground/70 leading-relaxed">
                On July 1, 2024, India replaced its century-old criminal code, the IPC, with the Bharatiya Nyaya Sanhita. This transition reorganized many section numbers, consolidated similar offenses, updated descriptions, and altered penalties.
              </p>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Our platform automatically identifies IPC references within legal documents and maps them to the corresponding BNS provisions, helping legal professionals, investigators, and scholars understand the updated legal framework efficiently.
              </p>
            </div>
            <div className="mt-6 border-t border-border-color/60 pt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="block text-xl md:text-2xl font-bold text-primary">50+</span>
                <span className="text-[10px] text-foreground/50 font-bold uppercase">Mapped Codes</span>
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-bold text-accent-purple">100%</span>
                <span className="text-[10px] text-foreground/50 font-bold uppercase">API-Ready</span>
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-bold text-accent-orange">Instant</span>
                <span className="text-[10px] text-foreground/50 font-bold uppercase">Parser</span>
              </div>
            </div>
          </motion.div>

          {/* Mission and Vision */}
          <div className="flex flex-col gap-6 justify-between">
            {/* Mission Card */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border-color bg-card p-6 shadow-sm flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">Our Mission</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  To make legal document interpretation faster, more accurate, and accessible, minimizing friction for justice system administrators during transition processes.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div variants={itemVariants} className="rounded-2xl border border-border-color bg-card p-6 shadow-sm flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-purple/10 text-accent-purple">
                <Compass className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">Our Vision</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  To become India&apos;s most trusted, secure, and comprehensive IPC-BNS legal reference platform used by courts, firms, and legal scholars alike.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Target Users Grid */}
        <section className="mt-16 md:mt-24 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              Designed For India&apos;s Legal Ecosystem
            </h2>
            <p className="text-sm text-foreground/60 max-w-md mx-auto">
              Our tools cater to diverse stakeholder workflows inside and outside the courtroom.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {targetUsers.map((user, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="rounded-xl border border-border-color bg-card p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      {user.icon}
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {user.title}
                    </h3>
                  </div>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    {user.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </div>
  );
}
