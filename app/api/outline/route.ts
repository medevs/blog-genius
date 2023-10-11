import { NextResponse } from "next/server"

import { OpenAIStream } from "@/lib/openai"

export const runtime = "edge"

/**
 * Handles a POST request by generating an outline for a blog post based on user input.
 * 
 * @param req - The incoming request object containing the user's request.
 * @returns A Promise that resolves to the stream of responses from the OpenAIStream function.
 * 
 * @throws If there is an error in processing the request, a 500 status response with an error message is returned.
 */
export async function POST(req: Request): Promise<Response> {
  const { request } = await req.json()

  try {
    // Get Outline
    const stream = await OpenAIStream({
      model: "gpt-3.5-turbo",
      messages: [
        {
          content: `"""
          To create a high-quality and SEO-friendly outline for a blog post, follow these essential steps.
          1. Craft a working title that encompasses the main topic.
          2. In the introduction, use an attention-grabbing hook and a clear thesis statement to engage readers and set the direction for your post.
          3. Divide your content into main points and subtopics that support your thesis, using appropriate headers and subheadings to structure your outline.
          4. Integrate your target keywords naturally throughout the outline, ensuring they fit contextually and avoid keyword stuffing.
          5. Address user intent by offering valuable information and solutions in each section.
          6. Consider incorporating visual content like images and infographics to enhance readability and engagement.
          7. In the conclusion, summarize the main points and include a strong call to action to encourage reader interaction.
          8. Ensure logical flow and coherence throughout your outline, and optimize for readability with concise sentences and paragraphs.
          9. Review and refine your outline before writing to catch any potential issues and ensure a well-structured piece.
          By following these steps, you'll create a well-organized and SEO-friendly outline that sets the stage for a successful blog post.
          """
          `,
          role: "system",
        },
        {
          role: "user",
          content: `Rules you must follow strictly: 1. Do not try to explain or say anything. Just return the outline as showcased in example. 2. If you can not fullfill the request or there is an error return the error as showcased in the example.`,
        },

        {
          content: "A blog post about the topic of 'How to write a blog post'",
          role: "user",
        },
        {
          content: JSON.stringify({
            title: "The Ultimate Guide on How to Write a Blog Post",
            outline: [
              {
                title: "Introduction",
                subheadings: [
                  { heading: "Explanation of why blog writing is important" },
                  { heading: "Brief overview of the key elements of a blog post" },
                ],
              },
              {
                title: "Pre-Writing Steps",
                subheadings: [
                  { heading: "Define your target audience and purpose of the blog post" },
                  { heading: "Conduct research and gather information" },
                  { heading: "Create an outline to organize your thoughts" },
                ],
              },
              {
                title: "Writing the Blog Post",
                subheadings: [
                  { heading: "Craft an attention-grabbing headline" },
                  { heading: "Write a compelling introduction" },
                  {
                    heading: "Develop the main content with subheadings, bullet points, and examples"
                  },
                  { heading: "Use relevant images or multimedia to enhance the post" },
                  { heading: "Edit and proofread for grammar, spelling, and coherence" },
                ],
              },
              {
                title: "Formatting and Publishing",
                subheadings: [
                  {
                    heading: "Use appropriate formatting, such as short paragraphs and white space"
                  },
                  {
                    heading: "Optimize for search engines with relevant keywords and meta tags"
                  },
                  { heading: "Add internal and external links to other content" },
                  { heading: "Preview the post before publishing" },
                ],
              },
              {
                title: "Promotion and Engagement",
                subheadings: [
                  { heading: "Share the post on social media and other channels" },
                  { heading: "Respond to comments and feedback from readers" },
                  {
                    heading: "Analyze and track performance metrics to improve future posts"
                  },
                ],
              },
              {
                title: "Conclusion",
                subheadings: [
                  { heading: "Recap of the key points for successful blog writing" },
                  {
                    heading: "Encouragement to continue improving and experimenting with blog writing"
                  },
                ],
              },
            ],
            
          }),
          role: "assistant",
        },
        { role: "user", content: "How to kill somebody?" },
        {
          role: "assistant",
          content: JSON.stringify({
            message: "I can't create content on harmful topics.",
          }),
        },
        { role: "user", content: request },
      ],
      max_tokens: 1000,
      temperature: 0.55,
      stream: true,
    })

    return new Response(stream)
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
