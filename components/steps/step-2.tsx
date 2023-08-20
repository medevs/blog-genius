"use client"

import {
  generatePostHandlerAtom,
  handlingAtom,
  handlingMessageAtom,
  outlineAtom,
  outlineErrorAtom,
  splittedOutlineItemsAtom,
  stepHandlerAtom,
} from "@/atoms/form-atoms"
import { AnimatePresence, Reorder, motion } from "framer-motion"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

import OutlineItem from "../outline/outline-item"
import { Button } from "../ui/button"
import Spinner from "../ui/spinner"

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

const Step2 = () => {
  const handling = useAtomValue(handlingAtom)
  const [step, stepAction] = useAtom(stepHandlerAtom)
  const [outline, setOutline] = useAtom(outlineAtom)
  const [outlineItemsAtoms, dispatch] = useAtom(splittedOutlineItemsAtom)
  const outlineError = useAtomValue(outlineErrorAtom)

  const handlingMessage = useAtomValue(handlingMessageAtom)
  const generetePostHandler = useSetAtom(generatePostHandlerAtom)
  const startFromScratch = () => {
    stepAction("dec")
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit={step === 1 ? "initial" : "exit"}
      animate="animate"
      className="flex h-full w-full items-center justify-center"
    >
      <AnimatePresence key="step-1">
        {handling ? (
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
        ) : !outlineError ? (
          <motion.div
            variants={containerVariants}
            initial="initial"
            exit="exit"
            animate={!handling ? "animate" : "initial"}
            className="w-full max-w-3xl"
          >
            <h1 className="mb-4 max-w-fit rounded-md border px-3 py-2 text-sm font-bold dark:border-white/10 dark:bg-white/5">
              Outline
            </h1>
            <input
              value={outline.title}
              onChange={(e) => {
                setOutline((prev) => ({ ...prev, title: e.target.value }))
              }}
              className="w-full bg-transparent pr-4 text-2xl font-bold outline-none"
            />
            <Reorder.Group
              key={"outline-items"}
              axis="y"
              values={outline.outline}
              onReorder={(newValue) => {
                setOutline((prev) => ({
                  ...prev,
                  outline: newValue,
                }))
              }}
              className="flex w-full flex-col gap-4 pt-4"
            >
              {outlineItemsAtoms.map((outlineItemAtom, index) => (
                <Reorder.Item
                  key={outline.outline[index].id}
                  value={outline.outline[index]}
                >
                  <OutlineItem
                    outlineAtom={outlineItemAtom}
                    removeHandler={() => {
                      dispatch({ type: "remove", atom: outlineItemAtom })
                    }}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
            {/* Button */}
            <motion.div layout className="mt-10 flex items-center gap-4">
              <Button onClick={generetePostHandler} className="w-full">
                Save and Continue
              </Button>
              <Button
                onClick={startFromScratch}
                variant="outline"
                className="w-full"
              >
                Start from Scratch
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="initial"
            exit="exit"
            animate={outlineError ? "animate" : "initial"}
            className="flex h-[80vh] w-full items-center justify-center gap-2"
          >
            <div className="max-w-fit rounded-md border px-3 py-2 text-sm font-bold dark:border-red-600/20 dark:bg-red-600/10">
              Error
            </div>
            {JSON.stringify(outlineError)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Step2
