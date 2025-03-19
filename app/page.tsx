"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Github, Linkedin, Mail, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MainLayout from "@/components/layouts/MainLayout"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  message: z.string().min(1, "Message is required").max(500, "Message must be less than 500 characters"),
})

type FormValues = z.infer<typeof formSchema>

export default function Home() {

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          name: "",
          email: "",
          message: "",
      },
  });

  const onSumbit = (values: FormValues) => {
      console.log("Form submitted:", values);
      // Here you would typically send the form data to your backend
  };

  return (
        <MainLayout>

          {/* Hero Section */}
          <header className="min-h-screen grid place-items-center pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeInUp}
                  >
                      <p className="text-xl mb-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                          Hey There, I'm
                      </p>
                      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                          Alif Rachmat Illahi
                      </h1>
                      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                          Software Engineer | Web Developer
                      </p>
                  </motion.div>
              </div>
          </header>

          <main>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
                  {/* About Me */}
                  <motion.section
                      id="about"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={fadeInUp}
                      className="bg-white dark:bg-gray-800 border-2 rounded-xl p-8"
                  >
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                          About Me
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                          I am a full-stack developer with expertise in Laravel.
                          I have a passion for creating efficient and
                          user-friendly web applications. With a strong
                          foundation in both front-end and back-end
                          technologies, I strive to deliver high-quality
                          solutions that meet client needs.
                      </p>
                  </motion.section>

                  {/* Skills */}
                  <motion.section
                      id="skills"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={fadeInUp}
                      className="bg-white dark:bg-gray-800 border-2 rounded-xl p-8"
                  >
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                          Skills
                      </h2>
                      <div className="flex flex-wrap gap-3">
                          {[
                              "HTML",
                              "CSS",
                              "JavaScript",
                              "TypeScript",
                              "PHP",
                              "MySQL",
                              "Laravel",
                              "React",
                              "Git",
                              "Next.js",
                              "Express.js",
                          ].map((skill) => (
                              <span
                                  key={skill}
                                  className="bg-primary/10 text-primary dark:bg-primary/20 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-primary hover:text-white dark:hover:bg-primary hover:-translate-y-1"
                              >
                                  {skill}
                              </span>
                          ))}
                      </div>
                  </motion.section>

                  {/* Projects */}
                  <motion.section
                      id="projects"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={fadeInUp}
                      className="bg-white dark:bg-gray-800 border-2 rounded-xl p-8"
                  >
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                          Projects
                      </h2>
                      <div className="grid md:grid-cols-2 gap-8">
                          <ProjectCard
                              title="Anjab ABK"
                              description="A website for Universitas Diponegoro to conduct Analisis Jabatan and Analisis Beban Kerja."
                              imageUrl="/placeholder.svg?height=300&width=500"
                          />
                          <ProjectCard
                              title="E-Office"
                              description="A prototype for automatic task recording for Universitas Diponegoro."
                              imageUrl="/placeholder.svg?height=300&width=500"
                          />
                          <ProjectCard
                              title="MHSC (Mental Health Screening)"
                              description="Web application for Psychology Faculty of Universitas Diponegoro to conduct mental health screenings."
                              imageUrl="/placeholder.svg?height=300&width=500"
                          />
                      </div>
                  </motion.section>

                  {/* Contact */}
                  <motion.section
                      id="contact"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={fadeInUp}
                      className="bg-white dark:bg-gray-800 border-2 rounded-xl p-8"
                  >
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                          Contact Me
                      </h2>

                      <div className="grid md:grid-cols-2 gap-8">
                          <div>
                              <Form {...form}>
                                  <form
                                      action=""
                                      onSubmit={form.handleSubmit(onSumbit)}
                                  >
                                      <FormField
                                          name="name"
                                          render={({ field, fieldState }) => (
                                              <FormItem>
                                                  <FormLabel>Name</FormLabel>
                                                  <FormControl>
                                                      <Input {...field} />
                                                  </FormControl>
                                                  <FormMessage />
                                              </FormItem>
                                          )}
                                      />

                                      <FormField
                                          name="email"
                                          render={({ field, fieldState }) => (
                                              <FormItem>
                                                  <FormLabel>Email</FormLabel>
                                                  <FormControl>
                                                      <Input
                                                          type="email"
                                                          {...field}
                                                      />
                                                  </FormControl>
                                                  <FormMessage />
                                              </FormItem>
                                          )}
                                      />

                                      <FormField
                                          name="message"
                                          render={({ field, fieldState }) => (
                                              <FormItem>
                                                  <FormLabel>Message</FormLabel>
                                                  <FormControl>
                                                      <Textarea
                                                          rows={4}
                                                          {...field}
                                                      />
                                                  </FormControl>
                                                  <FormMessage />
                                              </FormItem>
                                          )}
                                      />

                                      <Button type="submit" className="w-full">
                                          Send Message
                                      </Button>
                                  </form>
                              </Form>
                          </div>

                          <div className="flex flex-col justify-center">
                              <p className="text-gray-600 dark:text-gray-300 mb-6">
                                  Feel free to reach out to me through any of
                                  these platforms:
                              </p>
                              <div className="flex space-x-4">
                                  <Button
                                      variant="outline"
                                      size="icon"
                                      className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
                                  >
                                      <Github className="h-5 w-5" />
                                  </Button>
                                  <Button
                                      variant="outline"
                                      size="icon"
                                      className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
                                  >
                                      <Linkedin className="h-5 w-5" />
                                  </Button>
                                  <Button
                                      variant="outline"
                                      size="icon"
                                      className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
                                  >
                                      <Mail className="h-5 w-5" />
                                  </Button>
                              </div>
                          </div>
                      </div>
                  </motion.section>
              </div>
          </main>
        </MainLayout>
  );
}

function ProjectCard({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) {
  return (
      <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden border-2 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
          <div className="relative h-48 overflow-hidden">
              <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
          </div>
          <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{description}</p>
              <div className="mt-4 flex justify-end">
                  <Button
                      variant="outline"
                      size="sm"
                      className="text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                      View Project
                  </Button>
              </div>
          </div>
      </div>
  );
}

