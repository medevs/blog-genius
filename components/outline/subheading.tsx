"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { PrimitiveAtom, useAtom, useSetAtom } from "jotai"
import { focusAtom } from "jotai-optics"
import { Trash2 } from "lucide-react"

import { OutlineItemI } from "@/types/content"

const Subheading = ({
  outlineAtom,
  id,
}: {
  outlineAtom: PrimitiveAtom<OutlineItemI>
  id: string
}) => {
  const setOutlineAtom = useSetAtom(outlineAtom)
  const focusedAtom = useMemo(
    () =>
      focusAtom(outlineAtom, (s) =>
        s.prop("subheadings").find((item) => item.id === id)
      ),
    [outlineAtom, id]
  )

  const [subheading, setSubheading] = useAtom(focusedAtom)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const removeHandler = () => {
    setOutlineAtom((prev) => ({
      ...prev,
      subheadings: prev.subheadings.filter((item) => item.id !== id),
    }))
  }
  return (
    <motion.div
      onMouseEnter={() => {
        setIsDeleteOpen(true)
      }}
      onMouseLeave={() => {
        setIsDeleteOpen(false)
      }}
      layout
      className="flex w-full items-center gap-2"
    >
      <AnimatePresence key={subheading?.id + "delete"}>
        {isDeleteOpen && (
          <motion.button
            onClick={removeHandler}
            layout
            variants={{
              initial: {
                opacity: 0,
                x: -5,
                width: 0,
                display: "none",
              },
              animate: {
                opacity: 1,
                x: 0,
                display: "block",
                width: "auto",
              },
            }}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            <Trash2 size={12} />
          </motion.button>
        )}
      </AnimatePresence>
      <h2 className="max-w-fit rounded-md border px-2 py-1 text-xs font-bold dark:border-white/10 dark:bg-white/5">
        H3
      </h2>
      <input
        value={subheading?.heading}
        onChange={(e) => {
          setSubheading((prev) => ({ ...prev, heading: e.target.value }))
        }}
        className="w-full bg-transparent text-sm outline-none dark:text-neutral-400"
      />
    </motion.div>
  )
}

export default Subheading
