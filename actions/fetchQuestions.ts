'use server'

import { prisma } from "@/lib/prisma";
import { client } from "@/sanity/lib/client";

export async function getCategory() {
  // Get today's date in ISO 8601 format
  const today = new Date().toISOString().split('T')[0];

  // Construct the GROQ query
  const query = `*[_type == "categories" && $today >= startDate && $today < endDate]{
      _id,
      category,
      startDate,
      endDate
  }`;

  // Define the parameters for the query
  const params = { today };

  // Execute the query
  const data = await client.fetch(query, params);

  return data[0];
}

export async function getQuestions(categoryId: string) {
  const query = `*[_type == "questions" && category._ref == $categoryId]{
    question,
    answers,
    correctAnswer
  }`;

  const params = { categoryId };

  const data = await client.fetch(query, params);

  return data;
}

export async function checkCategoryCompletion(userId: any, categoryId: string) {
  if(!userId) return false
  
  try {
    const user = await prisma.user.findFirst({
      where: { clerkUserId: userId },
    })

    console.log('Found User', user)

  
    const completedCategory = await prisma.categoryCompleted.findFirst({
      where: {
        categoryId: categoryId,
        userId: user?.id
      }
    });
    
    if(!completedCategory) return false

    return true

  } catch (error) {
    console.log('Error', error)
    return false
  }
}