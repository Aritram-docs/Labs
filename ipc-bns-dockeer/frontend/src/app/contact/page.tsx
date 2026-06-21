"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Send,
  CheckCircle,
  Building,
  User,
  Info,
  Layers,
  Map
} from "lucide-react";

interface ContactFormInputs {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsSubmitting(true);
    console.log("Submitting contact query:", data);
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="flex-grow py-12 md:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Mail className="h-3.5 w-3.5" />
            Contact Support
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Get In Touch With Us
          </h1>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Have questions about document mapping, API integration, or enterprise legal tools? Submit your query and our legal tech team will respond shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="rounded-2xl border border-border-color bg-card p-6 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-foreground">
                Contact Information
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3.5 text-sm text-foreground/75 leading-relaxed">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block font-bold text-foreground/50 text-[10px] uppercase">Email Support</span>
                    <a href="mailto:support@ipcbnsmapper.in" className="hover:text-primary transition-colors font-medium">
                      support@ipcbnsmapper.in
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5 text-sm text-foreground/75 leading-relaxed">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-purple/10 text-accent-purple mt-0.5">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block font-bold text-foreground/50 text-[10px] uppercase">Phone Line</span>
                    <span className="font-medium">+91 XXXXX XXXXX</span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5 text-sm text-foreground/75 leading-relaxed">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-orange/10 text-accent-orange mt-0.5">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block font-bold text-foreground/50 text-[10px] uppercase">Headquarters</span>
                    <span className="font-medium">New Delhi, India</span>
                  </div>
                </li>
              </ul>

              {/* Social links */}
              <div className="pt-4 border-t border-border-color/50">
                <span className="block text-xs font-bold text-foreground/50 uppercase mb-3">Connect With Us</span>
                <div className="flex items-center gap-3">
                  <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-color bg-background text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors shadow-sm" aria-label="LinkedIn">
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                  <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-color bg-background text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors shadow-sm" aria-label="GitHub">
                    <Github className="h-4.5 w-4.5" />
                  </a>
                  <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-color bg-background text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors shadow-sm" aria-label="Twitter">
                    <Twitter className="h-4.5 w-4.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Stylized Google Maps Placeholder */}
            <div className="rounded-2xl border border-border-color bg-card p-4 shadow-sm space-y-3 relative overflow-hidden h-64 flex flex-col justify-between group">
              <div className="absolute inset-0 bg-muted/20 opacity-50 z-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              
              {/* Map Illustration Vector */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-[0.03] z-0 select-none">
                <Map className="w-48 h-48" />
              </div>
              
              <div className="relative z-10 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Map className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-foreground">Interactive Location Map</span>
              </div>

              <div className="relative z-10 text-center py-6 space-y-2">
                <p className="text-sm font-semibold text-foreground/75">New Delhi Office Complex</p>
                <p className="text-xs text-foreground/50">Plot No. 12, Barakhamba Road, Connaught Place</p>
              </div>

              <div className="relative z-10 flex justify-center pb-2">
                <span className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow">
                  Mock Map View
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border-color bg-card p-6 md:p-8 shadow-sm relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-16 text-center space-y-4"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <div className="space-y-1 max-w-sm mx-auto">
                      <h3 className="text-lg font-bold text-foreground">Message Sent Successfully</h3>
                      <p className="text-xs text-foreground/60 leading-relaxed">
                        Thank you for contacting IPC-BNS Legal Mapper. Our representative will get back to you at the provided email shortly.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-foreground/70 flex items-center gap-1">
                          <User className="h-3.5 w-3.5" /> Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Your Name"
                          {...register("name", { required: "Name is required" })}
                          className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm placeholder-foreground/30 focus:outline-none transition-colors ${
                            errors.name ? "border-red-500 focus:border-red-500" : "border-border-color focus:border-primary"
                          }`}
                        />
                        {errors.name && <span className="text-[10px] text-red-500 font-bold block">{errors.name.message}</span>}
                      </div>

                      {/* Email field */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-foreground/70 flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" /> Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="name@organization.com"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          })}
                          className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm placeholder-foreground/30 focus:outline-none transition-colors ${
                            errors.email ? "border-red-500 focus:border-red-500" : "border-border-color focus:border-primary"
                          }`}
                        />
                        {errors.email && <span className="text-[10px] text-red-500 font-bold block">{errors.email.message}</span>}
                      </div>
                    </div>

                    {/* Organization field */}
                    <div className="space-y-1.5">
                      <label htmlFor="organization" className="text-xs font-bold text-foreground/70 flex items-center gap-1">
                        <Building className="h-3.5 w-3.5" /> Organization / Department
                      </label>
                      <input
                        id="organization"
                        type="text"
                        placeholder="Court / Law Firm / Police Dept"
                        {...register("organization", { required: "Organization name is required" })}
                        className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm placeholder-foreground/30 focus:outline-none transition-colors ${
                          errors.organization ? "border-red-500 focus:border-red-500" : "border-border-color focus:border-primary"
                        }`}
                      />
                      {errors.organization && <span className="text-[10px] text-red-500 font-bold block">{errors.organization.message}</span>}
                    </div>

                    {/* Subject field */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-bold text-foreground/70 flex items-center gap-1">
                        <Info className="h-3.5 w-3.5" /> Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="How can we help you?"
                        {...register("subject", { required: "Subject is required" })}
                        className={`w-full rounded-xl border bg-background px-4 py-2.5 text-sm placeholder-foreground/30 focus:outline-none transition-colors ${
                          errors.subject ? "border-red-500 focus:border-red-500" : "border-border-color focus:border-primary"
                        }`}
                      />
                      {errors.subject && <span className="text-[10px] text-red-500 font-bold block">{errors.subject.message}</span>}
                    </div>

                    {/* Message field */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-foreground/70 flex items-center gap-1">
                        <Layers className="h-3.5 w-3.5" /> Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Enter details of your inquiry..."
                        {...register("message", {
                          required: "Message is required",
                          minLength: { value: 10, message: "Message must be at least 10 characters" }
                        })}
                        className={`w-full rounded-xl border bg-background p-4 text-sm placeholder-foreground/30 focus:outline-none transition-colors ${
                          errors.message ? "border-red-500 focus:border-red-500" : "border-border-color focus:border-primary"
                        }`}
                      />
                      {errors.message && <span className="text-[10px] text-red-500 font-bold block">{errors.message.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold shadow-md hover:bg-primary/95 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Query
                        </>
                      )}
                    </button>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
