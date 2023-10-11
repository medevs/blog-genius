"use client"

import {
  handlingAtom,
  handlingMessageAtom,
  postAtom,
  postErrorAtom,
  stepHandlerAtom,
} from "@/atoms/form-atoms"
import { AnimatePresence, motion } from "framer-motion"
import { useAtom, useAtomValue } from "jotai"

import Post from "../post/post"
import { Button } from "../ui/button"
import Spinner from "../ui/spinner"
import { useState } from "react"

const containerVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
}

const Step3 = () => {
  const handling = useAtomValue(handlingAtom)
  const [step, stepAction] = useAtom(stepHandlerAtom)
  const postError = useAtomValue(postErrorAtom)
  const [post, setPost] = useAtom(postAtom)
  const handlingMessage = useAtomValue(handlingMessageAtom)
  const goBackHandler = () => {
    stepAction("dec")
    setTimeout(() => {
      setPost({ title: "", content: "" })
    }, 500)
  }
  const [copied, setCopied] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleCopyToClipboard = () => {
    if (post.title && post.content) {
      const blogContent = `${post.title}\n\n${post.content}`;
      navigator.clipboard.writeText(blogContent).then(() => {
        setCopied(true);

        // Show the notification for a few seconds
        setNotificationVisible(true);
        setTimeout(() => {
          setNotificationVisible(false);
        }, 3000); // Adjust the timeout as needed
      });
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit={step === 2 ? "initial" : "exit"}
      animate="animate"
      className="flex h-full w-full items-center justify-center"
    >
      <AnimatePresence key="step-1">
        {handling || (!post.content && !postError) ? (
          <motion.div
            variants={containerVariants}
            initial="initial"
            exit="exit"
            animate={handling ? "animate" : "initial"}
            className="flex h-[80vh] w-full items-center justify-center"
          >
            <div className="flex items-center gap-4">
              <Spinner />
              <div className="text-sm text-neutral-700">{handlingMessage}</div>
            </div>
          </motion.div>
        ) : !postError ? (
          <motion.div
            variants={containerVariants}
            initial="initial"
            exit="exit"
            animate={!handling ? "animate" : "initial"}
            className="w-full max-w-3xl"
          >
            {/* Copy to Clipboard Button */}
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              className={`mb-8 w-full ${(!post.title || !post.content) ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={!post.title || !post.content}
            >
              Copy to Clipboard
            </Button>
            {copied && notificationVisible && 
              <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-md bg-green-500 px-4 py-2 text-center text-white transition-all duration-500">
                Content copied to clipboard!
              </div>
            }
            <div>
              <h1 className="mb-10 text-2xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <Post content={post.content} />
            </div>
            {/* Button */}
            <Button
              onClick={goBackHandler}
              variant="outline"
              className="mt-10 w-full"
            >
              Go Back to Outline
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="initial"
            exit="exit"
            animate={postError ? "animate" : "initial"}
            className="flex h-[80vh] w-full items-center justify-center gap-2"
          >
            <div className="max-w-fit rounded-md border px-3 py-2 text-sm font-bold dark:border-red-600/20 dark:bg-red-600/10">
              Error
            </div>
            {JSON.stringify(postError)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Step3
