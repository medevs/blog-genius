"use client"

import { useRef } from "react"
import {
  generateOutlineHandlerAtom,
  inputAtom,
  stepHandlerAtom,
} from "@/atoms/form-atoms"
import { motion } from "framer-motion"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

import { Input } from "@/components/ui/input"

import HeroSection from "../hero"
import { Button } from "../ui/button"

const containerVariants = {
  initial: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 30,
  },
}

const Step1 = () => {
  const step = useAtomValue(stepHandlerAtom)
  const [inputValue, setInputValue] = useAtom(inputAtom)
  const generateOutlineHandler = useSetAtom(generateOutlineHandlerAtom)
  const inputRef = useRef<HTMLInputElement>(null)

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.length > 10) {
      inputRef.current?.blur()
    }
    await generateOutlineHandler()
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit={step === 0 ? "initial" : "exit"}
      className="flex h-[80vh] w-full flex-col justify-center"
    >
      <div>
        {/* Content Container */}
        <HeroSection />
        {/* Input */}
        <form onSubmit={formHandler} className="mt-4 w-full space-y-6">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            className="w-full text-base"
            placeholder="A blog post about Marina..."
            ref={inputRef}
          />
          <Button type="submit" className="w-full">
            Create Outline
          </Button>
        </form>
      </div>
    </motion.div>
  )
}

export default Step1
