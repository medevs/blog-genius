import React from "react"

const HeroSection: React.FC = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-gray-200">
          Generate Blog Posts Effortlessly
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
          Turn your ideas into engaging blog posts in just a few simple steps.
        </p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-blue-500 dark:bg-gray-800">
              1
            </div>
            <div className="ml-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Provide a topic you want to write about.
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-blue-500 dark:bg-gray-800">
              2
            </div>
            <div className="ml-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Get an outline generated based on your topic.
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-bold text-blue-500 dark:bg-gray-800">
              3
            </div>
            <div className="ml-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Generate the final blog post.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
