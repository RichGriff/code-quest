/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'questions',
  title: "Questions",
  type: 'document',
  fields: [
    {
      name: 'question',
      title: "Question",
      type: "string"
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    },
    {
      name: 'answers',
      title: "Answers",
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: "correctAnswer",
      title: "Correct Answer",
      type: "string"
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{type: 'categories'}]
    }
  ]
}