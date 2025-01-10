import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { getAIRecommendations } from '../services/openaiService';

export const trackFinance = async (req: Request, res: Response) => {
  try {
    const { userId, type, amount, category } = req.body;
    const entry = await prisma.financialEntry.create({
      data: { userId, type, amount, category },
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to track financial entry.' });
  }
};

export const getSuggestions = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const finances = await prisma.financialEntry.findMany({ where: { userId } });
    const suggestions = await getAIRecommendations(finances);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suggestions.' });
  }
};

export const getGoals = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const goals = await prisma.goal.findMany({ where: { userId } });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch goals.' });
  }
};

export const createGoal = async (req: Request, res: Response) => {
  try {
    const { userId, title, target } = req.body;
    const goal = await prisma.goal.create({
      data: { userId, title, target, progress: 0 },
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create goal.' });
  }
};

export const updateGoal = async (req: Request, res: Response) => {
  try {
    const goalId = parseInt(req.params.goalId);
    const { progress } = req.body;
    const goal = await prisma.goal.update({
      where: { id: goalId },
      data: { progress },
    });
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update goal.' });
  }
};

export const getReport = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const { startDate, endDate } = req.query;

    const finances = await prisma.financialEntry.findMany({
      where: {
        userId,
        date: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
      },
    });

    const income = finances
      .filter(entry => entry.type === 'income')
      .reduce((sum, entry) => sum + entry.amount, 0);

    const expenses = finances
      .filter(entry => entry.type === 'expense')
      .reduce((sum, entry) => sum + entry.amount, 0);

    res.status(200).json({
      income,
      expenses,
      balance: income - expenses,
      details: finances,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch financial report.' });
  }
};