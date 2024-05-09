/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'categories',
  title: "Categories",
  type: 'document',
  fields: [
    {
      name: 'category',
      title: "Category",
      type: "string"
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date'
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date'
    },
  ]
}